import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledToast = styled.div`
  display: flex;
  flex: 0 0 auto;

  width: 340px;

  position: relative;
  background: #333;
  color: white;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`;

const StyledCounter = styled.div`
  font-size: 24px;
  padding-right: 10px;
`;

export default function Toast({ id, jsx, dismiss, countdown, ...props }) {
  return (
    <StyledToast onClick={() => dismiss(id)} {...props}>
      <StyledCounter>{countdown}</StyledCounter>
      <div>{jsx}</div>
    </StyledToast>
  );
}
