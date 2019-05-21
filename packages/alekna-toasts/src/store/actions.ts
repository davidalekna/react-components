export const CREATE = '@@toasts/CREATE';
export const DISMISS = '@@toasts/DISMISS';

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
