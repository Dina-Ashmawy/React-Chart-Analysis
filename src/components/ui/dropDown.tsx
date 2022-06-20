import React from "react";
import Select from "react-select";
import classes from "./dropDown.module.css";
import {IOptionModel} from "../../models/models"
type props = {
  items: IOptionModel[];
  title: string;
  handleSelectedOption: any;
  setDDLValue?: any;
  isMulti: boolean;
};

const customStyles = {
  control: (base: any) => ({
    ...base,
    background: "#66bce780",
  }),
 }

const DropDown: React.FC<props> = props => {
  const returnValue = ()=> {
    if(props.isMulti) {
      return props.setDDLValue.length>0? props.setDDLValue: [];
    }
    else {
      return props.setDDLValue.value?   props.setDDLValue: [];
    }
  }
  return (
    <div className={classes.dropDownContainer}>
      <p className={classes.dropDownTitle}>{props.title}</p>
      <Select styles={customStyles}
        className={
          props.isMulti
            ? classes.dropDownMultiOptions
            : classes.dropDownSingleOption
        }
        isMulti={props.isMulti}
        options={props.items}
        onChange={option => props.handleSelectedOption(option)}
        value={returnValue()}
      />
    </div>
  );
};

export default DropDown;
