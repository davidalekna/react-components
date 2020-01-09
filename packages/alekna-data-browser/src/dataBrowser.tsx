import React from "react";
import PropTypes from "prop-types";
import DataBrowserContext from "./context";
import { getObjectPropertyByString, arrayHasArrays } from "./utils";
import { DataBrowserState, DataBrowserProps, Dbm } from "./types";

const LIST = "LIST";
const GRID = "GRID";
const LOADING = "LOADING";

export const StateChangeTypes = {
  deselectAll: "__deselect_all__",
  selectAll: "__select_all__",
  checkboxToggle: "__checbox_toggle__",
  switchColumns: "__switch_columns__",
  switchView: "__switch_view__",
  sortData: "__sort_data__",
  toggleSort: "__toggle_sort__",
  onItemClick: "__on_item_select__",
  replaceColumnFlex: "__replace_column_flex__",
  changeSortDirection: "__change_sort_directon__"
};

interface DataBrowserInternalChanges {
  (state: DataBrowserState): Partial<DataBrowserState>;
}

export class DataBrowser extends React.Component<
  DataBrowserProps,
  DataBrowserState
> {
  static propTypes = {
    children: PropTypes.func.isRequired,
    columnFlex: PropTypes.array,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        sortField: PropTypes.string.isRequired,
        isLocked: PropTypes.bool
      })
    ).isRequired,
    stateReducer: PropTypes.func,
    // sorting
    initialSort: PropTypes.shape({
      dir: PropTypes.string,
      sortField: PropTypes.string
    }),
    // checkboxes
    totalItems: PropTypes.number,
    // views
    initialView: PropTypes.string,
    viewType: PropTypes.string,
    views: PropTypes.array
  };
  static defaultProps = {
    // on action
    stateReducer: (state: Partial<DataBrowserState>, changes: unknown) =>
      changes,
    onStateChange: () => {},
    onSwitchColumns: () => {},
    onSwitchViewType: () => {},
    onChangeSortDirection: () => {},
    onSortData: () => {},
    onReplaceColumnFlex: () => {},
    onDeselectAll: () => {},
    onSelectAll: () => {},
    onCheckboxToggle: () => {},
    onToggleSort: () => {},
    onToggleSortDirection: () => {},
    // sorting
    initialSort: { dir: "", sortField: "" },
    // visible columns
    initialColumnFlex: ["0 0 25%", "1 1 35%", "0 0 20%", "0 0 20%"],
    // checkboxes
    initialChecked: [],
    totalItems: 0,
    // views
    views: [LIST, GRID, LOADING],
    initialView: LIST

    // TODO: move static props under initialState
    //
    // initialState: {
    //   sort: { dir: '', sortField: '' },
    //   columnFlex: ['0 0 25%', '1 1 35%', '0 0 20%', '0 0 20%'],
    //   checkedItems: [],
    //   totalItems: 0,
    //   availableViews: [LIST, GRID, LOADING],
    //   selectedView: LIST,
    // }
  };
  static stateChangeTypes = StateChangeTypes;
  static Consumer = DataBrowserContext.Consumer;
  private columnFlexInitializer = () => {
    return arrayHasArrays(this.props.initialColumnFlex)
      ? this.props.initialColumnFlex[0]
      : this.props.initialColumnFlex;
  };
  public componentDidUpdate(prevProps: DataBrowserProps) {
    // NOTE: replace columns if there was a change on `initialColumnFlex` prop.
    // helps on screen resizes if there is a requirement to show less/more columns.
    if (
      JSON.stringify(prevProps.initialColumnFlex) !==
        JSON.stringify(this.props.initialColumnFlex) &&
      Array.isArray(this.props.initialColumnFlex) &&
      this.props.initialColumnFlex.length > 0
    ) {
      // TODO: maybe we should check on the screen width and
      // return columns from the `availableColumnFlex`?...
      this.replaceColumnFlex({
        columnFlex: this.props.initialColumnFlex
      });
    }
  }
  /**
   * replaceColumnFlex will change the amount of visible columns
   */
  public replaceColumnFlex = ({
    type = DataBrowser.stateChangeTypes.replaceColumnFlex,
    columnFlex = []
  }: Dbm<{ columnFlex?: string[] }> = {}) => {
    this.internalSetState(
      state => {
        const visibleSortFields = state.visibleColumns
          .map(({ sortField }) => sortField)
          .reverse();
        return {
          type,
          columnFlex,
          visibleColumns: this.props.columns
            .sort((a, b) => {
              return (
                visibleSortFields.indexOf(b.sortField) -
                visibleSortFields.indexOf(a.sortField)
              );
            })
            .slice(0, columnFlex.length)
        };
      },
      () =>
        this.props.onReplaceColumnFlex({
          columnFlex: this.getState().columnFlex,
          visibleColumns: this.getState().visibleColumns
        })
    );
  };
  /**
   * switchColumns replaces visible column with selected from the offset
   */
  public switchColumns = ({
    type = DataBrowser.stateChangeTypes.switchColumns,
    from,
    to
  }: Dbm<{ to?: string; from?: string }> = {}) => {
    const { visibleColumns: columns, offsetColumns } = this.getState();
    if (columns && offsetColumns) {
      const index = columns.findIndex(x => x.sortField === from);
      const visibleColumns = columns.filter(col => col.sortField !== from);
      const replacement = offsetColumns().find(
        ({ sortField }) => sortField === to
      );
      visibleColumns.splice(index, 0, replacement);
      this.internalSetState(
        () => ({ type, visibleColumns }),
        () => this.props.onSwitchColumns(this.getState().visibleColumns)
      );
    }
  };
  /**
   * offsetColumns returns items that are note visible
   */
  public offsetColumns = () => {
    const { visibleColumns } = this.getState();
    if (visibleColumns) {
      const visible = visibleColumns.map(c => c.sortField);
      return this.props.columns
        .filter(c => !c.isLocked)
        .map(col => {
          if (visible.includes(col.sortField)) {
            return Object.assign(col, { visible: true });
          } else {
            return Object.assign(col, { visible: false });
          }
        });
    } else {
      return [];
    }
  };
  /**
   * onSelection checks if all checboxes selected and manages selectAllCheckboxState state
   */
  public onSelection = ({ type, items }: Dbm<{ items?: string[] }> = {}) => {
    switch (this.getState().selectAllCheckboxState) {
      case "all":
        return this.deselectAll({ type });
      case "some":
        return this.deselectAll({ type });
      case "none":
        return this.selectAll({ type, items });
      default:
        return this.deselectAll({ type });
    }
  };
  /**
   * deselectAll resets checkbox checkedItems[] state to be empty
   */
  public deselectAll = ({
    type = DataBrowser.stateChangeTypes.deselectAll
  } = {}) => {
    this.internalSetState(
      () => ({ type, selectAllCheckboxState: "none", checkedItems: [] }),
      () => this.props.onDeselectAll(this.getState().checkedItems)
    );
  };
  /**
   * selectAll checkbox to pull all ids into checkedItems[] state
   */
  public selectAll = ({
    type = DataBrowser.stateChangeTypes.selectAll,
    items
  }: Dbm<{ items?: string[] }> = {}) => {
    // NOTE: selectAll can be used for range selection.
    // could be renamed to `selectMany`
    this.internalSetState(
      () => ({
        type,
        selectAllCheckboxState:
          this.props.totalItems === items.length ? "all" : "some",
        checkedItems: items
      }),
      () => this.props.onSelectAll(this.getState().checkedItems)
    );
  };
  /**
   * checkboxToggle toggles or untoggles item
   */
  public checkboxToggle = ({
    type = DataBrowser.stateChangeTypes.checkboxToggle,
    rowId = ""
  }: Dbm<{ rowId?: string }> = {}) => {
    const checkedItems = this.getState().checkedItems;
    if (checkedItems) {
      if (!checkedItems.includes(rowId)) {
        // checkedItems state does not include id
        this.internalSetState(
          state => ({
            type,
            checkedItems: [...state.checkedItems, rowId]
          }),
          () => {
            this.setState(state => {
              if (state.checkedItems) {
                return {
                  selectAllCheckboxState:
                    this.props.totalItems === state.checkedItems.length
                      ? "all"
                      : "some"
                };
              } else {
                //  ???
                return {
                  selectAllCheckboxState: "none"
                };
              }
            });
            this.props.onCheckboxToggle(checkedItems);
          }
        );
      } else {
        // checkedItems state includes id
        this.internalSetState(
          state => ({
            type,
            selectAllCheckboxState: "some",
            checkedItems: state.checkedItems.filter(id => id !== rowId)
          }),
          () => this.props.onCheckboxToggle(checkedItems)
        );
      }
    }
  };
  /**
   * checkboxState helps to determin current checkbox check state
   */
  public checkboxState = (value: string | number) => {
    const { checkedItems } = this.getState();
    if (!checkedItems || checkedItems.length < 1) return false;
    return checkedItems.includes(value);
  };
  /**
   * switchViewType triggers view switch (grid or list or others). To be improved...
   */
  public switchViewType = ({
    type = DataBrowser.stateChangeTypes.switchView,
    viewType = ""
  } = {}) => {
    if (this.props.views.includes(viewType)) {
      this.internalSetState(
        () => ({ type, viewType }),
        () => this.props.onSwitchViewType(viewType)
      );
    } else {
      console.warn(`${viewType} not in available views`);
    }
  };
  /**
   * defaultSortMethod is for sort function which is usually taken from ramda or lodash
   */
  public defaultSortMethod = (a: object, b: object) => {
    // TODO: could rename to clientSortMethod or clientSort
    const { sortField, dir } = this.getState().currentSort;
    if (sortField && dir) {
      let nameA = getObjectPropertyByString(a, sortField);
      let nameB = getObjectPropertyByString(b, sortField);
      // force null and undefined to the bottom
      nameA = nameA === null || nameA === undefined ? "" : nameA;
      nameB = nameB === null || nameB === undefined ? "" : nameB;
      // force any string values to lowercase
      nameA = typeof nameA === "string" ? nameA.toLowerCase() : nameA;
      nameB = typeof nameB === "string" ? nameB.toLowerCase() : nameB;
      // Return either 1 or -1 to indicate a sort priority
      if (dir.toLowerCase() === "asc") {
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      }
      if (dir.toLowerCase() === "dsc") {
        if (nameA > nameB) {
          return -1;
        } else if (nameA < nameB) {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    }
    return undefined;
  };
  /**
   * changeSortDirection changes direction to provided dir prop
   */
  public changeSortDirection = ({
    type = DataBrowser.stateChangeTypes.changeSortDirection,
    dir = "asc"
  } = {}) => {
    this.internalSetState(
      state => ({
        type,
        currentSort: { sortField: state.currentSort.sortField, dir }
      }),
      () => this.props.onChangeSortDirection(this.getState().currentSort)
    );
  };
  /**
   * toggleSortDirection toggles current sort direction
   */
  public toggleSortDirection = () => {
    this.internalSetState(
      ({ currentSort }) => ({
        currentSort: {
          dir: currentSort.dir === "asc" ? "dsc" : "asc",
          sortField: currentSort.sortField
        }
      }),
      () => this.props.onToggleSortDirection(this.getState().currentSort)
    );
  };
  /**
   * toggleSort toggles data on provided sortField
   */
  public toggleSort = ({
    type = DataBrowser.stateChangeTypes.toggleSort,
    sortField
  }: Dbm<{ sortField?: string }> = {}) => {
    this.internalSetState(
      state => ({
        type,
        currentSort: {
          dir: state.currentSort.dir === "asc" ? "dsc" : "asc",
          sortField
        }
      }),
      () => this.props.onToggleSort(this.getState().currentSort)
    );
  };
  /**
   * sortData sorts data on specific sortField and direction provided
   */
  public sortData = ({
    type = DataBrowser.stateChangeTypes.sortData,
    sortField,
    dir
  }: Dbm<{ sortField?: string; dir?: string }> = {}) => {
    this.internalSetState(
      {
        type,
        currentSort: { sortField, dir }
      },
      () => this.props.onSortData(this.getState().currentSort)
    );
  };
  /**
   * activeSort is used on every sort element to determine if the current sort is that field
   */
  public activeSort = (
    fieldName: string = "",
    sortDir: string = ""
  ): boolean => {
    const currentSort = this.getState().currentSort;
    const isActive = currentSort.sortField === fieldName;
    const isCurrentSortDir = currentSort.dir === sortDir;
    return isActive && isCurrentSortDir;
  };
  initialState = {
    columnFlex: this.columnFlexInitializer(),
    availableColumnFlex: arrayHasArrays(this.props.initialColumnFlex)
      ? this.props.initialColumnFlex
      : null,
    visibleColumns: this.props.columns.slice(
      0,
      this.columnFlexInitializer().length
    ),
    selectAllCheckboxState: "none",
    currentSort: this.props.initialSort,
    checkedItems: this.props.initialChecked,
    viewType: this.props.initialView,
    // fns
    getColumns: () => this.props.columns,
    getViews: () => this.props.views,
    switchViewType: this.switchViewType,
    switchColumns: this.switchColumns,
    checkboxState: this.checkboxState,
    offsetColumns: this.offsetColumns,
    checkboxToggle: this.checkboxToggle,
    onSelection: this.onSelection,
    changeSortDirection: this.changeSortDirection,
    defaultSortMethod: this.defaultSortMethod,
    sortData: this.sortData,
    activeSort: this.activeSort,
    replaceColumnFlex: this.replaceColumnFlex,
    toggleSort: this.toggleSort
  };
  state = this.initialState;
  private isControlledProp(key: string) {
    return this.props[key] !== undefined;
  }
  private getState = (
    stateToMerge: DataBrowserState = this.state
  ): Partial<DataBrowserState> => {
    return Object.keys(stateToMerge).reduce((state, key) => {
      state[key] = this.isControlledProp(key)
        ? this.props[key]
        : stateToMerge[key];
      return state;
    }, {});
  };
  private internalSetState = (
    changes: DataBrowserInternalChanges | Partial<DataBrowserState>,
    callback = () => {}
  ): void => {
    let allChanges: unknown;
    this.setState(
      currentState => {
        const combinedState = this.getState(currentState);
        return [changes]
          .map(c => (typeof c === "function" ? c(currentState) : c))
          .map(c => {
            allChanges = this.props.stateReducer(combinedState, c) || {};
            return allChanges;
          })
          .map(({ type: ignoredType, ...onlyChanges }) => onlyChanges)
          .map(c => {
            return Object.keys(combinedState).reduce((newChanges, stateKey) => {
              if (!this.isControlledProp(stateKey)) {
                newChanges[stateKey] = c.hasOwnProperty(stateKey)
                  ? c[stateKey]
                  : combinedState[stateKey];
              }
              return newChanges;
            }, {});
          })
          .map(c => (Object.keys(c || {}).length ? c : null))[0];
      },
      () => {
        this.props.onStateChange(allChanges, this.state);
        callback();
      }
    );
  };
  render() {
    const { children } = this.props;
    const ui = typeof children === "function" ? children(this.state) : children;
    return (
      <DataBrowserContext.Provider value={this.state}>
        {ui}
      </DataBrowserContext.Provider>
    );
  }
}

export function withDataBrowser(Component) {
  const Wrapper = React.forwardRef((props, ref) => {
    return (
      <DataBrowser.Consumer>
        {dbUtils => <Component {...props} {...dbUtils} ref={ref} />}
      </DataBrowser.Consumer>
    );
  });
  return Wrapper;
}

export function useDataBrowser() {
  const utils = React.useContext(DataBrowserContext);
  return utils;
}
