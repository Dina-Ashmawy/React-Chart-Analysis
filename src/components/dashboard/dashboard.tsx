import classes from "./dashboard.module.css";
import DropDownListContent from "../dashboard/dropDownListContent";
import Header from "./header";
import _ from "lodash";
import ChartAndLessonsSummary from "./chartAndLessonsSummary/chartAndLessonsSummary";


function Dashboard() {
  return (
    <div>
      <div className={classes.appContainer}>
        <Header />
        <DropDownListContent
        ></DropDownListContent>
        <div className={classes.chartDataContainer}>
          <ChartAndLessonsSummary
          />  
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
