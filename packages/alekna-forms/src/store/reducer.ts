import { merge, cloneDeep } from 'lodash';
import { FormState, IField } from '../types';
import { FormActions } from './types';
import {
  UPDATE,
  FIELD_BLUR,
  FIELD_ERROR_UPDATE,
  ERROR,
  FIELD_FOCUS,
  ERRORS,
  FORM_RESET,
  FORM_SUBMIT,
} from './actions';

export const getFromStateByName = (state: any) => (itemName: string) => {
  const item = state.get(itemName);
  if (!item) {
    throw Error(`input name ${itemName} doesnt exist on provided fields`);
  }
  return item;
};

const formReducer = (initialState: FormState) => (
  state: any,
  action: FormActions,
): FormState => {
  const findByName = getFromStateByName(state);
  switch (action.type) {
    case UPDATE: {
      const item = findByName(action.payload.name);
      const newItem: IField = Object.assign(item, action.payload);
      newItem.meta.errors = [];
      state.set(action.payload.name, newItem);
      return cloneDeep(state);
    }
    case ERROR: {
      // TODO: should add error under meta?
      const { item } = action.payload;
      state.set(item.name, item);
      return cloneDeep(state);
    }
    case FIELD_BLUR: {
      const { item } = action.payload;
      state.set(item.name, item);
      return cloneDeep(state);
    }
    case FIELD_FOCUS: {
      const { name, loading } = action.payload;
      const item = findByName(name);
      state.set(
        name,
        merge(item, {
          meta: { touched: true, loading },
        }),
      );
      return cloneDeep(state);
    }
    case FIELD_ERROR_UPDATE: {
      const { item } = action.payload;
      state.set(item.name, item);
      return cloneDeep(state);
    }
    case ERRORS: {
      return cloneDeep(action.payload);
    }
    case FORM_RESET: {
      return cloneDeep(initialState);
    }
    case FORM_SUBMIT: {
      return cloneDeep(action.payload);
    }
    default: {
      return state;
    }
  }
};

export default formReducer;
