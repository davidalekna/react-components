import * as React from 'react';
import { Input } from 'antd';
import { FieldErrors, FormLabel, StyledLabel } from '../../formElements';

export function TextArea({ label, showError = true, meta, ...field }) {
  return (
    <StyledLabel>
      {label && <FormLabel>{label}</FormLabel>}
      <Input.TextArea rows={4} {...field} />
      <FieldErrors errors={meta && meta.errors} />
    </StyledLabel>
  );
}
