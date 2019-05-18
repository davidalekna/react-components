import * as React from 'react';
import { Input } from 'antd';
import { MemoField } from '../../../../index';
import {
  FieldErrors,
  FormLabel,
  StyledLabel,
  FieldLoader,
} from '../../formElements';

export function Text(field) {
  return (
    <MemoField field={field}>
      {({ label, type, meta, style, ...field }) => {
        return (
          <StyledLabel style={style}>
            {label && <FormLabel>{label}</FormLabel>}
            <FieldLoader loading={meta.loading}>
              <Input type={type} {...field} />
            </FieldLoader>
            <FieldErrors errors={meta && meta.errors} />
          </StyledLabel>
        );
      }}
    </MemoField>
  );
}
