import { Locale } from 'date-fns';

export type Event = {
  starts: Date;
  ends?: Date;
  [key: string]: any;
};

export type Week = {
  start: number;
  end: number;
};

export type Day = {
  date: Date;
  formatted: string;
  name: string;
  day: number;
  events: Event[];
  status: {
    past: boolean;
    future: boolean;
    weekend: boolean;
    selected?: boolean;
    offset?: boolean;
    today?: boolean;
  };
};

export type Days = Day[];

export type MonthFnProps = {
  month: number;
  year: number;
  events: Event[];
};

export type Props = {
  locale: Locale;
  format: string;
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
  now: Date;
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
