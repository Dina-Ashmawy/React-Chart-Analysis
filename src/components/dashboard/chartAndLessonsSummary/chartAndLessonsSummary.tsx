import LessonsSummary from './lessonsSummary';
import LineChart from './lineChart';
import classes from './chartAndLessonsSummary.module.css';
import { RootState } from '@/state/reducers/index';
import { connect } from 'react-redux';
import { IFilterState } from '@/models/models';
interface IProps {
  filterstate?: IFilterState;
}
const ChartAndLessonsSummary = ({ filterstate }: IProps): JSX.Element => {
  const isAllDataSelected: boolean = filterstate?.country?.value && filterstate?.camp?.value && filterstate?.school?.value ? true : false;

  function NoDataFound(): JSX.Element {
    return <h1 className={classes.noDataContainer}>No Data Found</h1>;
  }

  function DataFound(): JSX.Element {
    return (
      <div className={classes.chartAndSummarizeContainer}>
        <LineChart />
        <LessonsSummary />
      </div>
    );
  }
  if (isAllDataSelected) {
    return <DataFound />;
  } else {
    return <NoDataFound />;
  }
};

export const mapStateToProps = (state: RootState): IProps => {
  return {
    filterstate: state.ChartAnalysis.filterState
  };
};

export default connect(mapStateToProps)(ChartAndLessonsSummary);
