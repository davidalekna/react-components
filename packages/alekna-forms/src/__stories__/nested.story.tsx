import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Wrapper } from './components/styles';
import ShowDocs from '../__utils__/ShowDocs';
import initialFields from './fields/nested';
import Form from './components/Form';

const onSubmit = values => {
  console.log(values);
};

const Demo = () => {
  return (
    <Wrapper>
      <Form
        formName="Nested Fields"
        initialFields={initialFields}
        onSubmit={onSubmit}
      />
      ;
    </Wrapper>
  );
};

storiesOf('nested', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useFormInputs.md')} />)
  .add('Demo', () => <Demo />);
