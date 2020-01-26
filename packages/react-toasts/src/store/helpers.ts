import { filter } from 'rxjs/operators';

export function ofType(actionType: string) {
  return filter(({ type }: any) => type === actionType);
}

export function filterById(id: string) {
  return filter((action: any) => {
    return action.payload === id;
  });
}

export function generateId() {
  return (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10);
}
