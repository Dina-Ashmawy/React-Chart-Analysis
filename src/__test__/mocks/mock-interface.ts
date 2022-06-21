import {
  IAllAnalysis,
  IFilterState,
  ILessonsByCampData,
  ISelectedSchools,
  IOptionModel
} from "../../models/models";


export interface IPropsFilterStateOnly {
  filterstate: IFilterState;
}
export interface IPropsLessonsSummary {
  filterstate: IFilterState;
  lessonsByCampData: ILessonsByCampData[];
}

export interface IPropsLineChart {
  selectedSchools: ISelectedSchools[];
}

export interface IPropsDropDownListContent {
  allAnalysis: IAllAnalysis[],
  allCountries: IOptionModel[],
  allCamps: IOptionModel[],
  allSchools: IOptionModel[],
  filterstate: IFilterState,
}