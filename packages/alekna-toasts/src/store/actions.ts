export const CREATE = '@@toasts/CREATE';
export const DISMISS = '@@toasts/DISMISS';
export const CLEAR_ALL = '@@toasts/CLEAR_ALL';
export const MOUSE_ENTER = '@@toasts/MOUSE_ENTER';
export const MOUSE_LEAVE = '@@toasts/MOUSE_LEAVE';
export const UPDATE = '@@toasts/UPDATE';

export function createToast(toast) {
  return {
    type: CREATE,
    payload: toast,
  };
}

export function dismissToast(id: string) {
  return {
    type: DISMISS,
    payload: id,
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL,
  };
}

export function mouseEnter(id: string) {
  return {
    type: MOUSE_ENTER,
    payload: id,
  };
}

export function mouseLeave(id: string) {
  return {
    type: MOUSE_LEAVE,
    payload: id,
  };
}

export function updateToast(toast) {
  return {
    type: UPDATE,
    payload: toast,
  };
}
