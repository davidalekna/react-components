export const CREATE = '@@toasts/CREATE';
export const DISMISS = '@@toasts/DISMISS';
export const CLEAR_ALL = '@@toasts/CLEAR_ALL';

export function createToast(toast) {
  return {
    type: CREATE,
    payload: toast,
  };
}

export function dismissToast(id) {
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
