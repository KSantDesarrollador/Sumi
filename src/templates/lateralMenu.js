import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
// importando iconos
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AssistantIcon from "@material-ui/icons/Assistant";
import SettingsIcon from "@material-ui/icons/Settings";
//
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const stylesPage = makeStyles(() => ({
  root: {
    flexGrow: 1,
    color: "white",
  },
  icons: {
    color: "white",
    width: "40px",
    height: "40px",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

const session = new Cookies();

const MainListItems = () => {
  const classList = stylesPage();
  const [open, setOpen] = React.useState(false);

  const openList = () => {
    setOpen(!open);
  };

  const setDashboard = () => {
    let dash = "";
    let deskRol = session.get("id");
    switch (deskRol) {
      case "1":
        dash = "/dashAdmin";
        break;
      case "2":
        dash = "/dashSuper";
        break;
      case "3":
        dash = "/dashTecni";
        break;
      case "4":
        dash = "/dashUser";
        break;

      default:
        break;
    }
    return dash;
  };

  return (
    <div className={classList.root}>
      <CssBaseline />
      <div>
        {" "}
        <Link to={setDashboard()} className={classList.link}>
          <ListItem button>
            <ListItemIcon className={classList.icons}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
        </Link>
        <ListItem button onClick={openList}>
          <ListItemIcon className={classList.icons}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Administración' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
          {/* <List component='div' disablePadding> */}
          <Link to='/roles' className={classList.link}>
            <ListItem button className={classList.nested}>
              <ListItemIcon>
                <AssistantIcon />
              </ListItemIcon>
              <ListItemText primary='Roles' />
            </ListItem>
          </Link>
          <Link to='/users' className={classList.link}>
            <ListItem button className={classList.nested}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Usuarios' />
            </ListItem>
          </Link>
          {/* </List> */}
        </Collapse>
        <ListItem button>
          <ListItemIcon className={classList.icons}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary='Orders' />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classList.icons}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Customers' />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classList.icons}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary='Reports' />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classList.icons}>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary='Integrations' />
        </ListItem>
      </div>
      <Divider />
      <div>
        <ListSubheader inset>
          <h5>REPORTES</h5>
        </ListSubheader>
        <ListItem button>
          <ListItemIcon className={classList.icons}>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Current month' />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classList.icons}>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Last quarter' />
        </ListItem>
        <ListItem button>
          <ListItemIcon className={classList.icons}>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Year-end sale' />
        </ListItem>
      </div>
    </div>
  );
};

export default MainListItems;
