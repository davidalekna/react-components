import * as React from 'react';
import { Form as Frm, FieldContainer } from '../../index';
import Container from './Container';

export default function Form({
  formName = 'Test Form',
  initialFields,
  onSubmit,
}) {
  return (
    <Frm initialFields={initialFields} onSubmit={onSubmit}>
      {({ fields, handleSubmit, clearValues }) => {
        return (
          <section>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>{formName}</legend>
                {fields.map(field => (
                  <FieldContainer
                    {...{
                      ...field,
                      key: field.name,
                      children: Container,
                    }}
                  />
                ))}
              </fieldset>
              <br />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => clearValues()}>
                reset
              </button>
            </form>
          </section>
        );
      }}
    </Frm>
  );
}
