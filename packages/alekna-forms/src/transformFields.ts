import { cloneDeep } from 'lodash';
import { IField } from './types';

export default function transformFields(
  initialState: IField[] | { [key: string]: IField },
): any {
  const initialFields = cloneDeep(initialState);
  const meta = { touched: false, loading: false, errors: [] };

  if (Array.isArray(initialFields)) {
    const fields = initialFields.reduce((acc, { requirements, ...field }) => {
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
    const fields = Object.keys(initialFields).reduce((acc, key) => {
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
