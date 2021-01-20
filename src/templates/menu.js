import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import MainListItems from "./lateralMenu";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Cookies from "universal-cookie";

// importando los iconos
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "../assets/css/dashStyles.css";

const drawerWidth = 240;
const stylesPage = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: "15px",
  },
  title: {
    flexGrow: 1,
  },
  image: {
    borderRadius: "50%",
    width: "30px",
    height: "30px",
  },
  logo: {
    marginLeft: "40px",
    width: "35px",
    height: "35px",
  },
  clock: {
    padding: "10px 0 10px 0",
    background: "#000000",
    color: "#ffffff",
    textAlign: "center",
  },
  hour: {
    background: "#000000",
    color: "#ffffff",
  },
  hide: {
    display: "none",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    border: "none",
  },
  drawerOpen: {
    backgroundColor: "#3393FF",
    border: "none",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "#3393FF",
    border: "none",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const session = new Cookies();

const Menu = () => {
  const classList = stylesPage();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  let timerID = null;
  let timerRunning = false;

  const stopclock = () => {
    if (timerRunning) clearTimeout(timerID);
    timerRunning = false;
  };

  const showtime = () => {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let timeValue = "" + (hours > 12 ? hours - 12 : hours);
    if (timeValue === "0") timeValue = 12;
    timeValue += (minutes < 10 ? ":0" : ":") + minutes;
    timeValue += (seconds < 10 ? ":0" : ":") + seconds;
    timeValue += hours >= 12 ? "    P.M." : "    A.M.";
    document.clock.hour.value = timeValue;
    timerID = setTimeout(showtime, 1000);
    timerRunning = true;
  };

  const startclock = () => {
    stopclock();
    showtime();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const closeSession = () => {
    session.remove("id", { path: "/" });
    session.remove("email", { path: "/" });
    session.remove("name", { path: "/" });
    session.remove("rol", { path: "/" });
    session.remove("image", { path: "/" });
    window.location.href = "/";
  };

  useEffect(() => {
    if (!session.get("name")) {
      window.location.href = "/";
    }
    startclock();
  });

  return (
    <div className={classList.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classList.appBar, {
          [classList.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(classList.menuButton, {
              [classList.hide]: open,
            })}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h5' className={classList.title} noWrap>
            S.U.M.I
            <IconButton className={classList.logo}>
              <Avatar src={process.env.PUBLIC_URL + "/img/Logo.png"} alt='' />
            </IconButton>
          </Typography>
          <h5> Usuario conectado:</h5> &nbsp;&nbsp;
          <h5 style={{ color: "black" }}> {session.get("name")}</h5>&nbsp;
          <IconButton aria-label='show 4 new mails' color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label='show 17 new notifications' color='inherit'>
            <Badge badgeContent={17} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color='inherit' edge='end'>
            <Avatar
              src={process.env.PUBLIC_URL + "/img/avatar-male.png"}
              alt=''
              className={classList.image}
              onClick={() => closeSession()}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        position='fixed'
        variant='permanent'
        className={clsx(classList.drawer, {
          [classList.drawerOpen]: open,
          [classList.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classList.drawerOpen]: open,
            [classList.drawerClose]: !open,
          }),
        }}>
        <div className={classList.toolbar}>
          <IconButton color='inherit' edge='start'>
            <Avatar
              src={process.env.PUBLIC_URL + "/img/avatar-male.png"}
              alt=''
              className={classList.image}
            />
          </IconButton>
          <h6>{session.get("rol")}</h6>
          <IconButton
            onClick={handleDrawerClose}
            // className={classList.name}
            color='inherit'>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <form name='clock' className={classList.clock}>
          <strong>Hora</strong>
          <br />
          <input
            type='button'
            name='hour'
            className={classList.hour}
            disabled
          />
        </form>
        <Divider />
        <List>
          <MainListItems />
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default Menu;
