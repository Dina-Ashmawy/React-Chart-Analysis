import classes from "./lessonsSummary.module.css";
import { RootState } from "@/state/reducers/index";
import { connect } from "react-redux";
import { IFilterState, ILessonsByCampData, IOptionModel } from "@/models/models";
import { initialOptianModel } from "@/defines";
interface IProps {
  lessonsByCampData: ILessonsByCampData[];
  filterstate?: IFilterState;
}

export function LessonsSummary({ lessonsByCampData, filterstate }: IProps): JSX.Element {
  const Camp: IOptionModel = filterstate?.camp ?? initialOptianModel;
  const allLessonsCount = (): number => {
    let count: number = 0;
    for (let i = 0; i < lessonsByCampData.length; i++) {
      count = count + lessonsByCampData[i].lessonsCountNumber;
    }
    return count;
  }
  return (
    <div className={classes.verticalLine}>
      <div className={classes.titleContainer}>
        <label className={classes.lessonsText}> {allLessonsCount()} Lessons  </label>
        <label className={classes.campText}>in {Camp?.value}</label>
      </div>
      {lessonsByCampData.map(item => (
        <div style={{ color: item.borderColor }} className={classes.schoolContainer} key={item.id}>

          <div style={{ color: item.borderColor }} className={classes.outsideCircle}>
            <div style={{ background: item.borderColor }} className={classes.insideCircle}></div>
          </div>

          <div className={classes.noOfLessonsContainer}>
            <label className={classes.noOfLessons}>{item.lessonsCountNumber} Lessons</label>
            <label className={classes.schoolText}>{item.schoolName}</label>
          </div>
        </div>
      ))}
    </div>
  );
}

export const mapStateToProps = (state: RootState): IProps => {
  return {
    filterstate: state.ChartAnalysis.filterState,
    lessonsByCampData: state.ChartAnalysis.lessonsByCampData,
  };
};

export default connect(mapStateToProps)(LessonsSummary);
