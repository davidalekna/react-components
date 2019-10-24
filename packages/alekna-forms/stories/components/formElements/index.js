import React from 'react';
import styled, { keyframes } from 'styled-components';

export const StyledLabel = styled.label``;

export const FormLabel = styled.div`
  font-weight: 400;
  margin: 4px 0;
`;

export function FieldErrors({ errors = [] }: { errors: string[] }) {
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

const spin = keyframes`
  to {transform: rotate(360deg);}
`;

const Spinner = styled.span`
  width: ${props => (props.size ? `${props.size}px` : '32px')};
  height: ${props => (props.size ? `${props.size}px` : '32px')};
  &:before {
    content: '';
    box-sizing: border-box;
    display: inline-block;
    position: ${props => (props.inline ? 'relative' : 'absolute')};
    top: ${props => (props.inline ? '0' : '50%')};
    left: ${props => (props.inline ? '0' : '50%')};
    width: ${props => (props.size !== undefined ? `${props.size}px` : '16px')};
    height: ${props => (props.size !== undefined ? `${props.size}px` : '16px')};
    margin-top: ${props =>
      props.size !== undefined ? `-${props.size / 2}px` : '-8px'};
    margin-left: ${props =>
      props.size !== undefined ? `-${props.size / 2}px` : '-8px'};
    border-radius: 50%;
    border: ${props => '2px'} solid transparent;
    border-top: 3px solid #ccc;
    animation: ${spin} 500ms linear infinite;
  }
`;

export const FieldLoader = ({ children, loading }) => {
  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <Spinner
          size={16}
          style={{
            position: 'absolute',
            right: 10,
            zIndex: 1,
            top: 0,
            bottom: 0,
            margin: 'auto 0',
          }}
        />
      )}
      {children}
    </div>
  );
};
