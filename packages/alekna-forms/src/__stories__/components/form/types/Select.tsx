import * as React from 'react';
import { Select as AntSelect } from 'antd';
import { FieldErrors, FormLabel, StyledLabel } from '../../formElements';

export function Select({ label, meta, showError = true, ...field }) {
  const innerEvent = value =>
    field.onChange({
      name: field.name,
      value,
    });

  return (
    <StyledLabel>
      {label && <FormLabel>{label}</FormLabel>}
      <AntSelect
        {...field}
        defaultValue={null}
        onChange={innerEvent}
        onBlur={innerEvent}
      >
        {field.options.map(option => (
          <AntSelect.Option key={option.value} value={option.value}>
            {option.value}
          </AntSelect.Option>
        ))}
      </AntSelect>
      <FieldErrors errors={meta && meta.errors} />
    </StyledLabel>
  );
}
