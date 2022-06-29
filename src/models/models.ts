import { ActionType } from "../state/actions/actionType";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../state/reducers/index";

export interface IState {
  allAnalysis: IAnalysis[];
  lessonsByCampData: ILessonsByCampData[];
  allCountries: IOptionModel[];
  allCamps: IOptionModel[];
  filterState: IFilterState;
  selectedSchoolsChartData: ISelectedSchools[];
  allSelectedSchoolsBasedOnCountryAndCamp: IOptionModel[];
}
export interface IAnalysis {
  id: string;
  month: string;
  camp: string;
  country: string;
  school: string;
  lessons: number;
}

export interface IFilterState {
  country?: IOptionModel;
  camp?: IOptionModel;
  school?: IOptionModel;
}
export interface ILesson {
  month: string;
  NoOfLesson: number;
  camp: string;
  country: string;
}
export interface ILessonsByCampData {
  id: number;
  schoolName: string;
  borderColor: string;
  lessonsCountNumber: number;
}

export interface IGroupedItems {
  key: string;
  list: IAnalysis[];
}
[];
/*

export interface IGroupedDictionaryItems {
  key: string;
  list: IAllAnalysis[];
}
[];*/

export interface ISelectedSchools {
  label: string;
  data: number[];
  borderColor: string;
}

export interface IActionGetAllAnalysis {
  type: ActionType.GET_ALL_DATA_ANALYSIS;
  payload: IAnalysis[];
}
export interface IActionGetAllCountries {
  type: ActionType.GET_ALL_COUNTRIES;
  payload: IOptionModel[];
}
export interface IActionGetAllCamps {
  type: ActionType.GET_ALL_CAMPS;
  payload: IOptionModel[];
}

export interface IActionFilteredLessonsByCampData {
  type: ActionType.FILTERED_LESSONS_BY_CAMP;
  payload: ILessonsByCampData[];
}
export interface IActionFilterState {
  type: ActionType.FILTER_STATE;
  payload: IFilterState;
}
export interface IActionSelectedSchools {
  type: ActionType.CHART_SELECTED_SCHOOLS;
  payload: ISelectedSchools[];
}

export interface IActionSelectedSchoolsBasedOnCountryAndCamp {
  type: ActionType.SELECTED_SCHOOLS_RELATED_TO_COUNTRY_AND_CAMP;
  payload: IOptionModel[];
}

export interface IOptionModel {
  label: string;
  value: string;
}

export interface ILocationStateType {
  Lessons: number;
  Month: string;
  SchoolName: string;
}

export type ActionTypes =
  | IActionGetAllAnalysis
  | IActionGetAllCountries
  | IActionGetAllCamps
  | IActionFilteredLessonsByCampData
  | IActionFilterState
  | IActionSelectedSchools
  | IActionSelectedSchoolsBasedOnCountryAndCamp;

export type Action = ThunkDispatch<RootState, undefined, ActionTypes>;
