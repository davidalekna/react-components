import { filter } from 'rxjs/operators';

export function ofType(actionType: string) {
  return filter(({ type }: any) => type === actionType);
}
