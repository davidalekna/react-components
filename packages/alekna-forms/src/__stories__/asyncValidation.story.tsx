import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Wrapper } from './components/styles';
import { Form, Field } from '../index';
import ShowDocs from '../__utils__/ShowDocs';
import initialFields from './fields/asyncAntd';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Label = styled.label`
  width: 100%;
  padding: 0 5px;
`;

function FieldErrors({ errors = [] }: { errors: string[] }) {
  if (errors.length) {
    return (
      <ul>
        {errors.map((err, key) => (
          <li key={key} style={{ color: 'violet' }}>
            {err}
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

const Demo = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Wrapper>
      <Form initialFields={initialFields} onSubmit={onSubmit}>
        {({ handleSubmit, clearValues, touched }) => {
          return (
            <form onSubmit={evt => handleSubmit(evt)}>
              <fieldset>
                <legend>Async Validation</legend>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Row>
                    <Field
                      name="username"
                      render={({
                        errors,
                        component: FComponent,
                        meta,
                        ...props
                      }) => {
                        return (
                          <Label>
                            {props.label}
                            <FComponent
                              {...{
                                addonAfter:
                                  meta && meta.loading ? 'loading' : null,
                                ...props,
                              }}
                            />
                            <FieldErrors errors={errors} />
                          </Label>
                        );
                      }}
                    />
                  </Row>
                  <Row>
                    <Field
                      name="firstName"
                      render={({
                        errors,
                        component: FComponent,
                        meta,
                        ...props
                      }) => {
                        return (
                          <Label>
                            {props.label}
                            <FComponent
                              {...{
                                addonAfter:
                                  meta && meta.loading ? 'loading' : null,
                                ...props,
                              }}
                            />
                            <FieldErrors errors={errors} />
                          </Label>
                        );
                      }}
                    />
                    <Field
                      name="lastName"
                      render={({
                        errors,
                        component: FComponent,
                        meta,
                        ...props
                      }) => {
                        return (
                          <Label>
                            {props.label}
                            <FComponent
                              {...{
                                addonAfter:
                                  meta && meta.loading ? 'loading' : null,
                                ...props,
                              }}
                            />
                            <FieldErrors errors={errors} />
                          </Label>
                        );
                      }}
                    />
                  </Row>
                  <Row>
                    <Field
                      name="address.line_1"
                      render={({
                        errors,
                        component: FComponent,
                        meta,
                        ...props
                      }) => {
                        return (
                          <Label>
                            {props.label}
                            <FComponent
                              {...{
                                addonAfter:
                                  meta && meta.loading ? 'loading' : null,
                                ...props,
                              }}
                            />
                            <FieldErrors errors={errors} />
                          </Label>
                        );
                      }}
                    />
                    <Field
                      name="address.line_2"
                      render={({
                        errors,
                        component: FComponent,
                        meta,
                        ...props
                      }) => {
                        return (
                          <Label>
                            {props.label}
                            <FComponent
                              {...{
                                addonAfter:
                                  meta && meta.loading ? 'loading' : null,
                                ...props,
                              }}
                            />
                            <FieldErrors errors={errors} />
                          </Label>
                        );
                      }}
                    />
                  </Row>
                </div>
                <br />
                <div>
                  {/* disabled={!touched} */}
                  <button type="submit" disabled={!touched}>
                    Submit
                  </button>
                  <button type="button" onClick={() => clearValues()}>
                    reset
                  </button>
                </div>
              </fieldset>
            </form>
          );
        }}
      </Form>
    </Wrapper>
  );
};

storiesOf('async validation', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/construct.md')} />)
  .add('Demo', () => <Demo />);
