import styled, { keyframes } from 'styled-components';

const slideWithBouce = keyframes`
  0% {
    opacity: 0.7;
    transform: scale(1,1) translateX(380px);
  }
  10% {
    opacity: 0.8;
    transform: scale(1.1,.9) translateX(0);
  }
  30% {
    opacity: 0.9;
    transform: scale(.9,1.1) translateX(-25px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05,.95) translateX();
  }
  57% {
    opacity: 1;
    transform: scale(1,1) translateX(0);
  }
  64% {
    opacity: 1;
    transform: scale(1,1) translateX(0);
  }
  100% {
    opacity: 1;
    transform: scale(1,1) translateX(0);
    perspective: 1000;
  }
`;

const slideBar = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const Loading = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.2);

  &:after {
    content: '';
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 9px;
    position: absolute;
    width: 100%;
    height: 10px;
    background: #42f4a4;
    animation: ${slideBar} ${({ delay }) => delay}s ease-in;
    animation-play-state: ${({ paused }) => (paused ? 'paused' : 'running')};
  }
`;

export const StyledToast = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  overflow: hidden;

  width: 340px;

  position: relative;
  background: #2e3833;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir,
    'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial,
    sans-serif;
  color: #f7fffb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  border-radius: 5px;

  animation: ${slideWithBouce} 800ms ease-in-out;
`;

export const Container = styled.div`
  /* .toast-enter {
  opacity: 0;
}
.toast-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
} */
  .toast-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .toast-exit-active {
    opacity: 0;
    transform: translateX(380px);
    transition: all 150ms ease-in;
  }
`;
