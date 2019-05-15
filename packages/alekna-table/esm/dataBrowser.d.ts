import * as React from 'react';
import * as PropTypes from 'prop-types';
import { State, Props } from './types';
export declare const DataBrowserContext: React.Context<State>;
export declare class DataBrowser extends React.Component<Props, State> {
    static propTypes: {
        children: PropTypes.Validator<(...args: any[]) => any>;
        columnFlex: PropTypes.Requireable<any[]>;
        columns: PropTypes.Validator<(PropTypes.InferProps<{
            label: PropTypes.Validator<string>;
            sortField: PropTypes.Validator<string>;
            isLocked: PropTypes.Requireable<boolean>;
        }> | null)[]>;
        initialSort: PropTypes.Requireable<PropTypes.InferProps<{
            dir: PropTypes.Requireable<string>;
            sortField: PropTypes.Requireable<string>;
        }>>;
        stateReducer: PropTypes.Requireable<(...args: any[]) => any>;
        viewType: PropTypes.Requireable<string>;
        viewsAvailable: PropTypes.Requireable<any[]>;
        totalItems: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        stateReducer: (state: State, changes: unknown) => unknown;
        onStateChange: () => void;
        onSwitchColumns: () => void;
        onSwitchViewType: () => void;
        onChangeSortDirection: () => void;
        onSortData: () => void;
        onReplaceColumnFlex: () => void;
        onDeselectAll: () => void;
        onSelectAll: () => void;
        onCheckboxToggle: () => void;
        onToggleSort: () => void;
        onToggleSortDirection: () => void;
        initialSort: {
            dir: string;
            sortField: string;
        };
        viewsAvailable: string[];
        initialColumnFlex: string[];
        initialChecked: never[];
        totalItems: number;
    };
    static stateChangeTypes: {
        deselectAll: string;
        selectAll: string;
        checkboxToggle: string;
        switchColumns: string;
        switchView: string;
        sortData: string;
        toggleSort: string;
        onItemClick: string;
        replaceColumnFlex: string;
        changeSortDirection: string;
    };
    static Consumer: React.ExoticComponent<React.ConsumerProps<State>>;
    private _columnFlexInitializer;
    /**
     * switchColumns replaces visible column with selected one from the offset
     */
    switchColumns: ({ type, from, to, }?: {
        type?: string | undefined;
        to?: string | undefined;
        from?: string | undefined;
    }) => void;
    /**
     * replaceColumnFlex
     */
    replaceColumnFlex: ({ type, columnFlex, }?: {
        type?: string | undefined;
        columnFlex?: string | undefined;
    }) => void;
    /**
     * offsetColumns returns columns that are note visible on the table
     */
    offsetColumns: () => ({
        sortField?: string | undefined;
        isLocked?: boolean | undefined;
    } & {
        visible: boolean;
    })[];
    /**
     * onSelection checks if all checboxes selected and manages selectAllCheckboxState state
     */
    onSelection: ({ type, items }?: {
        type?: string | undefined;
        items?: string[] | undefined;
    }) => void;
    /**
     * deselectAll resets checkbox checkedItems[] state to be empty
     */
    deselectAll: ({ type }?: {
        type?: string | undefined;
    }) => void;
    /**
     * selectAll checkbox to pull all ids into checkedItems[] state
     */
    selectAll: ({ type, items, }?: {
        type?: string | undefined;
        items?: string[] | undefined;
    }) => void;
    /**
     * checkboxToggle toggles or untoggles row
     */
    checkboxToggle: ({ type, rowId, }?: {
        type?: string | undefined;
        rowId?: string | undefined;
    }) => void;
    /**
     * checkboxState helps to determin current checkbox check state
     */
    checkboxState: (value: any) => boolean;
    /**
     * switchViewType triggers view switch (grid or list or others). To be improved...
     */
    switchViewType: ({ type, viewType, }?: {
        type?: string | undefined;
        viewType?: string | undefined;
    }) => void;
    /**
     * defaultSortMethod is for sort function which is usually taken from ramda or lodash
     */
    defaultSortMethod: (a: object, b: object) => 1 | 0 | -1 | undefined;
    /**
     * changeSortDirection changes direction to provided dir prop
     */
    changeSortDirection: ({ type, dir, }?: {
        type?: string | undefined;
        dir?: string | undefined;
    }) => void;
    /**
     * toggleSortDirection toggles current sort direction
     */
    toggleSortDirection: () => void;
    /**
     * toggleSort toggles data on provided sortField
     */
    toggleSort: ({ type, sortField, }?: {
        type?: string | undefined;
        sortField?: string | undefined;
    }) => void;
    /**
     * sortData sorts data on specific sortField and direction provided
     */
    sortData: ({ type, sortField, dir, }?: {
        type?: string | undefined;
        sortField?: string | undefined;
        dir?: string | undefined;
    }) => void;
    /**
     * activeSort is used on every sort element to determine if the current sort is that field
     */
    activeSort: (fieldName?: string, sortDir?: string) => boolean;
    initialState: {
        columnFlex: string | string[];
        availableColumnFlex: string[] | null;
        visibleColumns: {
            sortField?: string | undefined;
            isLocked?: boolean | undefined;
        }[];
        viewType: string;
        selectAllCheckboxState: string;
        currentSort: {
            dir: string;
            sortField: string;
        };
        checkedItems: string[];
        getColumns: () => {
            sortField?: string | undefined;
            isLocked?: boolean | undefined;
        }[];
        getViews: () => string[];
        switchViewType: ({ type, viewType, }?: {
            type?: string | undefined;
            viewType?: string | undefined;
        }) => void;
        switchColumns: ({ type, from, to, }?: {
            type?: string | undefined;
            to?: string | undefined;
            from?: string | undefined;
        }) => void;
        checkboxState: (value: any) => boolean;
        offsetColumns: () => ({
            sortField?: string | undefined;
            isLocked?: boolean | undefined;
        } & {
            visible: boolean;
        })[];
        checkboxToggle: ({ type, rowId, }?: {
            type?: string | undefined;
            rowId?: string | undefined;
        }) => void;
        onSelection: ({ type, items }?: {
            type?: string | undefined;
            items?: string[] | undefined;
        }) => void;
        changeSortDirection: ({ type, dir, }?: {
            type?: string | undefined;
            dir?: string | undefined;
        }) => void;
        defaultSortMethod: (a: object, b: object) => 1 | 0 | -1 | undefined;
        sortData: ({ type, sortField, dir, }?: {
            type?: string | undefined;
            sortField?: string | undefined;
            dir?: string | undefined;
        }) => void;
        activeSort: (fieldName?: string, sortDir?: string) => boolean;
        replaceColumnFlex: ({ type, columnFlex, }?: {
            type?: string | undefined;
            columnFlex?: string | undefined;
        }) => void;
        toggleSort: ({ type, sortField, }?: {
            type?: string | undefined;
            sortField?: string | undefined;
        }) => void;
    };
    state: {
        columnFlex: string | string[];
        availableColumnFlex: string[] | null;
        visibleColumns: {
            sortField?: string | undefined;
            isLocked?: boolean | undefined;
        }[];
        viewType: string;
        selectAllCheckboxState: string;
        currentSort: {
            dir: string;
            sortField: string;
        };
        checkedItems: string[];
        getColumns: () => {
            sortField?: string | undefined;
            isLocked?: boolean | undefined;
        }[];
        getViews: () => string[];
        switchViewType: ({ type, viewType, }?: {
            type?: string | undefined;
            viewType?: string | undefined;
        }) => void;
        switchColumns: ({ type, from, to, }?: {
            type?: string | undefined;
            to?: string | undefined;
            from?: string | undefined;
        }) => void;
        checkboxState: (value: any) => boolean;
        offsetColumns: () => ({
            sortField?: string | undefined;
            isLocked?: boolean | undefined;
        } & {
            visible: boolean;
        })[];
        checkboxToggle: ({ type, rowId, }?: {
            type?: string | undefined;
            rowId?: string | undefined;
        }) => void;
        onSelection: ({ type, items }?: {
            type?: string | undefined;
            items?: string[] | undefined;
        }) => void;
        changeSortDirection: ({ type, dir, }?: {
            type?: string | undefined;
            dir?: string | undefined;
        }) => void;
        defaultSortMethod: (a: object, b: object) => 1 | 0 | -1 | undefined;
        sortData: ({ type, sortField, dir, }?: {
            type?: string | undefined;
            sortField?: string | undefined;
            dir?: string | undefined;
        }) => void;
        activeSort: (fieldName?: string, sortDir?: string) => boolean;
        replaceColumnFlex: ({ type, columnFlex, }?: {
            type?: string | undefined;
            columnFlex?: string | undefined;
        }) => void;
        toggleSort: ({ type, sortField, }?: {
            type?: string | undefined;
            sortField?: string | undefined;
        }) => void;
    };
    isControlledProp(key: string): boolean;
    getState(stateToMerge?: {
        columnFlex: string | string[];
        availableColumnFlex: string[] | null;
        visibleColumns: {
            sortField?: string | undefined;
            isLocked?: boolean | undefined;
        }[];
        viewType: string;
        selectAllCheckboxState: string;
        currentSort: {
            dir: string;
            sortField: string;
        };
        checkedItems: string[];
        getColumns: () => {
            sortField?: string | undefined;
            isLocked?: boolean | undefined;
        }[];
        getViews: () => string[];
        switchViewType: ({ type, viewType, }?: {
            type?: string | undefined;
            viewType?: string | undefined;
        }) => void;
        switchColumns: ({ type, from, to, }?: {
            type?: string | undefined;
            to?: string | undefined;
            from?: string | undefined;
        }) => void;
        checkboxState: (value: any) => boolean;
        offsetColumns: () => ({
            sortField?: string | undefined;
            isLocked?: boolean | undefined;
        } & {
            visible: boolean;
        })[];
        checkboxToggle: ({ type, rowId, }?: {
            type?: string | undefined;
            rowId?: string | undefined;
        }) => void;
        onSelection: ({ type, items }?: {
            type?: string | undefined;
            items?: string[] | undefined;
        }) => void;
        changeSortDirection: ({ type, dir, }?: {
            type?: string | undefined;
            dir?: string | undefined;
        }) => void;
        defaultSortMethod: (a: object, b: object) => 1 | 0 | -1 | undefined;
        sortData: ({ type, sortField, dir, }?: {
            type?: string | undefined;
            sortField?: string | undefined;
            dir?: string | undefined;
        }) => void;
        activeSort: (fieldName?: string, sortDir?: string) => boolean;
        replaceColumnFlex: ({ type, columnFlex, }?: {
            type?: string | undefined;
            columnFlex?: string | undefined;
        }) => void;
        toggleSort: ({ type, sortField, }?: {
            type?: string | undefined;
            sortField?: string | undefined;
        }) => void;
    }): State;
    internalSetState: (changes: any, callback?: () => void) => void;
    render(): JSX.Element;
}
export declare function withDataBrowser(Component: any): React.ForwardRefExoticComponent<React.RefAttributes<{}>>;
export declare function useDataBrowser(): State;
