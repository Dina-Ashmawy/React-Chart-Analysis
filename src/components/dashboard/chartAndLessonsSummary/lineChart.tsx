import classes from "./lineChart.module.css";
import { Line, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useRef, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import * as constants from "../../../defines";
import { RootState } from "../../../state/reducers/index";
import { connect } from "react-redux";
import { ISelectedSchools } from "../../../models/models";

interface IProps {
  selectedSchools: ISelectedSchools[];
}

export function LineChart({ selectedSchools }: IProps) {
  ChartJS.register(...registerables);

  const navigate = useNavigate();
  const chartRef = useRef();

  const pluginChart = {
    plugins: {
      legend: {
        display: false
      }
    }
  };
  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const activePoint = getElementAtEvent(chartRef.current, event);
      const selectedPoint: ISelectedSchools =
        selectedSchools[activePoint[0].datasetIndex];
      const dataset = selectedSchools[activePoint[0].datasetIndex];
      const xLabel = constants.months[activePoint[0].index];
      const value = selectedPoint.data[activePoint[0].index];
      navigate("/PointDetails", {
        state: {
          SchoolName: dataset.label,
          Month: xLabel,
          Lessons: value
        }
      });
    } else {
      return;
    }
  };

  function NoChartDataFound() {
    return <h1 className={classes.noChartDataContainer}>No Chart Data Found</h1>;
  }

  function DataFound() {
    return (
      <div className={classes.LineChartContainer}>
      <p className={classes.yHeader}>No of lessons</p>
        <Line
          ref={chartRef}
          data={{
            labels: constants.months,
            datasets: selectedSchools || []
          }}
          options={pluginChart}
          onClick={onClick}
        />
      </div>
    );
  }

  if (selectedSchools.length>0) {
    return <DataFound />;
  } else {
    return <NoChartDataFound />;
  }
}

export const mapStateToProps = (state: RootState): IProps => {
  return {
    selectedSchools: state.ChartAnalysis.selectedSchoolsChartData
  };
};

export default connect(mapStateToProps)(LineChart);
