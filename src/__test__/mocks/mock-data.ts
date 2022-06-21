import {
  IFilterState,
  IAllAnalysis,
  IOptionModel,
  ISelectedSchools,
  ILessonsByCampData
} from "./../../models/models";
export const filterstate: IFilterState = {
  country: { value: "Egypt", label: "Egypt" },
  camp: { value: "Omaka", label: "Omaka" },
  school: ["Burke High School"]
};

export const lessonsByCampData: ILessonsByCampData[] = [
  {
    id: 1,
    schoolName: "school1",
    borderColor: "red",
    lessonsCountNumber: 55
  },
  {
    id: 2,
    schoolName: "school2",
    borderColor: "gray",
    lessonsCountNumber: 57
  }
];

export const selectedSchools: ISelectedSchools[] = [
  {
    label: "school1",
    data: [3, 4, 5, 5, 5, 5, 6, 4, 3, 2],
    borderColor: "gray"
  },
  {
    label: "school2",
    data: [3, 4, 5, 5, 5, 5, 6, 4, 3, 2],
    borderColor: "pink"
  }
];

export const allAnalysis: IAllAnalysis[] = [];
export const allCountries: IOptionModel[] = [];
export const allCamps: IOptionModel[] = [];
export const allSchools: IOptionModel[] = [];

export const initialState = {
  ChartAnalysis: {
    allAnalysis: [],
    lessonsByCampData: lessonsByCampData,
    allCountries: [],
    allCamps: [],
    allSchools: [],
    selectedSchoolsChartData: selectedSchools,
    filterState: filterstate
  }
};
