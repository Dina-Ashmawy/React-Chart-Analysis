import { ActionType } from "../state/actions/actionType";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../state/reducers/index";

export interface IState {
  allAnalysis: IAllAnalysis[];
  lessonsByCampData: ILessonsByCampData[];
  allCountries: IOptionModel[];
  allCamps: IOptionModel[];
  allSchools: IOptionModel[];
  filterState: IFilterState;
  selectedSchoolsChartData: ISelectedSchools[];
}
export interface IAnalysis {
  id: string;
  month: string;
  camp: string;
  country: string;
  school: string;
  lessons: number;
}
export interface IAllAnalysis {
  allAnalysis: IAnalysis[];
}

export interface IFilterState {
  country?: IOptionModel;
  camp?: IOptionModel;
  school?: string[];
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
  list: any[];
}
[];

export interface ISelectedSchools {
  label: string;
  data: number[];
  borderColor: string;
}

export interface IActionGetAllAnalysis {
  type: ActionType.GET_ALL_DATA_ANALYSIS;
  payload: IAllAnalysis[];
}
export interface IActionGetAllCountries {
  type: ActionType.GET_ALL_COUNTRIES;
  payload: IOptionModel[];
}
export interface IActionGetAllCamps {
  type: ActionType.GET_ALL_CAMPS;
  payload: IOptionModel[];
}
export interface IActionGetAllSchools {
  type: ActionType.GET_ALL_SCHOOLS;
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
  | IActionGetAllSchools
  | IActionFilteredLessonsByCampData
  | IActionFilterState
  | IActionSelectedSchools;

export type Action = ThunkDispatch<RootState, undefined, ActionTypes>;
