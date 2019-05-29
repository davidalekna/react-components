import React, { useRef, useEffect } from 'react';
import { Countdown, StyledToast } from './animations';
import { IToast } from '../types';

export default function Toast({ id, jsx, countdown, delay, ...props }: IToast) {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, [countdown]);

  return (
    <StyledToast {...props}>
      <Countdown>{countdown || delay / 1000}</Countdown>
      <div>{jsx}</div>
    </StyledToast>
  );
}
