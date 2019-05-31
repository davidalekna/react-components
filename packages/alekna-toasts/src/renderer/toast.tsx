import React from 'react';
import { StyledToast, Loading } from './animations';
import { IToast } from '../types';

export default function Toast({
  id,
  jsx,
  progress,
  delay,
  paused,
  ...props
}: IToast) {
  return (
    <StyledToast {...props}>
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <div style={{ flex: '0 0 auto', width: 30 }}>{progress}</div>
        <div>{jsx}</div>
      </div>
      <Loading delay={delay} progress={progress} paused={paused} />
    </StyledToast>
  );
}
