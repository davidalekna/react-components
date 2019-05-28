import React, { useRef, useEffect } from 'react';
import { Countdown, StyledToast } from './animations';

export default function Toast({
  id,
  jsx,
  dismiss,
  countdown,
  delay,
  ...props
}) {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, [countdown]);

  return (
    <StyledToast onClick={() => dismiss(id)} {...props}>
      <Countdown>{countdown || delay / 1000}</Countdown>
      <div>{jsx}</div>
    </StyledToast>
  );
}
