import * as React from 'react';
import Select from '../components/Select';
import { notEmpty } from '../../__mocks__/validation';

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
    label: 'Line 1',
    value: '',
    name: 'a.d.d.r.e.s.s.line_1',
    requirements: [notEmpty],
    type: 'text',
  },
  {
    label: 'Line 2',
    value: '',
    name: 'a.d.d.r.e.s.s.line_2',
    type: 'text',
  },
  {
    label: 'City',
    value: '',
    name: 'a.d.d.r.e.s.s.city',
    requirements: [notEmpty],
    type: 'text',
  },
  {
    label: 'Postcode',
    value: '',
    name: 'a.d.d.r.e.s.s.postcode',
    requirements: [notEmpty],
    type: 'text',
  },
].map(field => ({ ...field, component: fieldsMapper }));
