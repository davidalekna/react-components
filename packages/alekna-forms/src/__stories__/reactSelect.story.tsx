import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Wrapper } from './components/styles';
import ShowDocs from '../__utils__/ShowDocs';
import initialFields from './fields/reactSelect';
import Form from './components/Form';

const onSubmit = values => {
  console.log(values);
};

const Demo = () => {
  return (
    <Wrapper>
      <Form
        formName="React Select"
        initialFields={initialFields}
        onSubmit={onSubmit}
      />
    </Wrapper>
  );
};

storiesOf('react select', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/reactSelect.md')} />)
  .add('Demo', () => <Demo />);
