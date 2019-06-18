<br />
<h1 align="center">@alekna/react-forms</h1>

[![size][size-badge]][unpkg-lib]
[![gzip size][gzip-badge]][unpkg-lib]

<br />
<br />
<p align="center" style="font-size: 1.2rem;">Build forms from array of field objects and stream errors as they come in.</p>

<hr />
<p align="center" style="font-size: 1.2rem;">A combination of react, rxjs and es6 generator pattern brings fast, async forms from streams. Easily declare your form in shape of array objects and render it out the way you need.</p>
<br />
<pre>npm i <a href="https://www.npmjs.com/package/@alekna/react-forms">@alekna/react-forms</a></pre>

## Usage

> [Try it out in the browser](https://codesandbox.io/s/aleknareactforms-utvy2)

```jsx
import React from 'react';
import { render } from 'react-dom';
import { Form } from '@alekna/react-forms';

const mustContainLetter = letter => value => {
  return !value.includes(letter) ? `Must contain letter ${letter}` : undefined;
};

const fields = [
  {
    value: '',
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    requirements: [
      mustContainLetter('a'),
      mustContainLetter('b'),
      mustContainLetter('c'),
    ],
  },
  {
    value: '',
    label: 'Last Name',
    name: 'lastName',
    type: 'text',
    requirements: [],
  },
];

render(
  <Form initialFields={fields} onSubmit={values => console.log(values)}>
    {({ fields, handleSubmit, reset }) => {
      return (
        <div className="App">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {fields.map((field, key) => (
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{field.label}</span>
                  <input key={key} {...field} />
                  {field.meta && field.meta.errors && (
                    <div style={{ color: 'red' }}>
                      {field.meta.errors.join(', ')}
                    </div>
                  )}
                </label>
              ))}
            </div>
            <div>
              <button type="submit">submit</button>
              <button type="button" onClick={reset}>
                reset
              </button>
            </div>
          </form>
        </div>
      );
    }}
  </Form>,
  document.getElementById('root'),
);
```

## Examples

[gzip-badge]: http://img.badgesize.io/https://unpkg.com/downshift/dist/downshift.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/downshift/dist/downshift.umd.min.js?label=size&style=flat-square
[unpkg-lib]: https://unpkg.com/@alekna/react-forms@1.0.5/lib
