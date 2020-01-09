import { createContext } from "react";
import { DataBrowserState } from "./types";

const DataBrowserContext = createContext<DataBrowserState>({
  columnFlex: [],
  availableColumnFlex: null,
  visibleColumns: [],
  // viewType: '',
  selectAllCheckboxState: "none",
  currentSort: { sortField: "id", dir: "asc" },
  checkedItems: [],
  // fns
  getColumns: () => {},
  getViews: () => {},
  switchViewType: () => {},
  switchColumns: () => {},
  checkboxState: () => {},
  offsetColumns: () => {},
  checkboxToggle: () => {},
  onSelection: () => {},
  changeSortDirection: () => {},
  defaultSortMethod: () => {},
  sortData: () => {},
  activeSort: () => {},
  replaceColumnFlex: () => {},
  toggleSort: () => {}
});

export default DataBrowserContext;
