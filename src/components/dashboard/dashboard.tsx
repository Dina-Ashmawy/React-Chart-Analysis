import classes from './dashboard.module.css';
import DropDownListContent from './dropDownListContent';
import Header from './header';
import ChartAndLessonsSummary from './chartAndLessonsSummary/chartAndLessonsSummary';

function Dashboard(): JSX.Element {
  return (
    <div>
      <div className={classes.appContainer}>
        <Header />
        <DropDownListContent></DropDownListContent>
        <div className={classes.chartDataContainer}>
          <ChartAndLessonsSummary />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
