import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

const StyledMenu = withStyles({
  paper: {
    boxShadow: "2px 2px 2px 2px  rgba(0,0,0,0.5)",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function LateralMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls='customized-menu'
        aria-haspopup='true'
        variant='contained'
        color='primary'
        onClick={handleClick}>
        Open Menu
      </Button>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Administracionl' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Alertas' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Bodegas' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Proveedores' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Compras' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Inventarios' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Pedidos' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Transacciones' />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
