import * as React from 'react';
import { Text, TextArea, DatePicker, Checkbox, Select } from './types';

export function renderFields({ fields = [] }) {
  return fields
    .map((field: any) => {
      switch (field.type) {
        case 'textarea': {
          return <TextArea rows={4} {...field} />;
        }
        case 'date': {
          return <DatePicker {...field} />;
        }
        case 'checkbox': {
          return <Checkbox {...field} />;
        }
        case 'select': {
          return <Select {...field} />;
        }
        default: {
          return <Text {...field} />;
        }
      }
    })
    .map((f, key) => ({ ...f, key }));
}
