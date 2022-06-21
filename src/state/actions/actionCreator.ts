import { ActionType } from "./actionType";
import {
  Action,
  ISelectedSchools,
  IAnalysis,
  ILessonsByCampData,
  IOptionModel,
  IGroupedItems,
  IAllAnalysis,
  IFilterState,
} from "../../models/models";
import axios from "axios";
import { store } from "../store";
import _ from "lodash";
import * as constants from "../../defines";

var uniqueSchools: IOptionModel[] = [];
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
          payload: setUniqueCountries(res)
        });

        dispatch({
          type: ActionType.GET_ALL_CAMPS,
          payload: setUniqueCamps(res)
        });

        dispatch({
          type: ActionType.GET_ALL_SCHOOLS,
          payload: setUniqueSchools(res)
        });
      });
  };
};

const setUniqueCountries = (res: any): IOptionModel[] => {
  const uniqueCountry = res.data
    .map((listItem: any) => listItem.country)
    .filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    )
    .map((item: any) => ({ label: item, value: item }));
  return uniqueCountry;
};

const setUniqueCamps = (res: any): IOptionModel[] => {
  const uniqueCamp = res.data
    .map((listItem: any) => listItem.camp)
    .filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    )
    .map((item: any) => ({ label: item, value: item }));
  return uniqueCamp;
};

const setUniqueSchools = (res: any): IOptionModel[] => {
  uniqueSchools = res.data
    .map((listItem: any) => listItem.school)
    .filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    )
    .map((item: any) => ({ label: item, value: item }));
  const allUniqueSchools: IOptionModel[] = [constants.selectAll, ...uniqueSchools];

  return allUniqueSchools;
};

const getBorderColor = (): string => {
  const r: number = Math.floor(Math.random() * 255);
  const g: number = Math.floor(Math.random() * 255);
  const b: number = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

const filterAnalysisBySelectedCountryAndCamp = (filterState: IFilterState, allAnalysis: IAllAnalysis[]): IGroupedItems[] => {
  let filterDataByCountryAndCamp: IAllAnalysis[] = [];
  if (filterState.country && filterState.camp && filterState.school) {
    filterDataByCountryAndCamp = allAnalysis.filter(
      (item: any) =>
        item.country === filterState.country?.value &&
        item.camp === filterState.camp?.value
    );
    return convertSchoolsDictionaryAndFilter(filterDataByCountryAndCamp);
    }
    return [];
}

const convertSchoolsDictionaryAndFilter = (AnalysisFilteredList: IAllAnalysis[]) => {
  const groupDataBySchoolDictionary: _.Dictionary<IAllAnalysis[]> = _.groupBy(AnalysisFilteredList, "school");
  const groupDataBySchoolList = Object.keys(groupDataBySchoolDictionary);
  groupDataBySchoolList.forEach(key => {
    groupsBySchoolsArray.push({ key, list: groupDataBySchoolDictionary[key] });
  });
  return groupsBySchoolsArray;
}

const selectedSchoolChartData = () => {
  groupsBySchoolsArray = [];
  const state = store.getState();
  const filterState: IFilterState = state.ChartAnalysis.filterState;
  const allAnalysis: IAllAnalysis[] =  state.ChartAnalysis.allAnalysis;
  let filteredBySchool:IGroupedItems[] = [];
  let filterDataByCountryAndCamp: IGroupedItems[] = filterAnalysisBySelectedCountryAndCamp(filterState, allAnalysis);
  for (let i = 0; i < filterDataByCountryAndCamp.length; i++) {
    if (filterState?.school?.includes(filterDataByCountryAndCamp[i].key)) {
      filteredBySchool.push(filterDataByCountryAndCamp[i]);
    }
  }
    handleDataSets(filteredBySchool);
    return datasets;
}


const handleDataSets = (groups: IGroupedItems[]) => {
  datasets = [];
  for (let i = 0; i < groups.length; i++) {
    const itemInGroup: IAnalysis[] = groups[i].list;
    const schoolName = groups[i].key;
    handleDataMonths(itemInGroup, schoolName);
  }
}

export const getLessonsByCamp = (): ILessonsByCampData[] => {
  let lessonsSummary: ILessonsByCampData[] = [];
  const state = store.getState();
  state.ChartAnalysis.lessonsByCampData = [];
  let itemInGroup: IAnalysis[];
  let countLessons: number = 0;
  for (let i = 0; i < groupsBySchoolsArray.length; i++) {    
    itemInGroup = groupsBySchoolsArray[i].list;
    const schoolNameInDataSet = groupsBySchoolsArray[i]?.key;
    let itemInSelectedSchools: ISelectedSchools | undefined = undefined;

    itemInSelectedSchools = datasets.find((item: ISelectedSchools) => item.label?.indexOf(schoolNameInDataSet) !== -1)?? undefined;

    for (let y = 0; y < itemInGroup.length; y++) {
      countLessons = countLessons + itemInGroup[y].lessons;
    }
    lessonsSummary.push({
      schoolName: groupsBySchoolsArray[i].key,
      lessonsCountNumber: countLessons,
      borderColor: itemInSelectedSchools?.borderColor ?? "lightgrey",
      id: i + 1
    });
  }

  lessonsSummary.sort((a, b) => (a.borderColor < b.borderColor) ? 1 : -1)
  return lessonsSummary;
}

const handleDataMonths = (itemInGroup: IAnalysis[], schoolName: string) => {
  const arrayNumberOfLessons = [];
  for (let y = 0; y < constants.months.length; y++) {
    let totalLessonsInMonth: number = 0;
    const monthValue = itemInGroup.filter(item => item.month === constants.months[y]);
    if (monthValue.length === 0) {
      arrayNumberOfLessons.push(0);
    } else if (monthValue.length === 1) {
      arrayNumberOfLessons.push(Number(monthValue[0].lessons));
    } else {
      for (
        let selectedMonth = 0;
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
    const state = store.getState();
    dispatch({
      type: ActionType.FILTER_STATE,
      payload: {
        ...state.ChartAnalysis.filterState,
        country: selectedCountry
      }
    });
    dispatch({
      type: ActionType.CHART_SELECTED_SCHOOLS,
      payload: selectedSchoolChartData()
    });
    dispatch({
      type: ActionType.FILTERED_LESSONS_BY_CAMP,
      payload: getLessonsByCamp()
    });
  };
}

export const handleSelectedCamp = (selectedCamp: IOptionModel) => {
  return (dispatch: Action) => {
    const state = store.getState();
    dispatch({
      type: ActionType.FILTER_STATE,
      payload: { ...state.ChartAnalysis.filterState, camp: selectedCamp }
    });
    dispatch({
      type: ActionType.CHART_SELECTED_SCHOOLS,
      payload: selectedSchoolChartData()
    });
    dispatch({
      type: ActionType.FILTERED_LESSONS_BY_CAMP,
      payload: getLessonsByCamp()
    });
  };
}

export const handleSelectedSchools = (selectedSchools: IOptionModel[]) => {
  let isSelectAll = selectedSchools.find(
    (item: any) => item.value.indexOf(constants.selectAll.value) !== -1
  )
    ? true
    : false;

  const schools: string[] = isSelectAll
    ? uniqueSchools.map((item: IOptionModel) => item.value)
    : selectedSchools.map((item: IOptionModel) => item.value);
  return (dispatch: Action) => {
    const state = store.getState();
    dispatch({
      type: ActionType.FILTER_STATE,
      payload: { ...state.ChartAnalysis.filterState, school: schools }
    });
    dispatch({
      type: ActionType.CHART_SELECTED_SCHOOLS,
      payload: selectedSchoolChartData()
    });
    dispatch({
      type: ActionType.FILTERED_LESSONS_BY_CAMP,
      payload: getLessonsByCamp()
    });
  };
};

 