import { useEffect } from "react";
import DropDown from "../ui/dropDown";
import classes from './dropDownListContent.module.css';
import {useSelector, connect} from 'react-redux';
import { RootState } from "../../state/reducers/index";
import { getAllDataAnalysis, handleSelectedCountry, handleSelectedCamp, handleSelectedSchools } from '../../state/actions/actionCreator'
import { IFilterState, IAllAnalysis, IOptionModel } from '../../models/models'

interface IProps {
  getAllDataAnalysis?: () => void
  handleSelectedCountry?: (country: IOptionModel) => void
  handleSelectedCamp?: (camp: IOptionModel) => void
  handleSelectedSchools?: (school: IOptionModel) => void
  allAnalysis?: IAllAnalysis[]
  allCountries?: IOptionModel[]
  allCamps?: IOptionModel[]
  allSchools?: IOptionModel[]
  filterState?: IFilterState
}

export function DropDownListContent ({ 
  getAllDataAnalysis,
  handleSelectedCountry,
  handleSelectedCamp,
  handleSelectedSchools,
  allAnalysis
}: IProps ) {
  const state = useSelector((state: RootState) => state.ChartAnalysis);
  useEffect(() => {
    if (getAllDataAnalysis && allAnalysis?.length === 0) {
      getAllDataAnalysis()
    }
  }, [getAllDataAnalysis, allAnalysis?.length])

  return (
    <div className={classes.dropDownsContainer}>
      <DropDown
        items={state.allCountries}
        title={"Select Country"}
        isMulti={false}
        handleSelectedOption={handleSelectedCountry}
        setDDLValue = {state.filterState.country? state.filterState.country : '' }
      ></DropDown>
      <DropDown
        items={state.allCamps}
        title={"Select Camp"}
        isMulti={false}
        handleSelectedOption={handleSelectedCamp}
        setDDLValue = {state.filterState.camp? state.filterState.camp : '' }

      ></DropDown>
      <DropDown
        items={state.allSchools}
        title={"Select School"}
        isMulti={true}
        handleSelectedOption={handleSelectedSchools}
        setDDLValue = {state.filterState.school? state.filterState.school.map((item)=>({label:item, value: item}) ) : []}
      ></DropDown>
    </div>
  );
};




export const mapStateToProps = (state: RootState): IProps => {
  return {
    allAnalysis: state.ChartAnalysis.allAnalysis,
    allCountries: state.ChartAnalysis.allCountries,
    allCamps: state.ChartAnalysis.allCamps,
    allSchools: state.ChartAnalysis.allSchools,
    filterState: state.ChartAnalysis.filterState,
  }
}
export const mapDispatchToProps = { getAllDataAnalysis, handleSelectedCountry, handleSelectedCamp, handleSelectedSchools }

export default connect(mapStateToProps, mapDispatchToProps)(DropDownListContent)