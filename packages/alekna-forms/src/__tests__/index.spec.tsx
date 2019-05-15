import {
  errorPusher,
  extractFinalValues,
  getFromStateByName,
  findDuplicates,
} from '../index';
import {
  minLength,
  mustContainLetter,
  notEmpty,
} from '../__mocks__/validation';

test('errorPusher should add errors to the field object', () => {
  const initialField = {
    name: 'testField',
    value: 'some test value',
    type: 'text',
  };
  const fieldWithMinLength = {
    ...initialField,
    name: 'testMinLength',
    requirements: [minLength(20)],
  };
  const fieldMustContainLetter = {
    ...initialField,
    name: 'testFieldWithLetter',
    requirements: [mustContainLetter('r')],
  };
  const fieldNotEmpty = {
    ...initialField,
    value: '',
    requirements: [notEmpty],
  };

  expect(errorPusher(initialField)).toEqual(initialField);
  expect(errorPusher(fieldWithMinLength)).toEqual({
    ...fieldWithMinLength,
    errors: ['Must be 20 characters or more'],
  });
  expect(errorPusher(fieldMustContainLetter)).toEqual({
    ...fieldMustContainLetter,
    errors: ['Must contain letter r'],
  });
  expect(errorPusher(fieldNotEmpty)).toEqual({
    ...fieldNotEmpty,
    errors: ['Cannot be empty'],
  });
});

test('extractFinalValues should extract values into an object key pairs', () => {
  const fields = [
    {
      name: 'firstName',
      value: 'final value 1',
      type: 'text',
    },
    {
      name: 'lastName',
      value: 'final value 2',
      type: 'text',
    },
    {
      name: 'selection',
      value: true,
      type: 'checkbox',
    },
    {
      name: 'address.line_1',
      value: 'final value 3',
      type: 'text',
    },
    {
      name: 'address.line_2',
      value: 'final value 4',
      type: 'text',
    },
    {
      name: 'address.county',
      value: '',
      type: 'text',
    },
    {
      name: 'address.postcode',
      value: 'final value 5',
      type: 'text',
    },
  ];

  expect(extractFinalValues(fields)).toEqual({
    firstName: 'final value 1',
    lastName: 'final value 2',
    selection: true,
    address: {
      line_1: 'final value 3',
      line_2: 'final value 4',
      postcode: 'final value 5',
    },
  });
});

test('getFromStateByName should return field object from array and it`s index', () => {
  const state = [
    {
      name: 'firstName',
      value: 'final value 1',
      type: 'text',
    },
    {
      name: 'lastName',
      value: 'final value 2',
      type: 'text',
    },
    {
      name: 'address.line_1',
      value: 'final value 3',
      type: 'text',
    },
    {
      name: 'address.line_2',
      value: 'final value 4',
      type: 'text',
    },
    {
      name: 'address.postcode',
      value: 'final value 5',
      type: 'text',
    },
  ];
  expect(getFromStateByName(state)('firstName')).toEqual({
    index: 0,
    item: state[0],
  });
  expect(() => {
    getFromStateByName(state)('nameDoesNotExist');
  }).toThrow();
});

test('findDuplicates should return array without duplicates', () => {
  const initialFields = [
    {
      name: 'firstName',
      value: 'final value 1',
      type: 'text',
    },
    {
      name: 'lastName',
      value: 'final value 2',
      type: 'text',
    },
    {
      name: 'address.line_1',
      value: 'final value 3',
      type: 'text',
    },
    {
      name: 'address.line_2',
      value: 'final value 4',
      type: 'text',
    },
    {
      name: 'address.postcode',
      value: 'final value 5',
      type: 'text',
    },
  ];
  const additionalFields = [
    {
      name: 'firstName',
      value: 'final value 1',
      type: 'text',
    },
    {
      name: 'address.line_3',
      value: 'final value 4',
      type: 'text',
    },
  ];
  const mergedState = findDuplicates(initialFields)(additionalFields);
  expect(mergedState).toEqual([additionalFields[1]]);
});
