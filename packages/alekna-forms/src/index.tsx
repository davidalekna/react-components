import * as React from 'react';
import { isEqual, cloneDeep } from 'lodash';
import { useStore, createStore } from '@alekna/react-store';
import formReducer from './store/reducer';
import {
  IField,
  InputEvent,
  ICustomInput,
  IDefaultProps,
  FormState,
} from './types';
import {
  fieldUpdate,
  fieldBlur,
  fieldFocus,
  formReset,
  formSubmit,
} from './store/actions';

type ContextType = {
  fields: { [key: string]: IField };
  handleSubmit: Function;
  reset: Function;
  touched: boolean;
  dispatch: Function;
};

export const FormContext = React.createContext<ContextType>({
  fields: {},
  handleSubmit: () => {},
  reset: () => {},
  touched: false,
  dispatch: () => {},
});

function transformFields(
  initialFields: IField[] | { [key: string]: IField },
): any {
  let fields;
  const meta = { touched: false, loading: false, errors: [] };

  if (Array.isArray(initialFields)) {
    fields = initialFields.reduce((acc, { requirements, ...field }) => {
      if (
        Array.isArray(requirements) &&
        requirements.filter(fn => typeof fn === 'function').filter(Boolean)
          .length > 0
      ) {
        return {
          ...acc,
          [field.name]: {
            ...field,
            requirements,
            meta,
          },
        };
      }

      return {
        ...acc,
        [field.name]: {
          ...field,
          meta,
        },
      };
    }, {});
    return Object.freeze(fields);
  }
  if (typeof initialFields === 'object') {
    fields = Object.keys(initialFields).reduce((acc, key) => {
      const { requirements, ...field } = initialFields[key];
      if (
        Array.isArray(requirements) &&
        requirements.filter(fn => typeof fn === 'function').filter(Boolean)
          .length > 0
      ) {
        return {
          ...acc,
          [key]: {
            ...field,
            name: key,
            requirements,
            meta,
          },
        };
      }

      return {
        ...acc,
        [key]: {
          ...field,
          name: key,
          meta,
        },
      };
    }, {});
    return Object.freeze(fields);
  }
}

function configureStore(initialFields: IField[]) {
  const initialState = transformFields(cloneDeep(initialFields));
  const reducer = formReducer(initialState);
  return createStore(reducer, initialState);
}

export const Form = ({
  children,
  initialFields = [],
  onSubmit = () => {},
  onStateChange = () => {},
}: IDefaultProps) => {
  const storeConfig = React.useMemo(() => configureStore(initialFields), [
    initialFields,
  ]);
  const { state, dispatch }: any = useStore(storeConfig);

  React.useEffect(() => {
    onStateChange(state);
  }, [state]);

  const onChangeTarget = ({ target }: InputEvent) => {
    if (!target.name) throw Error('no input name');
    dispatch(
      fieldUpdate({
        name: target.name,
        value: target.type === 'checkbox' ? target.checked : target.value,
      }),
    );
  };

  const onChangeCustom = ({ name, value }: ICustomInput) => {
    if (!name) throw Error('no input name');
    dispatch(
      fieldUpdate({
        name,
        value,
      }),
    );
  };

  const onChange = (input: InputEvent | ICustomInput) => {
    if ('target' in input) {
      onChangeTarget(input);
    } else {
      onChangeCustom(input);
    }
  };

  const onBlurAction = (name: string) => {
    if (!name) throw Error('no input name');
    const item = state[name];
    dispatch(fieldBlur({ item }));
  };

  const onBlur = (input: InputEvent | ICustomInput) => {
    if ('target' in input) {
      const { target } = input;
      onBlurAction(target.name);
    } else {
      const { name } = input;
      onBlurAction(name);
    }
  };

  const onFocus = (input: InputEvent | ICustomInput) => {
    // todo: cancel Promise
    if ('target' in input) {
      const { target } = input;
      if (!target.name) throw Error('no input name');
      dispatch(fieldFocus(target.name));
    } else {
      const { name } = input;
      if (!name) throw Error('no input name');
      dispatch(fieldFocus(name));
    }
  };

  const handleSubmit = (evt: InputEvent) => {
    evt.preventDefault();
    dispatch(formSubmit(state, onSubmit));
  };

  const clearValues = () => {
    dispatch(formReset());
  };

  const findTouched = () => {
    const touched = Object.values(state).find((field: any) => {
      return field.meta && field.meta.touched;
    });
    return touched ? true : false;
  };

  // RENDERER BELLOW

  const fns = {
    handleSubmit,
    reset: clearValues,
    touched: findTouched(),
    dispatch,
  };

  const withHandlers = Object.keys(state).reduce((acc, key: any) => {
    return {
      ...acc,
      [state[key].name]: {
        ...state[key],
        onBlur,
        onFocus,
        onChange,
      },
    };
  }, {});

  const ui =
    typeof children === 'function'
      ? children({ fields: withHandlers, ...fns })
      : children;

  return (
    <FormContext.Provider value={{ fields: withHandlers, ...fns }}>
      {ui}
    </FormContext.Provider>
  );
};

export function useFormContext() {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error(
      `Form compound components cannot be rendered outside the Form component`,
    );
  }
  return context;
}

/**
 * Useful when rendering fields from a map. Works with and without context.
 */
export const MemoField = React.memo(
  ({ children, render, field }: any) => {
    if (children && render) {
      throw Error('children and render cannot be used together!');
    }

    const { requirements, ...fieldProps } = field;

    if (render) return render(fieldProps);
    return children(fieldProps);
  },
  ({ field: prevField }, { field: nextField }) =>
    isEqual(
      [prevField.value, prevField.meta],
      [nextField.value, nextField.meta],
    ),
);

/**
 * If form has to have some shape, this component will select field by name
 */
export const Field = ({
  name,
  children,
  render,
}: {
  name: string;
  children?: Function;
  render?: Function;
}) => {
  const { fields } = useFormContext();
  const field = fields[name];

  if (children && render) {
    throw Error('children and render cannot be used together!');
  }
  if (!field) {
    const hasMatch = Object.values(fields).find(f => f.name.includes(name));
    if (hasMatch) {
      throw Error(
        `Field with name ${name} doesn\`t exist, did you mean ${hasMatch.name}?`,
      );
    } else {
      throw Error(`Field with name ${name} doesn\`t exist.`);
    }
  }

  return React.useMemo(() => {
    // remove unused props from the dom
    const { requirements, ...fieldProps } = field;
    if (render) return render(fieldProps);
    if (children) return children(fieldProps);
  }, [
    field.value,
    field.meta.touched,
    field.meta.loading,
    field.meta.errors.length,
  ]);
};
