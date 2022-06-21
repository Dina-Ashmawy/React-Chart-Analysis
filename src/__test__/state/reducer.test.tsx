import { ActionType } from "../../state/actions/actionType";
import reducer, { initialState } from "../../state/reducers/chartReducer";

describe("Test Chart Analysis reducer", () => {
  it("should return state with new data for get all analysis type", () => {
    const newState = {
      ...initialState,
      allAnalysis: []
    };
    const state = reducer(initialState, {
      type: ActionType.GET_ALL_DATA_ANALYSIS,
      payload: []
    });
    expect(state).toStrictEqual(newState);
  });

  it("should return state with new data for filtered lessons by camp", () => {
    const newState = {
      ...initialState,
      lessonsByCampData: []
    };
    const state = reducer(initialState, {
      type: ActionType.FILTERED_LESSONS_BY_CAMP,
      payload: []
    });
    expect(state).toStrictEqual(newState);
  });

  it("should return state with new data for get all countries", () => {
    const newState = {
      ...initialState,
      allCountries: []
    };
    const state = reducer(initialState, {
      type: ActionType.GET_ALL_COUNTRIES,
      payload: []
    });
    expect(state).toStrictEqual(newState);
  });

  it("should return state with new data for get all camps", () => {
    const newState = {
      ...initialState,
      allCamps: []
    };
    const state = reducer(initialState, {
      type: ActionType.GET_ALL_CAMPS,
      payload: []
    });
    expect(state).toStrictEqual(newState);
  });

  it("should return state with new data for get all schools", () => {
    const newState = {
      ...initialState,
      allSchools: []
    };
    const state = reducer(initialState, {
      type: ActionType.GET_ALL_SCHOOLS,
      payload: []
    });
    expect(state).toStrictEqual(newState);
  });

  it("should return state with new data for get all schools", () => {
    const newState = {
      ...initialState,
      selectedSchoolsChartData: []
    };
    const state = reducer(initialState, {
      type: ActionType.CHART_SELECTED_SCHOOLS,
      payload: []
    });
    expect(state).toStrictEqual(newState);
  });
});
