import * as React from 'react';
import { minLength, mustContainLetter, notEmpty } from './validation';

// AVAILABLE INPUT TYPES ON HTML5
// search
// email
// url
// tel
// number
// range
// date
// month
// week
// time
// datetime
// datetime-local
// color

function Select({ options, ...props }) {
  return (
    <select {...props}>
      <option label="" />
      {options.map(({ value }, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

function fieldsMapper({ type, options, ...props }) {
  switch (type) {
    case 'text':
      return <input type={type} {...props} />;
    case 'number':
      return <input type={type} {...props} />;
    case 'checkbox':
      return <input type={type} {...props} />;
    case 'date':
      return <input type={type} {...props} />;
    case 'select':
      return <Select type={type} options={options} {...props} />;
    default:
      return null;
  }
}

export default [
  {
    label: 'First Name',
    value: '',
    placeholder: 'Donald',
    name: 'firstName',
    type: 'text',
    requirements: [
      minLength(3),
      mustContainLetter('a'),
      mustContainLetter('b'),
      mustContainLetter('c'),
    ],
    component: fieldsMapper,
  },
  {
    label: 'Last Name',
    value: '',
    placeholder: 'Trump',
    name: 'lastName',
    type: 'text',
    requirements: [minLength(6), mustContainLetter('d')],
    component: fieldsMapper,
  },
  {
    label: 'Date of Birth',
    value: '',
    name: 'dob',
    type: 'date',
    component: fieldsMapper,
  },
  {
    label: 'Favourite number',
    value: 0,
    name: 'favouriteNumber',
    type: 'number',
    component: fieldsMapper,
  },
  {
    label: 'Like apples',
    value: false,
    name: 'apples',
    type: 'checkbox',
    component: fieldsMapper,
  },
  {
    label: 'Favourite Fruit',
    value: '',
    name: 'faveFruit',
    type: 'select',
    requirements: [notEmpty],
    options: [
      { value: 'grapefruit' },
      { value: 'lime' },
      { value: 'coconut' },
      { value: 'mango' },
    ],
    component: fieldsMapper,
  },
];
