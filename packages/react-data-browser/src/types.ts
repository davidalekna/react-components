import { ReactElement } from 'react';

export type ColumnProps = {
  label: string;
  sortField: string;
  isLocked?: boolean;
  [key: string]: any;
};

export type SortDirProps = 'asc' | 'dsc';

export type DataBrowserDefaultProps = {
  initialSort?: { dir: SortDirProps; sortField: string };
  initialColumnFlex?: string[];
  initialChecked?: string[];
  totalItems?: number;
  columns: ColumnProps[];
  views?: string[];
  initialView?: string;
  children: DataBrowserRenderProps;
  stateReducer?: (state: Partial<DataBrowserState>, changes: unknown) => any;
  onStateChange?: (allChanges: any, state: DataBrowserState) => void;
  onSwitchColumns?: (visibleColumns: DataBrowserState['visibleColumns']) => void;
  onSwitchViewType?: (viewType: DataBrowserState['viewType']) => void;
  onChangeSortDirection?: (currentSort: DataBrowserState['currentSort']) => void;
  onSortData?: (currentSort: DataBrowserState['currentSort']) => void;
  onReplaceColumnFlex?: (props: {
    columnFlex: DataBrowserState['columnFlex'];
    visibleColumns: DataBrowserState['visibleColumns'];
  }) => void;
  onToggleSortDirection?: (currentSort: DataBrowserState['currentSort']) => void;
  onDeselectAll?: (checkedItems: DataBrowserState['checkedItems']) => void;
  onSelectAll?: (checkedItems: DataBrowserState['checkedItems']) => void;
  onCheckboxToggle?: (checkedItems: DataBrowserState['checkedItems']) => void;
  onToggleSort?: (currentSort: DataBrowserState['currentSort']) => void;
};

export type DataBrowserProps = Omit<DataBrowserDefaultProps, 'children'>;

export type SelectAllCheckboxStates = 'all' | 'none' | 'some' | string;

type MethodType = {
  type?: string;
};

/**
 * Dbm for DataBrowserMethod Props
 */
export type Dbm<T = {}> = MethodType & T;

type CurrentSort = {
  sortField: string;
  dir: SortDirProps;
};

export type DataBrowserState = {
  type?: string | void; // this is for passing a ref on an updated item
  columnFlex: string[] | string[][] | any;
  availableColumnFlex: null | string[];
  visibleColumns: ColumnProps[];
  viewType?: string;
  selectAllCheckboxState: SelectAllCheckboxStates;
  currentSort: CurrentSort;
  checkedItems: any[];
  getColumns: () => ColumnProps[] | void;
  getViews: () => string[] | void;
  switchViewType: Function;
  switchColumns: Function;
  checkboxState: Function;
  offsetColumns: Function;
  checkboxToggle: Function;
  onSelection: Function;
  changeSortDirection: Function;
  defaultSortMethod: Function;
  sortData: Function;
  activeSort: Function;
  replaceColumnFlex: Function;
  toggleSort: Function;
};

export type DataBrowserInternalChanges = {
  (state: DataBrowserState): Partial<DataBrowserState>;
};

interface RenderPropsAsFunction {
  (utils: Omit<DataBrowserState, 'type'>): ReactElement | null;
}

export type DataBrowserRenderProps = RenderPropsAsFunction | ReactElement;
