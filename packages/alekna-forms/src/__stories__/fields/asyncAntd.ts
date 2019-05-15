import fieldsMapper from '../fieldsMappers/antd';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const usernameAvailable = async value => {
  if (!value) {
    return 'Required';
  }
  await sleep(2000);
  const notAvailable = ['john', 'paul', 'george', 'ringo'];
  if (notAvailable.includes(value.toLowerCase())) {
    return 'Username taken!';
  }
  return undefined;
};

export const notEmpty = value => {
  return value.length < 1 ? `Cannot be empty` : undefined;
};

export const mustContainLetter = (letter: string) => (value: string) => {
  return !value.includes(letter) ? `Must contain letter ${letter}` : undefined;
};

export default [
  {
    label: 'Username',
    value: '',
    name: 'username',
    type: 'text',
    requirements: [mustContainLetter('e'), usernameAvailable],
  },
  {
    label: 'First Name',
    value: '',
    placeholder: 'Donald',
    name: 'firstName',
    type: 'text',
    requirements: [notEmpty, mustContainLetter('e'), usernameAvailable],
  },
  {
    label: 'Last Name',
    value: '',
    placeholder: 'Trump',
    name: 'lastName',
    type: 'text',
    requirements: [mustContainLetter('a')],
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
    type: 'text',
  },
  {
    label: 'Postcode',
    value: '',
    name: 'address.postcode',
    type: 'text',
  },
  {
    label: 'Favourite Fruit',
    value: '',
    name: 'faveFruit',
    type: 'select',
    options: [
      { value: 'grapefruit' },
      { value: 'lime' },
      { value: 'coconut' },
      { value: 'mango' },
    ],
  },
  {
    label: 'Leave a comment',
    value: '',
    name: 'comment',
    type: 'textarea',
  },
].map(field => ({ ...field, component: fieldsMapper }));
