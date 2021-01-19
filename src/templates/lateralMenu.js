import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import axios from "axios";
// importando componentes de material ui
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
// importando iconos
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const stylesPage = makeStyles(() => ({
  root: {
    flexGrow: 1,
    color: "white",
  },
  icons: {
    color: "white",
    fontSize: "25px",
    verticalAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

const session = new Cookies();
const ServUrl = "http://localhost/SUMI/models/menuModel.php";

const MainListItems = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const openList = () => {
    setOpen(!open);
  };

  // obteniendo datos de un servidor
  const listMenu = async () => {
    await axios
      .get(ServUrl)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    listMenu();
  }, []);

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
  console.log(data);
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
            <ListItemText primary='Escritorio' />
          </ListItem>
        </Link>
        <Divider />
        {data.map((item) => (
          <ListItem button onClick={openList}>
            <Tooltip title={item.MnuLeyendMen} placement='right'>
              <ListItemIcon className={classList.icons}>
                <i className={item.MnuIconMen} />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={item.MnuNomMen} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        ))}
        {data.map((item) => (
          <Collapse in={open} timeout='auto' unmountOnExit>
            {/* <List component='div' disablePadding> */}
            <Link to={item.MnuUrlMen} className={classList.link}>
              {" "}
              <ListItem button className={classList.nested}>
                <ListItemIcon>
                  <i className={item.MnuIconMen} />
                </ListItemIcon>
                <ListItemText primary={item.MnuNomMen} />
              </ListItem>
            </Link>
          </Collapse>
        ))}
      </div>
    </div>
  );
};

export default MainListItems;
