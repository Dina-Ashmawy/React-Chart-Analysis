import Select from "react-select";
import classes from "./dropDown.module.css";
import { IOptionModel } from "@/models/models";
interface IProps {
  items: IOptionModel[];
  title: string;
  handleSelectedOption: any;
  setDDLValue?: IOptionModel;
};

const customStyles = {
  control: () => ({
    background: "#66bce780",
    display: "flex"
  })
};

export function DropDown({
  items,
  title,
  handleSelectedOption,
  setDDLValue
}: IProps): JSX.Element {
  return (
    <div className={classes.dropDownContainer}>
      <p className={classes.dropDownTitle}>{title}</p>
      <Select
        styles={customStyles}
        className={classes.dropDownSingleOption}
        options={items}
        onChange={option => handleSelectedOption(option)}
        value={setDDLValue}
      />
    </div>
  );
};
