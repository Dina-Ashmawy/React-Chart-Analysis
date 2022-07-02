import { ActionType } from "./actionType";
import { Action, ISelectedSchools, IAnalysis, ILessonsByCampData, IOptionModel, IGroupedItems, IFilterState, IState } from "@/models/models";
import axios from "axios";
import { store } from "../store";
import _ from "lodash";
import * as constants from "@/defines";

var uniqueSchools: IOptionModel[] = [];
var uniqueCountry: IOptionModel[] = [];
var uniqueCamps: IOptionModel[] = [];
var allUniqueSchools: IOptionModel[] = []
var datasets: ISelectedSchools[] = [];
var groupsBySchoolsArray: IGroupedItems[] = [];

export const getAllDataAnalysis = () => {
  return (dispatch: Action) => {
    axios
      .get(
        `https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json`,
        {}
      )
      .then(res => {
        dispatch({
          type: ActionType.GET_ALL_DATA_ANALYSIS,
          payload: res.data
        });

        dispatch({
          type: ActionType.GET_ALL_COUNTRIES,
          payload: setUniqueCountries(res.data)
        });

        dispatch({
          type: ActionType.GET_ALL_CAMPS,
          payload: setUniqueCamps(res.data)
        });
        dispatch(handleSelectedCountry(uniqueCountry[0]));
        dispatch(handleSelectedCamp(uniqueCamps[0]));
      });
  };
};


const setUniqueCountries = (res: IAnalysis[]): IOptionModel[] => {
  uniqueCountry = res
    .map((listItem: IAnalysis) => listItem.country)
    .filter(
      (value: string, index: number, self: string[]) => self.indexOf(value) === index
    )
    .map((item: string) => ({ label: item, value: item }));
  return uniqueCountry;
};

const setUniqueCamps = (res: IAnalysis[]): IOptionModel[] => {
  uniqueCamps = res
    .map((listItem: IAnalysis) => listItem.camp)
    .filter(
      (value: string, index: number, self: string[]) => self.indexOf(value) === index
    )
    .map((item: string) => ({ label: item, value: item }));
  return uniqueCamps;
};
const getBorderColor = (): string => {
  const r: number = Math.floor(Math.random() * 255);
  const g: number = Math.floor(Math.random() * 255);
  const b: number = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

const filterAnalysisBySelectedCountryAndCamp = (filterState: IFilterState, allAnalysis: IAnalysis[]): IGroupedItems[] => {
  let filterDataByCountryAndCamp: IAnalysis[] = [];
  if (filterState.country && filterState.camp && filterState.school) {
    filterDataByCountryAndCamp = allAnalysis.filter(
      (item: IAnalysis) =>
        item.country === filterState.country?.value &&
        item.camp === filterState.camp?.value
    );
    return convertSchoolsDictionaryAndFilter(filterDataByCountryAndCamp);
  }
  return [];
}

const convertSchoolsDictionaryAndFilter = (AnalysisFilteredList: IAnalysis[]) => {
  const groupDataBySchoolDictionary: _.Dictionary<IAnalysis[]> = _.groupBy(AnalysisFilteredList, "school");
  const groupDataBySchoolList: string[] = Object.keys(groupDataBySchoolDictionary);
  groupDataBySchoolList.forEach(key => {
    const listByKey: IAnalysis[] = groupDataBySchoolDictionary[key]
    groupsBySchoolsArray.push({ key, list: listByKey });
  });

  return groupsBySchoolsArray;
}

const selectedSchoolChartData = (): ISelectedSchools[] => {
  groupsBySchoolsArray = [];
  const state: IState = store.getState().ChartAnalysis;
  const filterState: IFilterState = state.filterState;
  const allAnalysis: IAnalysis[] = state.allAnalysis;
  let filteredBySchool: IGroupedItems[] = [];
  let filterDataByCountryAndCamp: IGroupedItems[] = filterAnalysisBySelectedCountryAndCamp(filterState, allAnalysis);

  if (filterState.school?.value === constants.selectAll.value) {
    for (let i = 0; i < filterDataByCountryAndCamp.length; i++) {
      filteredBySchool.push(filterDataByCountryAndCamp[i]);
    }
  }
  else {
    for (let i = 0; i < filterDataByCountryAndCamp.length; i++) {
      if (filterState?.school?.value.includes(filterDataByCountryAndCamp[i].key)) {
        filteredBySchool.push(filterDataByCountryAndCamp[i]);
      }
    }
    filteredBySchool = filteredBySchool.filter(school => school.key === filterState.school?.value)
  }
  handleDataSets(filteredBySchool)
  return datasets;
}


const handleDataSets = (groups: IGroupedItems[]) => {
  datasets = [];
  for (let i = 0; i < groups.length; i++) {
    const itemInGroup: IAnalysis[] = groups[i].list;
    const schoolName: string = groups[i].key;
    handleDataMonths(itemInGroup, schoolName);
  }
}

export const getLessonsByCamp = (): ILessonsByCampData[] => {
  let lessonsSummary: ILessonsByCampData[] = [];
  const state: IState = store.getState().ChartAnalysis;
  state.lessonsByCampData = [];
  let itemInGroup: IAnalysis[];
  let countLessons: number = 0;
  for (let i = 0; i < groupsBySchoolsArray.length; i++) {
    itemInGroup = groupsBySchoolsArray[i].list;
    const schoolNameInDataSet: string = groupsBySchoolsArray[i]?.key;

    let itemInSelectedSchools = datasets.find((item: ISelectedSchools) => item.label?.indexOf(schoolNameInDataSet) !== -1) ?? undefined;
    for (let y = 0; y < itemInGroup.length; y++) {
      countLessons = countLessons + itemInGroup[y].lessons;
    }
    lessonsSummary.push({
      schoolName: groupsBySchoolsArray[i].key,
      lessonsCountNumber: countLessons,
      borderColor: itemInSelectedSchools?.borderColor ?? "lightgrey",
      id: i + 1
    });
    countLessons = 0
  }

  lessonsSummary.sort((a, b) => (a.borderColor < b.borderColor) ? 1 : -1)
  return lessonsSummary;
}

const handleDataMonths = (itemInGroup: IAnalysis[], schoolName: string): void => {
  const arrayNumberOfLessons: number[] = [];
  for (let y = 0; y < constants.months.length; y++) {
    let totalLessonsInMonth: number = 0;
    const monthValue: IAnalysis[] = itemInGroup.filter(item => item.month === constants.months[y]);
    if (monthValue.length === 0) {
      arrayNumberOfLessons.push(0);
    } else if (monthValue.length === 1) {
      arrayNumberOfLessons.push(Number(monthValue[0].lessons));
    } else {
      for (
        let selectedMonth: number = 0;
        selectedMonth < monthValue.length;
        selectedMonth++
      ) {
        totalLessonsInMonth =
          totalLessonsInMonth + monthValue[selectedMonth].lessons;
      }
      arrayNumberOfLessons.push(totalLessonsInMonth);
    }
  }
  datasets.push({
    label: schoolName,
    data: arrayNumberOfLessons,
    borderColor: getBorderColor()
  });
}

export const handleSelectedCountry = (selectedCountry: IOptionModel) => {
  return (dispatch: Action) => {
    const state: IState = store.getState().ChartAnalysis;
    dispatch({
      type: ActionType.FILTER_STATE,
      payload: {
        ...state.filterState,
        country: selectedCountry
      }
    });
    dispatch(handleSelectedSchool(allUniqueSchools[0]));
  };
}


export const SelectedSchoolsBasedOnCountryAndCamp = (): IOptionModel[] => {
  uniqueSchools = groupsBySchoolsArray.map((item) => ({ label: item.key, value: item.key }));
  allUniqueSchools = [constants.selectAll, ...uniqueSchools];
  return allUniqueSchools;
}

export const handleSelectedCamp = (selectedCamp: IOptionModel) => {
  return (dispatch: Action) => {
    const state: IState = store.getState().ChartAnalysis;
    dispatch({
      type: ActionType.FILTER_STATE,
      payload: { ...state.filterState, camp: selectedCamp }
    });
    dispatch(handleSelectedSchool(allUniqueSchools[0]));
  };
}

export const handleSelectedSchool = (selectedSchool: IOptionModel) => {
  return (dispatch: Action) => {
    const state = store.getState();
    dispatch({
      type: ActionType.FILTER_STATE,
      payload: { ...state.ChartAnalysis.filterState, school: selectedSchool }
    });
    dispatch({
      type: ActionType.CHART_SELECTED_SCHOOLS,
      payload: selectedSchoolChartData()
    });
    dispatch({
      type: ActionType.FILTERED_LESSONS_BY_CAMP,
      payload: getLessonsByCamp()
    });
    dispatch({
      type: ActionType.SELECTED_SCHOOLS_RELATED_TO_COUNTRY_AND_CAMP,
      payload: SelectedSchoolsBasedOnCountryAndCamp()
    });
  };
};

