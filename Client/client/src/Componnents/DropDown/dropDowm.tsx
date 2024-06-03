import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { Link } from "react-router-dom";

interface SimpleMenuProps {
  courseProps?: string[];
  header: string;
}
function SimpleMenu({ courseProps, header }: SimpleMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const currentTarget = event.currentTarget as HTMLElement;
    if (anchorEl !== currentTarget) {
      setAnchorEl(currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
      >
      {header}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }} 
      >
        {courseProps?.map((prop, index) => (
          <MenuItem
            key={index}
            onClick={handleClose}
          >
            
             {prop}
          
          
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default SimpleMenu;
