import * as React from 'react';
import { isEqual, cloneDeep } from 'lodash';
import { useStore, dispatch, createStore } from '@alekna/react-store';
import formReducer from './store/reducer';
import { fieldsEpic } from './store/epics';
import { IField, InputEvent, ICustomInput, IDefaultProps } from './types';
import {
  fieldUpdate,
  fieldBlur,
  fieldFocus,
  formReset,
  formSubmit,
} from './store/actions';

export const FormContext = React.createContext<any>({
  fields: [],
  handleSubmit: () => {},
  reset: () => {},
  touched: false,
});

function transformFields(initialFields: IField[]): any {
  const meta = { touched: false, loading: false, errors: [] };
  const fields = new Map();
  cloneDeep(initialFields).map(({ requirements, ...field }: IField) => {
    if (
      Array.isArray(requirements) &&
      requirements.filter(fn => typeof fn === 'function').filter(Boolean)
        .length > 0
    ) {
      return fields.set(field.name, {
        ...field,
        requirements,
        meta,
      });
    }

    return fields.set(field.name, {
      ...field,
      meta,
    });
  });
  return fields;
}

function configureStore(initialFields) {
  const initialState = transformFields(initialFields);
  const reducers = {
    fields: formReducer(initialState),
  };
  return createStore(reducers, undefined, [fieldsEpic]);
}

export const Form = ({
  children,
  initialFields = [],
  onSubmit = () => {},
}: IDefaultProps) => {
  const { reducers, initialState, epics } = React.useMemo(
    () => configureStore(initialFields),
    [initialFields],
  );
  const { selectState } = useStore(reducers, initialState, epics);
  const state = selectState(state => state.fields);

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
    const item = state.get(name);
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
    const touched = Array.from(state.values()).find(
      (field: any) => field.meta && field.meta.touched,
    );
    return touched ? true : false;
  };

  // RENDERER BELLOW

  const fns = {
    handleSubmit,
    reset: clearValues,
    touched: findTouched(),
  };

  const fieldsWithHandlers = Array.from(state.values()).map(
    ({ requirements, ...field }) => ({
      ...field,
      onBlur,
      onFocus,
      onChange,
    }),
  );

  const ui =
    typeof children === 'function'
      ? children({ fields: fieldsWithHandlers, ...fns })
      : children;

  return (
    <FormContext.Provider value={{ fields: fieldsWithHandlers, ...fns }}>
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
  const field = fields.find((f: IField) => f.name === name);

  if (children && render) {
    throw Error('children and render cannot be used together!');
  }
  if (!field) {
    const hasMatch = fields.find(f => f.name.includes(name));
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
