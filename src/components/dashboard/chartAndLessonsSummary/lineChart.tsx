import classes from './lineChart.module.css';
import { Line, getElementAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, InteractionItem, registerables } from 'chart.js';
import { useRef, MouseEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import * as constants from '@/defines';
import { RootState } from '@/state/reducers/index';
import { connect } from 'react-redux';
import { ISelectedSchools } from '@/models/models';

interface IProps {
  selectedSchools: ISelectedSchools[];
}

export function LineChart({ selectedSchools }: IProps): JSX.Element {
  ChartJS.register(...registerables);

  const navigate: NavigateFunction = useNavigate();
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
      const activePoint: InteractionItem[] = getElementAtEvent(chartRef.current, event);
      const selectedPoint: ISelectedSchools = selectedSchools[activePoint[0].datasetIndex];
      const dataset: ISelectedSchools = selectedSchools[activePoint[0].datasetIndex];
      const xLabel: string = constants.months[activePoint[0].index];
      const value: number = selectedPoint.data[activePoint[0].index];
      navigate('/PointDetails', {
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

  function NoChartDataFound(): JSX.Element {
    return <h1 className={classes.noChartDataContainer}>No Chart Data Found</h1>;
  }

  function DataFound(): JSX.Element {
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

  if (selectedSchools.length > 0) {
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
