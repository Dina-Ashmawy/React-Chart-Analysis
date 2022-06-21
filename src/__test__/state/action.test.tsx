import { RootState } from "../../state/reducers/index";
import { handleSelectedCountry, handleSelectedCamp, handleSelectedSchools, getAllDataAnalysis } from "../../state/actions/actionCreator";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";
import configureStore from "redux-mock-store";
import{initialState} from '../mocks/mock-data'


type State = RootState;
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const applyMiddleware = [thunk];

const mockStoreConfigure = configureStore<State, ThunkDispatch<State, undefined, AnyAction>>(applyMiddleware);
const mockStore = mockStoreConfigure(initialState);
describe("Test AnalysisChart actions", () => {
  test("Test  get All Data Analysis with status 200", () => {
    const requestData = initialState.ChartAnalysis.allAnalysis;
    mockedAxios.get.mockResolvedValue({
      data: requestData
    });
    mockStore.dispatch(getAllDataAnalysis());
  });

  test("Test chart analysis handleChangeCountry action", () => {
    mockStore.dispatch(
      handleSelectedCountry({ label: "Spain", value: "Spain" })
    );
    expect(mockStore.getActions().length).toBe(7);
  });

  test("Test chart analysis handleChangeCamp action", () => {
    mockStore.dispatch(handleSelectedCamp({ label: "Camp5", value: "Camp5" }));
    expect(mockStore.getActions().length).toBe(10);
  });

  test("Test chart analysis handleChangeSchool action", () => {
    mockStore.dispatch(handleSelectedSchools([{ label: "SCU", value: "SCU" }]));
    expect(mockStore.getActions().length).toBe(13);
  });
});
