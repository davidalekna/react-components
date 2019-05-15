import * as React from 'react';
// import 'antd/dist/antd.css';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/checkbox/style/css';
import { Input, Select, Checkbox, DatePicker } from 'antd';

export default function fieldsMapper({ type, options, checked, ...props }) {
  switch (type) {
    case 'textarea': {
      return <Input.TextArea rows={4} {...props} />;
    }
    case 'date': {
      return (
        <DatePicker
          onChange={date => props.onChange({ name: props.name, value: date })}
        />
      );
    }
    case 'checkbox': {
      return (
        <Checkbox
          defaultChecked={checked}
          checked={props.value}
          onChange={evt =>
            props.onChange({ name: props.name, value: evt.target.checked })
          }
        >
          {props.label}
        </Checkbox>
      );
    }
    case 'select': {
      const innerEvent = value =>
        props.onChange({
          name: props.name,
          value,
        });
      return (
        <Select
          {...props}
          defaultValue={null}
          onChange={innerEvent}
          onBlur={innerEvent}
        >
          {options.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.value}
            </Select.Option>
          ))}
        </Select>
      );
    }
    default: {
      return <Input type={type} {...props} />;
    }
  }
}
