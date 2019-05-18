import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Form } from '../index';
import ShowDocs from '../__utils__/ShowDocs';
import { renderFields } from './components/form/renderFields';
import initialFields from './fields';

const Demo = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <div style={{ padding: '20px 50px' }}>
      <Form initialFields={initialFields} onSubmit={onSubmit}>
        {({ fields, handleSubmit, reset, touched }) => {
          return (
            <form onSubmit={evt => handleSubmit(evt)}>
              <fieldset>
                <legend>Async Validation</legend>
                {renderFields({ fields })}
                <br />
                <div>
                  <button type="submit" disabled={!touched}>
                    Submit
                  </button>
                  <button type="button" onClick={() => reset()}>
                    reset
                  </button>
                </div>
              </fieldset>
            </form>
          );
        }}
      </Form>
    </div>
  );
};

storiesOf('async validation', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/construct.md')} />)
  .add('Demo', () => <Demo />);
