import { filter } from 'rxjs/operators';
import { SyncAction } from './types';

export const ofType = (actionType: string) => {
  return filter(({ type }: SyncAction) => type === actionType);
};
