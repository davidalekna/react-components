import React, { useMemo, useEffect, createContext, useContext, memo } from 'react';
import { isEqual } from 'lodash';
import { useAsyncReducer } from '@alekna/react-store';
import formReducer from './store/reducer';
import transformFields from './transformFields';
import {
  FormContextType,
  InputEvent,
  ICustomInput,
  FormProps,
  FieldProps,
} from './types';
import {
  fieldUpdate,
  fieldBlur,
  fieldFocus,
  formReset,
  formSubmit,
  formInitialize,
} from './store/actions';

export const FormContext = createContext<FormContextType>({
  fields: [],
  handleSubmit: () => {},
  reset: () => {},
  touched: false,
  dispatch: () => {},
  initialize: () => {},
});

type FormInitialState = FieldProps[] | { [key: string]: FieldProps };

export const Form = <T extends FormInitialState>({
  children,
  initialState,
  onSubmit = () => {},
  onStateChange = () => {},
}: FormProps<T>) => {
  const internalState = useMemo(() => transformFields(initialState), [initialState]);
  const reducer = formReducer(internalState);
  const [state, dispatch] = useAsyncReducer(reducer, internalState);

  useEffect(() => {
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

  const findTouched = () => {
    const touched = Object.values(state).find((field: FieldProps) => {
      return field.meta && field.meta.touched;
    });
    return touched ? true : false;
  };

  // RENDERER BELLOW

  const fns = {
    handleSubmit,
    reset: () => dispatch(formReset()),
    touched: findTouched(),
    dispatch,
    initialize: newStatePayload => dispatch(formInitialize(newStatePayload)),
  };

  const fieldsWithHandlers = useMemo(
    () =>
      Object.keys(state).reduce((acc, key: any) => {
        return [
          ...acc,
          {
            ...state[key],
            onBlur,
            onFocus,
            onChange,
          },
        ];
      }, []),
    [state],
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
  const context = useContext(FormContext);
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
export const MemoField = memo(
  ({ children, render, field }: any) => {
    if (children && render) {
      throw Error('children and render cannot be used together!');
    }

    const { requirements, ...fieldProps } = field;

    if (render) return render(fieldProps);
    return children(fieldProps);
  },
  ({ field: prevField }, { field: nextField }) =>
    isEqual([prevField.value, prevField.meta], [nextField.value, nextField.meta]),
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
  const field = fields.find(field => field.name === name);

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

  return useMemo(() => {
    // remove unused props from the dom
    const { requirements, ...fieldProps } = field;
    if (render) return render(fieldProps);
    if (children) return children(fieldProps);
  }, [field.value, field.meta.touched, field.meta.loading, field.meta.errors.length]);
};
