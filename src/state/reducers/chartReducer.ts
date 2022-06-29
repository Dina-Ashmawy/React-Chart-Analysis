import { initialOptianModel } from '@/defines';
import { ActionType } from "../actions/actionType";
import { IState, ActionTypes } from "@/models/models";

export const initialState: IState = {
  allAnalysis: [],
  lessonsByCampData: [],
  allCountries: [],
  allCamps: [],
  selectedSchoolsChartData: [],
  filterState: {
    country: initialOptianModel,
    camp: initialOptianModel,
    school: initialOptianModel
  },
  allSelectedSchoolsBasedOnCountryAndCamp: []
};

const reducer = (state: IState = initialState, action: ActionTypes): IState => {
  switch (action.type) {
    case ActionType.GET_ALL_DATA_ANALYSIS:
      return {
        ...state,
        allAnalysis: action.payload
      };
    case ActionType.FILTERED_LESSONS_BY_CAMP:
      return {
        ...state,
        lessonsByCampData: action.payload
      };
    case ActionType.GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload
      };
    case ActionType.GET_ALL_CAMPS:
      return {
        ...state,
        allCamps: action.payload
      };
    case ActionType.FILTER_STATE:
      return {
        ...state,
        filterState: action.payload
      };
    case ActionType.CHART_SELECTED_SCHOOLS:
      return {
        ...state,
        selectedSchoolsChartData: action.payload
      };
    case ActionType.SELECTED_SCHOOLS_RELATED_TO_COUNTRY_AND_CAMP:
      return {
        ...state,
        allSelectedSchoolsBasedOnCountryAndCamp: action.payload
      };
    default:
      return { ...state };
  }
};

export default reducer;
