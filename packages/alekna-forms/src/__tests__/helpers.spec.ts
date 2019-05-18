import { createObject, isBoolean } from '../store/helpers';

test('should detect boolean value', () => {
  expect(isBoolean(true)).toBe(true);
  expect(isBoolean('whats up')).toBe(false);
  expect(isBoolean(null)).toBe(false);
  expect(isBoolean(undefined)).toBe(false);
  expect(isBoolean([])).toBe(false);
  expect(isBoolean(() => {})).toBe(false);
});

test('should create an object from string', () => {
  expect(createObject()).toEqual({});
  expect(
    createObject({ ['a.d.d.r.e.s.s.line_1']: 'some value' }),
  ).toMatchObject({
    a: {
      d: {
        d: {
          r: {
            e: {
              s: {
                s: {
                  line_1: 'some value',
                },
              },
            },
          },
        },
      },
    },
  });
});
