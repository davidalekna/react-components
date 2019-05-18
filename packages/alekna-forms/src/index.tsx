import * as React from 'react';
import { isEqual, cloneDeep } from 'lodash';
import { getFromStateByName } from './store/reducer';
import useObservable from './useObservable';
import {
  fieldUpdate,
  fieldBlur,
  fieldFocus,
  formReset,
  formSubmit,
} from './store/actions';
import {
  IField,
  FormState,
  InputEvent,
  ICustomInput,
  IDefaultProps,
  IFormContext,
} from './types';

export const FormContext = React.createContext<IFormContext>({
  fields: [],
  handleSubmit: () => {},
  reset: () => {},
  touched: false,
});

function transformFields(initialFields: FormState) {
  const meta = { touched: false, loading: false, errors: [] };
  return cloneDeep(
    initialFields.map(({ requirements, ...field }: IField) => {
      if (
        Array.isArray(requirements) &&
        requirements.filter(fn => typeof fn === 'function').filter(Boolean)
          .length > 0
      ) {
        return {
          ...field,
          requirements,
          meta,
        };
      }

      return {
        ...field,
        meta,
      };
    }),
  );
}

export function Form({
  children,
  initialFields = [],
  onSubmit = () => {},
  epics = [],
}: IDefaultProps) {
  const { state, dispatch } = useObservable(
    transformFields(initialFields),
    epics,
  );

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

  const onBlurAction = (name: string, findByName: Function) => {
    if (!name) throw Error('no input name');
    const { index, item } = findByName(name);
    dispatch(
      fieldBlur({
        index,
        item,
      }),
    );
  };

  const onBlur = (input: InputEvent | ICustomInput) => {
    const findByName = getFromStateByName(state);
    if ('target' in input) {
      const { target } = input;
      onBlurAction(target.name, findByName);
    } else {
      const { name } = input;
      onBlurAction(name, findByName);
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
    const touched = state.find(
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

  const fieldsWithHandlers = state.map(({ requirements, ...field }) => ({
    ...field,
    onBlur,
    onFocus,
    onChange,
  }));

  const ui =
    typeof children === 'function'
      ? children({ fields: fieldsWithHandlers, ...fns })
      : children;

  return (
    <FormContext.Provider value={{ fields: fieldsWithHandlers, ...fns }}>
      {ui}
    </FormContext.Provider>
  );
}

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
        `Field with name ${name} doesn\`t exist, did you mean ${
          hasMatch.name
        }?`,
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
