import * as React from 'react';
import Select from '../components/Select';
import {
  minLength,
  mustContainLetter,
  notEmpty,
} from '../../__mocks__/validation';

function fieldsMapper({ type, options, ...props }) {
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

  switch (type) {
    case 'select':
      return <Select type={type} options={options} {...props} />;
    default:
      return <input type={type} {...props} />;
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
  },
  {
    label: 'Last Name',
    value: '',
    placeholder: 'Trump',
    name: 'lastName',
    type: 'text',
    requirements: [minLength(6), mustContainLetter('d')],
  },
  {
    label: 'Date of Birth',
    value: '',
    name: 'dob',
    type: 'date',
  },
  {
    label: 'Line 1',
    value: '',
    name: 'address.line_1',
    requirements: [notEmpty],
    type: 'text',
  },
  {
    label: 'Line 2',
    value: '',
    name: 'address.line_2',
    type: 'text',
  },
  {
    label: 'City',
    value: '',
    name: 'address.city',
    requirements: [notEmpty],
    type: 'text',
  },
  {
    label: 'Postcode',
    value: '',
    name: 'address.postcode',
    requirements: [notEmpty],
    type: 'text',
  },
  {
    label: 'Favourite number',
    value: 0,
    name: 'favouriteNumber',
    type: 'number',
  },
  {
    label: 'Like apples',
    value: false,
    name: 'apples',
    type: 'checkbox',
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
  },
  {
    label: 'Search',
    value: '',
    name: 'search',
    type: 'search',
  },
  {
    label: 'Email',
    value: '',
    name: 'email',
    type: 'email',
  },
  {
    label: 'Url',
    value: '',
    name: 'url',
    type: 'url',
  },
  {
    label: 'Telephone',
    value: '',
    name: 'tel',
    type: 'tel',
  },
  {
    label: 'Range',
    value: '',
    name: 'range',
    type: 'range',
  },
  {
    label: 'Month',
    value: '',
    name: 'month',
    type: 'month',
  },
  {
    label: 'Week',
    value: '',
    name: 'week',
    type: 'week',
  },
  {
    label: 'Time',
    value: '',
    name: 'time',
    type: 'time',
  },
  {
    label: 'Datetime',
    value: '',
    name: 'datetime',
    type: 'datetime',
  },
  {
    label: 'Color',
    value: '',
    name: 'color',
    type: 'color',
  },
].map(field => ({ ...field, component: fieldsMapper }));
