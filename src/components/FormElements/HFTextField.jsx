import {InputAdornment, TextField, Tooltip} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Controller} from "react-hook-form";
import {numberWithSpaces} from "@/utils/formatNumbers";
import {Lock} from "@mui/icons-material";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: "0px",
    "&::placeholder": {
      color: "#fff",
    },
  },
}));

const HFTextField = ({
  control,
  name = "",
  isFormEdit = false,
  isBlackBg,
  updateObject,
  isNewTableView = false,
  disabledHelperText = false,
  required = false,
  fullWidth = false,
  withTrim = false,
  rules = {},
  defaultValue = "",
  disabled,
  tabIndex,
  checkRequiredField,
  placeholder,
  endAdornment,
  field,
  inputHeight,
  watch,
  disabled_text = "This field is disabled for this role!",
  setFormValue,
  customOnChange = () => {},
  ...props
}) => {
  const location = useLocation();
  const classes = useStyles();
  useEffect(() => {
    if (
      location.pathname?.includes("create") &&
      location?.state?.isTreeView === true
    ) {
      setFormValue(name, "");
    }
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: required ? "This is required field" : false,
        ...rules,
      }}
      render={({field: {onChange, value}, fieldState: {error}}) => {
        return (
          <TextField
            size="small"
            value={value}
            onChange={(e) => {
              onChange(
                withTrim
                  ? e.target.value?.trim()
                  : typeof e.target.value === "number"
                    ? numberWithSpaces(e.target.value)
                    : e.target.value
              );
              customOnChange(e);
              isNewTableView && updateObject();
            }}
            sx={{
              width: "100%",
              padding: "0px",
              margin: "0px",
            }}
            name={name}
            id={field?.slug ? `${field?.slug}_${name}` : `${name}`}
            error={error}
            fullWidth={fullWidth}
            placeholder={placeholder}
            autoFocus={tabIndex === 1}
            InputProps={{
              readOnly: disabled,
              inputProps: {tabIndex, style: {height: inputHeight}},
              classes: {
                input: isBlackBg ? classes.input : "",
              },
              style: disabled
                ? {
                    background: "#c0c0c039",
                    padding: "0px",
                  }
                : isNewTableView
                  ? {
                      background: "inherit",
                      color: "inherit",
                      padding: "0px !important",
                      margin: "0px !important",
                      height: "25px",
                    }
                  : {},

              endAdornment: disabled ? (
                <Tooltip title={disabled_text}>
                  <InputAdornment position="start">
                    <Lock style={{fontSize: "20px"}} />
                  </InputAdornment>
                </Tooltip>
              ) : (
                endAdornment
              ),
            }}
            helperText={!disabledHelperText && error?.message}
            className={isFormEdit ? "custom_textfield" : ""}
            {...props}
          />
        );
      }}
    />
  );
};

export default HFTextField;
