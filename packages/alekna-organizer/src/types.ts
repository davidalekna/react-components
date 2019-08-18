export type Event = {
  starts: Date;
  ends?: Date;
  [key: string]: any;
};

export type Week = {
  start: number;
  end: number;
};

export type Props = {
  daysNames: string[];
  monthsNames: string[];
  events: Event[];
  initialGridOf: number;
  initialDate: Date;
  initialSelected: Date | null;
  //
  stateReducer: Function;
  onStateChange: Function;
  onReset: Function;
  onSelectDate: Function;
  onSelectRange: Function;
  onAddCalendarYear: Function;
  onSubCalendarYear: Function;
  onSubCalendarMonth: Function;
  onAddCalendarMonth: Function;
  onSelectMonth: Function;
  onSelectYear: Function;
  onChangeLanguage: Function;
};

export type State = {
  days: string[];
  months: string[];
  date: Date;
  selected: Date | null;
  gridOf: number;
  //
  getPrevMonthOffset: Function;
  getNextMonthOffset: Function;
  getCurrentMonth: Function;
  getFullMonth: Function;
  getFullYear: Function;
  addCalendarMonth: Function;
  subCalendarMonth: Function;
  addCalendarYear: Function;
  subCalendarYear: Function;
  selectDate: Function;
  selectRange: Function;
  reset: Function;
  selectMonth: Function;
  selectYear: Function;
  changeLanguage: Function;
};
