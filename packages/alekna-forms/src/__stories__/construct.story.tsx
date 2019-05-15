import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Wrapper } from './components/styles';
import { Form, FieldContainer } from '../index';
import ShowDocs from '../__utils__/ShowDocs';
import { person, address, otherFields } from './fields/categories';
import Container from './components/Container';

const onSubmit = values => {
  console.log(values);
};

const Demo = () => {
  return (
    <Wrapper>
      <Form initialFields={person} onSubmit={onSubmit}>
        {({
          fields,
          handleSubmit,
          onChange,
          addFields,
          onBlur,
          clearValues,
        }) => {
          const categories = fields.reduce(
            (acc, val) => ({
              ...acc,
              [val.category]: acc[val.category]
                ? acc[val.category].concat(val)
                : [val],
            }),
            {},
          );
          return (
            <section>
              <div>
                Add additional fields
                <button onClick={() => addFields(address)}>
                  add address fields
                </button>
                <button onClick={() => addFields(otherFields)}>
                  add other fields
                </button>
              </div>
              <form onSubmit={evt => handleSubmit(evt)}>
                {Object.keys(categories).map((category, key) => (
                  <fieldset key={key}>
                    <legend>{category}</legend>
                    {categories[category].map(field => (
                      <FieldContainer
                        {...{
                          ...field,
                          key: field.name,
                          onBlur,
                          onChange,
                          children: Container,
                        }}
                      />
                    ))}
                  </fieldset>
                ))}
                <br />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => clearValues()}>
                  reset
                </button>
              </form>
            </section>
          );
        }}
      </Form>
    </Wrapper>
  );
};

storiesOf('construct', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/construct.md')} />)
  .add('Demo', () => <Demo />);
