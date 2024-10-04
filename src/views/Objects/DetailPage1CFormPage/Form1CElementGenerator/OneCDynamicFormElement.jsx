import {CircularProgress, InputAdornment, Menu, TextField} from "@mui/material";
import {useState} from "react";
import styles from "./style.module.scss";
import {useController} from "react-hook-form";
import {useMemo} from "react";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import DynamicDropdown from "./DynamicDropDown";
import constructorObjectService from "../../../../services/constructorObjectService";
import {getLabelWithViewFields} from "../../../../utils/getRelationFieldLabel";

const OneCDynamicFormElement = ({
  control,
  field,
  setFormValue,
  disabled = false,
  checkRequiredField,
}) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController({
    name:
      field?.attributes?.relation_field_slug ??
      field?.relation_field_slug ??
      "",
    control,
    defaultValue: null,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [localValue, setLocalValue] = useState(null);
  const [inputLoader, setInputLoader] = useState(false);
  const {i18n} = useTranslation();

  const tablesList = useMemo(() => {
    return (
      field?.attributes?.dynamic_tables?.map((el) => {
        return el.table ? {...el.table, ...el} : el;
      }) ?? []
    );
  }, [field?.attributes?.dynamic_tables]);

  const tableInValue = useMemo(() => {
    return tablesList?.find((table) => value?.[`${table.slug}_id`]) ?? "";
  }, [tablesList, value]);

  const onObjectSelect = (object, selectedTable) => {
    const data = {
      [`${selectedTable.slug}_id`]: object.value,
    };
    setLocalValue(object);
    onChange(data);
    closeMenu();
  };
  const getValueData = async () => {
    try {
      setInputLoader(true);
      const id = value?.[`${tableInValue.slug}_id`];
      const res = await constructorObjectService.getById(tableInValue.slug, id);
      const data = res?.data?.response;

      setLocalValue(
        data
          ? {
              value: data.id,
              label: getLabelWithViewFields(tableInValue.view_fields, data),
            }
          : null
      );
    } finally {
      setInputLoader(false);
    }
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (tableInValue) {
      getValueData();
    }
  }, []);

  const computedInputString = useMemo(() => {
    if (!tableInValue || !localValue) return "";
    return `${tableInValue?.label} / ${localValue?.label}`;
  }, [tableInValue, localValue]);

  return (
    <>
      <TextField
        disabled={disabled}
        size="small"
        fullWidth
        onClick={openMenu}
        value={computedInputString}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment>
              {inputLoader && <CircularProgress size={14} />}
            </InputAdornment>
          ),
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeMenu}
        classes={{list: styles.menu, paper: styles.paper}}>
        <DynamicDropdown
          field={field}
          closeMenu={closeMenu}
          onObjectSelect={onObjectSelect}
          tablesList={tablesList}
        />
      </Menu>
    </>
  );
};

export default OneCDynamicFormElement;
