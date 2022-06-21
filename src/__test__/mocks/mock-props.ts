import {
  IPropsDropDownListContent,
  IPropsLineChart,
  IPropsLessonsSummary,
  IPropsFilterStateOnly
} from "./mock-interface";

import {
  filterstate,
  lessonsByCampData,
  selectedSchools,
  allAnalysis,
  allCountries,
  allCamps,
  allSchools
} from "./mock-data";

export const filterStateprops: IPropsFilterStateOnly = {
  filterstate
};

export const lessonsSummaryprops: IPropsLessonsSummary = {
  filterstate,
  lessonsByCampData
};

export const lineChartProps: IPropsLineChart = {
  selectedSchools
};

export const droDownListContentProps: IPropsDropDownListContent = {
  filterstate,
  allAnalysis,
  allCountries,
  allCamps,
  allSchools
};
