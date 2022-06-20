import LessonsSummary from "./lessonsSummary";
import LineChart from "./lineChart";
import classes from "./chartAndLessonsSummary.module.css";
import { RootState } from "../../../state/reducers/index";
import { connect } from "react-redux";
import { IFilterState } from "../../../models/models";
interface IProps {
  filterstate?: IFilterState;
}
const ChartAndLessonsSummary = ({filterstate}: IProps) => {
  const isSchoolsFound = filterstate?.school?.length?? 0 ;
  const isAllDataSelected = (filterstate?.country && filterstate?.camp && (isSchoolsFound>0))? true : false;
  function NoDataFound() {
    return <h1  className={classes.noDataContainer}>No Data Found</h1>;
  }

  function DataFound() {
    return <div className={classes.chartAndSummarizeContainer}>
        <LineChart />
        <LessonsSummary />
      </div>
    
  }
  if (isAllDataSelected) {
    return <DataFound />;
  } else {
    return <NoDataFound />;
  }
};



const mapStateToProps = (state: RootState): IProps => {
  return {
    filterstate: state.ChartAnalysis.filterState,
  };
};

export default connect(mapStateToProps)(ChartAndLessonsSummary);

