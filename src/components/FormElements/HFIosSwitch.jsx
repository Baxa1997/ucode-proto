import {Switch} from "@mui/material";
import {useId} from "react";
import {Controller} from "react-hook-form";
import {IOSSwitch} from "../../theme/overrides/IosSwitch";

const HFIosSwitch = ({
  control,
  name,
  label,
  disabledHelperText,
  tabIndex,
  updateObject,
  isNewTableView = false,
  isBlackBg,
  onChange = () => {},
  labelProps,
  defaultValue = false,
  field,
  isShowLable = true,
  ...props
}) => {
  const id = useId();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: {onChange: formOnChange, value},
        fieldState: {error},
      }) => {
        return (
          <div
            className={!disabledHelperText ? "mb-1" : ""}
            style={{
              background: isBlackBg ? "#2A2D34" : "",
              color: isBlackBg ? "#fff" : "",
            }}>
            <IOSSwitch
              id={`switch-${id} switch_${name}`}
              {...props}
              autoFocus={tabIndex === 1}
              inputProps={{tabIndex}}
              checked={value || false}
              onChange={(e, val) => {
                formOnChange(val);
                onChange(val);
                isNewTableView && updateObject();
              }}
            />
            {isShowLable && (
              <label htmlFor={`switch-${id}`} {...labelProps}>
                {label}
              </label>
            )}
          </div>
        );
      }}></Controller>
  );
};

export default HFIosSwitch;
