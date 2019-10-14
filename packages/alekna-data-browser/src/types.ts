type Column = {
  sortField?: string;
  isLocked?: boolean;
};

export type Props = {
  stateReducer: (state: State, changes: unknown) => any;
  onStateChange: (allChanges: any, state: State) => void;
  onSwitchColumns: (visibleColumns: State['visibleColumns']) => void;
  onSwitchViewType: (viewType: State['viewType']) => void;
  onChangeSortDirection: (currentSort: State['currentSort']) => void;
  onSortData: (currentSort: State['currentSort']) => void;
  onReplaceColumnFlex: ({
    columnFlex,
    visibleColumns,
  }: {
    columnFlex: State['columnFlex'];
    visibleColumns: State['visibleColumns'];
  }) => void;
  onToggleSortDirection: (currentSort: State['currentSort']) => void;
  onDeselectAll: (checkedItems: State['checkedItems']) => void;
  onSelectAll: (checkedItems: State['checkedItems']) => void;
  onCheckboxToggle: (checkedItems: State['checkedItems']) => void;
  onToggleSort: (currentSort: State['currentSort']) => void;
  initialSort: { dir: string; sortField: string };
  initialColumnFlex: string[];
  initialChecked: string[];
  totalItems: number;
  columns: Column[];
  views: string[];
  initialView: string;
};

export type CheckboxAllState = 'all' | 'none' | 'some' | string;

export type State = {
  type?: any; // this is for passing a ref on an updated item
  columnFlex: string[] | string[][] | any;
  availableColumnFlex: null | string[];
  visibleColumns: Column[];
  viewType?: string;
  selectAllCheckboxState: CheckboxAllState;
  currentSort: any;
  checkedItems: string[];
  getColumns: () => Column[] | void;
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
