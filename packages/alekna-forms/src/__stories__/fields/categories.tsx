import * as React from 'react';
import Select from '../components/Select';
import { minLength, mustContainLetter } from '../../__mocks__/validation';

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

export const person = [
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
].map(field => ({ ...field, category: 'person', component: fieldsMapper }));

export const address = [
  {
    label: 'House or Flat Number',
    value: '',
    placeholder: '',
    name: 'nr',
    type: 'text',
  },
  {
    label: 'First Line',
    value: '',
    placeholder: '',
    name: 'firstLine',
    type: 'text',
  },
  {
    label: 'Second Line',
    value: '',
    placeholder: '',
    name: 'secondLine',
    type: 'text',
  },
  {
    label: 'Country',
    value: '',
    placeholder: '',
    name: 'country',
    type: 'text',
  },
  {
    label: 'State',
    value: '',
    placeholder: '',
    name: 'state',
    type: 'text',
  },
  {
    label: 'Postcode',
    value: '',
    placeholder: '',
    name: 'postcode',
    type: 'text',
  },
].map(field => ({ ...field, category: 'address', component: fieldsMapper }));

export const otherFields = [
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
].map(field => ({
  ...field,
  category: 'otherFields',
  component: fieldsMapper,
}));
