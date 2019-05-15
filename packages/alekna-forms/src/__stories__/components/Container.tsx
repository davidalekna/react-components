import * as React from 'react';
import { StyledLabel, StyledLabelText } from './styles';

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

const Container = ({ component: Field, ...props }) => {
  return (
    <StyledLabel>
      <StyledLabelText>{props.label}</StyledLabelText>
      <Field {...props} />
      <FieldErrors errors={...props.errors} />
    </StyledLabel>
  );
};

export default Container;
