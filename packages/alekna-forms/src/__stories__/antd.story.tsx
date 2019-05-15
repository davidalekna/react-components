import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Wrapper } from './components/styles';
import ShowDocs from '../__utils__/ShowDocs';
import initialFields from './fields/antd';
import Form from './components/Form';

const onSubmit = values => {
  console.log(values);
};

const Demo = () => {
  return (
    <Wrapper>
      <Form
        formName="Ant Design Form"
        initialFields={initialFields}
        onSubmit={onSubmit}
      />
    </Wrapper>
  );
};

storiesOf('ant design', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useFormInputs.md')} />)
  .add('Demo', () => <Demo />);
