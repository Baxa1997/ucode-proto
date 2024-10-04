import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {Box, Button, Collapse, Tooltip} from "@mui/material";
import React, {useState} from "react";
import IconGenerator from "../../../IconPicker/IconGenerator";
import AddIcon from "@mui/icons-material/Add";
import activeStyles from "../MenuUtils/activeStyles";
import {useDispatch, useSelector} from "react-redux";
import {menuActions} from "../../../../store/menuItem/menuItem.slice";
import RecursiveBlock from "./RecursiveBlock";

export const adminId = `${import.meta.env.VITE_ADMIN_FOLDER_ID}`;
const projectSettings = {
  label: "Project Settings",
  type: "USER_FOLDER",
  icon: "lock.svg",
  parent_id: adminId,
  id: "122223",
  data: {
    permission: {
      read: true,
      write: true,
      delete: true,
      update: true,
    },
  },
};

function ProjectSettings({level = 1, menuStyle}) {
  const [childBlockVisible, setChildBlockVisible] = useState(false);
  const menuItem = useSelector((state) => state.menu.menuItem);
  const dispatch = useDispatch();
  const activeStyle = activeStyles({
    menuItem,
    element: projectSettings,
    menuStyle,
    level,
  });

  const iconStyle = {
    color:
      projectSettings?.id === menuItem?.id
        ? menuStyle?.active_text
        : menuStyle?.text || "",
  };

  const labelStyle = {
    color:
      projectSettings?.id === menuItem?.id
        ? menuStyle?.active_text
        : menuStyle?.text,
  };

  const clickHandler = (e) => {
    e.stopPropagation();
    setChildBlockVisible((prev) => !prev);
    dispatch(menuActions.setMenuItem(projectSettings));
  };
  return (
    <Box sx={{padding: "0 5px"}}>
      <div className="parent-block column-drag-handle">
        <Button
          style={activeStyle}
          className="nav-element"
          onClick={(e) => {
            clickHandler(e);
          }}>
          <div className="label" style={labelStyle}>
            {childBlockVisible ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
            <IconGenerator icon={"lock.svg"} size={18} />
            Project Settings
          </div>
        </Button>
      </div>

      <Collapse in={childBlockVisible} unmountOnExit>
        <RecursiveBlock level={2} menuStyle={menuStyle} menuItem={menuItem} />
      </Collapse>
    </Box>
  );
}

export default ProjectSettings;
