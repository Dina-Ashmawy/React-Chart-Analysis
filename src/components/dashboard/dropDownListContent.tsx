import { useEffect } from "react";
import DropDown from "../ui/dropDown";
import classes from './dropDownListContent.module.css';
import {useSelector, connect} from 'react-redux';
import { RootState } from "../../state/reducers/index";
import { getAllAnalysis, handleSelectedCountry, handleSelectedCamp, handleSelectedSchools } from '../../state/actions/actionCreator'
import { IFilterState, IAllAnalysis, IOptionModel } from '../../models/models'

interface IProps {
  getAllAnalysis?: () => void
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
  getAllAnalysis,
  handleSelectedCountry,
  handleSelectedCamp,
  handleSelectedSchools,
  allAnalysis
}: IProps ) {
  const state = useSelector((state: RootState) => state.ChartAnalysis);
  useEffect(() => {
    if (getAllAnalysis && allAnalysis?.length === 0) {
      getAllAnalysis()
    }
  }, [getAllAnalysis, allAnalysis?.length])

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




const mapStateToProps = (state: RootState): IProps => {
  return {
    allAnalysis: state.ChartAnalysis.allAnalysis,
    allCountries: state.ChartAnalysis.allCountries,
    allCamps: state.ChartAnalysis.allCamps,
    allSchools: state.ChartAnalysis.allSchools,
    filterState: state.ChartAnalysis.filterState,
  }
}
const mapDispatchToProps = { getAllAnalysis, handleSelectedCountry, handleSelectedCamp, handleSelectedSchools }

export default connect(mapStateToProps, mapDispatchToProps)(DropDownListContent)