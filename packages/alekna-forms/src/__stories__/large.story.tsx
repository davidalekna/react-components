import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Wrapper } from './components/styles';
import ShowDocs from '../__utils__/ShowDocs';
import initialFields from './fields';
import Form from './components/Form';

const onSubmit = values => {
  console.log(values);
};

const Demo = () => {
  return (
    <Wrapper>
      <Form
        formName="Large Form"
        initialFields={initialFields}
        onSubmit={onSubmit}
      />
    </Wrapper>
  );
};

storiesOf('large form', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/large.md')} />)
  .add('Demo', () => <Demo />);
