import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Field } from '../index';
import ShowDocs from '../__utils__/ShowDocs';
import initialFields from './fields';
import styled from 'styled-components';
import { Text } from './components/form/types';

const Grid = styled.div`
  display: grid;
  grid-gap: 10px 10px;
  padding: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
`;

const Demo = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Form initialFields={initialFields} onSubmit={onSubmit}>
      {({ handleSubmit, reset, touched }) => {
        return (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Render Props</legend>
              <Grid>
                <Field
                  name="username"
                  render={props => (
                    <Text
                      style={{
                        gridColumnStart: '1',
                        gridColumnEnd: 'span 2',
                      }}
                      {...props}
                    />
                  )}
                />
                <Field name="firstName" render={props => <Text {...props} />} />
                <Field name="lastName" render={props => <Text {...props} />} />
                <Field
                  name="address.line_1"
                  render={props => <Text {...props} />}
                />
                <Field
                  name="address.line_2"
                  render={props => <Text {...props} />}
                />
                <Field
                  name="address.city"
                  render={props => <Text {...props} />}
                />
                <Field
                  name="address.postcode"
                  render={props => (
                    <Text
                      style={{
                        gridColumnStart: '2',
                        gridColumnEnd: 'span 2',
                      }}
                      {...props}
                    />
                  )}
                />
              </Grid>
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
  );
};

storiesOf('custom layout', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/construct.md')} />)
  .add('Demo', () => <Demo />);
