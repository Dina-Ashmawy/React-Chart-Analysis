import { useLocation } from "react-router-dom";
import { RootState } from "../../state/reducers/index";
import classes from "./pointData.module.css";
import { connect } from "react-redux";
import { IFilterState, ILocationStateType } from "../../models/models";
interface IProps {
  filterstate: IFilterState;
}

export function PointData({ filterstate }: IProps) {
  const location = useLocation().state;
  const country: any = filterstate.country;
  const camp: any = filterstate.camp;

  const PointData: ILocationStateType = location as ILocationStateType;

  return (
    <div className={classes.dataContainer}>
      <h2>Point details</h2>
      <div className={classes.itemContainer}>
        <label>Country: {country.value}</label>
      </div>
      <div className={classes.itemContainer}>
        <label>Camp: {camp.value}</label>
      </div>
      <div className={classes.itemContainer}>
        <label>School: {PointData.SchoolName}</label>
      </div>
      <div className={classes.itemContainer}>
        <label>Month: {PointData.Month}</label>
      </div>
      <div className={classes.itemContainer}>
        <label>No of Lessons:{PointData.Lessons}</label>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState): IProps => {
  return {
    filterstate: state.ChartAnalysis.filterState
  };
};

export default connect(mapStateToProps)(PointData);
