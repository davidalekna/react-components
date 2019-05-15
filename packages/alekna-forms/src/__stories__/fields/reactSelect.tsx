import * as React from 'react';
import Select from 'react-select';
import { notEmpty } from '../../__mocks__/validation';

const RRSelect = ({ options, ...props }) => {
  const cleanValue =
    typeof props.value === 'string' && props.value.length
      ? options.find(o => o.value === props.value)
      : props.value;

  return (
    <Select
      {...props}
      defaultValue={cleanValue}
      value={cleanValue}
      options={options}
      onChange={item => props.onChange({ name: props.name, value: item.value })}
      onBlur={item => props.onBlur({ name: props.name, value: item.value })}
    />
  );
};

function fieldsMapper({ type, options, checked, ...props }) {
  switch (type) {
    case 'select':
      return <RRSelect options={options} {...props} />;
    default:
      return <input type={type} {...props} />;
  }
}

export default [
  {
    label: 'Favourite Fruit',
    value: '',
    name: 'faveFruit',
    type: 'select',
    requirements: [notEmpty],
    options: [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ],
  },
].map(field => ({ ...field, component: fieldsMapper }));
