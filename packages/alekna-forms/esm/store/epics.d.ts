import { Observable } from 'rxjs';
import { FormActions } from './types';
import { IField } from '../types';
export declare function onBlurEpic(action$: Observable<FormActions>): Observable<{
    type: string;
    payload: IField;
}>;
export declare function onSubmitEpic(action$: any): any;
export declare const combineEpics: (...epics: any[]) => (...streams: any[]) => Observable<{}>;
