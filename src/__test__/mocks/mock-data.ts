import { IFilterState, IAnalysis, IOptionModel, ISelectedSchools, ILessonsByCampData } from '@/models/models';
export const filterstate: IFilterState = {
  country: { value: 'Egypt', label: 'Egypt' },
  camp: { value: 'Omaka', label: 'Omaka' },
  school: { value: 'Burke High School', label: 'Burke High School' }
};

export const lessonsByCampData: ILessonsByCampData[] = [
  {
    id: 1,
    schoolName: 'school1',
    borderColor: 'red',
    lessonsCountNumber: 55
  },
  {
    id: 2,
    schoolName: 'school2',
    borderColor: 'gray',
    lessonsCountNumber: 57
  }
];

export const selectedSchools: ISelectedSchools[] = [
  {
    label: 'school1',
    data: [3, 4, 5, 5, 5, 5, 6, 4, 3, 2],
    borderColor: 'gray'
  },
  {
    label: 'school2',
    data: [3, 4, 5, 5, 5, 5, 6, 4, 3, 2],
    borderColor: 'pink'
  }
];

export const allAnalysis: IAnalysis[] = [];
export const allCountries: IOptionModel[] = [];
export const allCamps: IOptionModel[] = [];
export const allSelectedSchoolsBasedOnCountryAndCamp: IOptionModel[] = [];

export const initialState = {
  ChartAnalysis: {
    allAnalysis: [],
    lessonsByCampData: lessonsByCampData,
    allCountries: [],
    allCamps: [],
    selectedSchoolsChartData: selectedSchools,
    filterState: filterstate,
    allSelectedSchoolsBasedOnCountryAndCamp: []
  }
};
