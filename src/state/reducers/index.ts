import { combineReducers } from 'redux';
import ChartReducer from './chartReducer';

const reducers = combineReducers({ ChartAnalysis: ChartReducer });

export default reducers;

export type RootState = ReturnType<typeof reducers>;
