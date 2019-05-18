<br />
<h1 align="center">
  @alekna/react-forms
</h1>
<br />
<br />
<p align="center" style="font-size: 1.2rem;">Build forms from array of field objects and stream errors as they come in.</p>

<hr />
<p align="center" style="font-size: 1.2rem;">A combination of react, rxjs and es6 generator pattern brings fast, async forms from streams. Easily declare your form in shape of array objects and render it out the way you need.</p>
<br />
<pre>npm i <a href="https://www.npmjs.com/package/@alekna/react-forms">@alekna/react-forms</a></pre>

## Usage

```jsx
import React from 'react';
import { render } from 'react-dom';
import { Form } from '@alekna/react-forms';

const fields = [
  {
    name: 'firstName',
    type: 'text',
    requirements: [],
  },
  {
    name: 'lastName',
    type: 'text',
    requirements: [],
  },
];

render(
  <Form initialFields={fields} onSubmit={values => console.log(values)}>
    {({ fields, handleSubmit, reset }) => (
      <form onSubmit={handleSubmit}>
        {fields.map((field, key) => (
          <input key={key} {...field} />
        ))}
        <div>
          <button type="submit">submit</button>
          <button type="button" onClick={reset}>
            cancel
          </button>
        </div>
      </form>
    )}
  </Form>,
  document.getElementById('root'),
);
```

## Examples

[![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://davidalekna.github.io/react-frm)
