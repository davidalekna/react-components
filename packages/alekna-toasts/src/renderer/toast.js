import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledToast = styled.div`
  position: relative;
  background: darkviolet;
  color: white;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  width: 340px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 3px;
`;

export default function Toast({ id, jsx, dismiss, ...props }) {
  return (
    <StyledToast onClick={() => dismiss(id)} {...props}>
      {jsx}
    </StyledToast>
  );
}
