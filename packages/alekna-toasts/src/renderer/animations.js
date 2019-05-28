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
  }
`;

export const Countdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  margin-right: 10px;
  height: 100%;
  width: 50px;
  font-size: 20px;
`;

export const StyledToast = styled.div`
  display: flex;
  flex: 0 0 auto;

  width: 340px;

  position: relative;
  background: #333;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  padding: 10px;
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
