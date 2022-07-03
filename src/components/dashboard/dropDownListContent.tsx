import { useEffect } from 'react';
import { DropDown } from '@/components/ui/dropDown';
import classes from './dropDownListContent.module.css';
import { connect } from 'react-redux';
import { RootState } from '@/state/reducers/index';
import { getAllDataAnalysis, handleSelectedCountry, handleSelectedCamp, handleSelectedSchool } from '@/state/actions/actionCreator';
import { IFilterState, IAnalysis, IOptionModel } from '@/models/models';
import { initialOptianModel } from '@/defines';

interface IProps {
  getAllDataAnalysis?: () => void;
  handleSelectedCountry?: (country: IOptionModel) => void;
  handleSelectedCamp?: (camp: IOptionModel) => void;
  handleSelectedSchool?: (school: IOptionModel) => void;
  allAnalysis?: IAnalysis[];
  allCountries: IOptionModel[];
  allCamps: IOptionModel[];
  allSelectedSchoolsBasedOnCountryAndCamp: IOptionModel[];
  filterState?: IFilterState;
}

export function DropDownListContent({
  getAllDataAnalysis,
  handleSelectedCountry,
  handleSelectedCamp,
  handleSelectedSchool,
  allAnalysis,
  allCountries,
  allCamps,
  allSelectedSchoolsBasedOnCountryAndCamp,
  filterState
}: IProps): JSX.Element {
  useEffect(() => {
    if (getAllDataAnalysis && allAnalysis?.length === 0) {
      getAllDataAnalysis();
    }
  }, [getAllDataAnalysis, allAnalysis?.length]);

  return (
    <div className={classes.dropDownsContainer}>
      <DropDown
        items={allCountries}
        title={'Select Country'}
        handleSelectedOption={handleSelectedCountry}
        setDDLValue={filterState?.country ?? initialOptianModel}
      />
      <DropDown
        items={allCamps}
        title={'Select Camp'}
        handleSelectedOption={handleSelectedCamp}
        setDDLValue={filterState?.camp ?? initialOptianModel}
      />
      <DropDown
        items={allSelectedSchoolsBasedOnCountryAndCamp}
        title={'Select School'}
        handleSelectedOption={handleSelectedSchool}
        setDDLValue={filterState?.school ?? initialOptianModel}
      />
    </div>
  );
}

export const mapStateToProps = (state: RootState): IProps => {
  return {
    allAnalysis: state.ChartAnalysis.allAnalysis,
    allCountries: state.ChartAnalysis.allCountries,
    allCamps: state.ChartAnalysis.allCamps,
    allSelectedSchoolsBasedOnCountryAndCamp: state.ChartAnalysis.allSelectedSchoolsBasedOnCountryAndCamp,
    filterState: state.ChartAnalysis.filterState
  };
};
export const mapDispatchToProps = {
  getAllDataAnalysis,
  handleSelectedCountry,
  handleSelectedCamp,
  handleSelectedSchool
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownListContent);
