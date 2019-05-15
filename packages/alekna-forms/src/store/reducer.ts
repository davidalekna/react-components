import { merge, cloneDeep } from 'lodash';
import { FormState } from '../types';
import { FormActions } from './types';
import {
  UPDATE,
  FIELD_BLUR,
  FIELD_ERROR_UPDATE,
  ERROR,
  TOUCHED,
  ERRORS,
  FORM_RESET,
  FORM_SUBMIT,
} from './actions';

export const getFromStateByName = (state: FormState) => (itemName: string) => {
  let itemIndex: number = 0;
  const item = state.find(({ name }, index) => {
    itemIndex = index;
    return name === itemName;
  });
  if (!item) {
    throw Error(`input name ${itemName} doesnt exist on provided fields`);
  }
  return {
    item,
    index: itemIndex,
  };
};

const formReducer = (initialState: FormState) => (
  state: FormState,
  action: FormActions,
): FormState => {
  const findByName = getFromStateByName(state);
  switch (action.type) {
    case UPDATE: {
      const { item, index } = findByName(action.payload.name);
      state[index] = Object.assign(item, { ...action.payload, errors: [] });
      return cloneDeep(state);
    }
    case ERROR: {
      // TODO: should add error under meta?
      const { index, item } = action.payload;
      state[index] = item;
      return cloneDeep(state);
    }
    case FIELD_BLUR: {
      const { index, item } = action.payload;
      state[index] = item;
      return cloneDeep(state);
    }
    case TOUCHED: {
      const { name, loading } = action.payload;
      const { item, index } = findByName(name);
      state[index] = merge(item, {
        meta: { touched: true, loading },
      });
      return cloneDeep(state);
    }
    case FIELD_ERROR_UPDATE: {
      const { index, item } = action.payload;
      state[index] = item;
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
