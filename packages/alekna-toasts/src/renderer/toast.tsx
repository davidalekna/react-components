import React from 'react';
import { StyledToast, Loading } from './animations';
import { IToast } from '../types';

export default function Toast({
  id,
  jsx,
  countdown,
  delay,
  paused,
  ...props
}: IToast) {
  console.log(delay / 1000);
  console.log(paused);
  console.log(countdown);

  return (
    <StyledToast {...props}>
      <div style={{ padding: 10 }}>{jsx}</div>
      <Loading delay={delay / 1000} paused={paused} countdown={countdown} />
    </StyledToast>
  );
}
