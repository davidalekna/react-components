export type DataBrowserColumn = {
  sortField: string;
  isLocked?: boolean;
};

export type DataBrowserProps = {
  stateReducer: (state: Partial<DataBrowserState>, changes: unknown) => any;
  onStateChange: (allChanges: any, state: DataBrowserState) => void;
  onSwitchColumns: (visibleColumns: DataBrowserState["visibleColumns"]) => void;
  onSwitchViewType: (viewType: DataBrowserState["viewType"]) => void;
  onChangeSortDirection: (currentSort: DataBrowserState["currentSort"]) => void;
  onSortData: (currentSort: DataBrowserState["currentSort"]) => void;
  onReplaceColumnFlex: ({
    columnFlex,
    visibleColumns
  }: {
    columnFlex: DataBrowserState["columnFlex"];
    visibleColumns: DataBrowserState["visibleColumns"];
  }) => void;
  onToggleSortDirection: (currentSort: DataBrowserState["currentSort"]) => void;
  onDeselectAll: (checkedItems: DataBrowserState["checkedItems"]) => void;
  onSelectAll: (checkedItems: DataBrowserState["checkedItems"]) => void;
  onCheckboxToggle: (checkedItems: DataBrowserState["checkedItems"]) => void;
  onToggleSort: (currentSort: DataBrowserState["currentSort"]) => void;
  initialSort: { dir: string; sortField: string };
  initialColumnFlex: string[];
  initialChecked: string[];
  totalItems: number;
  columns: DataBrowserColumn[];
  views: string[];
  initialView: string;
};

export type SelectAllCheckboxStates = "all" | "none" | "some" | string;

type MethodType = {
  type?: string;
};

/**
 * Dbm for DataBrowserMethod Props
 */
export type Dbm<T = {}> = MethodType & T;

export type DataBrowserState = {
  type?: string | void; // this is for passing a ref on an updated item
  columnFlex: string[] | string[][] | any;
  availableColumnFlex: null | string[];
  visibleColumns: DataBrowserColumn[];
  viewType?: string;
  selectAllCheckboxState: SelectAllCheckboxStates;
  currentSort: any;
  checkedItems: any[];
  getColumns: () => DataBrowserColumn[] | void;
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
