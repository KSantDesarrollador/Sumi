import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import MainListItems from "./lateralMenu";
import clsx from "clsx";
import { CssBaseline, Hidden } from "@material-ui/core";
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
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
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
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
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
  drawerPaper: {
    width: drawerWidth,
  },
  drawerOpen: {
    backgroundColor: "#3393FF",
    border: "none",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "#3393FF",
    border: "none",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
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
    padding: theme.spacing(0, 3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  infoUser: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const session = new Cookies();

const Menu = (props) => {
  const classList = stylesPage();
  const { window } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);

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
    timeValue += hours >= 12 ? "     P.M." : "     A.M.";
    document.clock.hour.value = timeValue;
    timerID = setTimeout(showtime, 1000);
    timerRunning = true;
  };

  const startclock = () => {
    stopclock();
    showtime();
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classList.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classList.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={classList.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h5' className={classList.title} noWrap>
            S.U.M.I
            <IconButton className={classList.logo}>
              <Avatar src={process.env.PUBLIC_URL + "/img/Logo.png"} alt='' />
            </IconButton>
          </Typography>
          <h5> Usuario:</h5> &nbsp;&nbsp;
          <h5 style={{ color: "yellow" }}> {session.get("name")}</h5>&nbsp;
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
      <nav>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            open={open}
            variant='temporary'
            anchor={theme.direction === "rtl" ? "right" : "left"}
            // className={clsx(classList.drawer)}
            classes={{
              paper: clsx(
                classList.drawerPaper,
                classList.drawerOpen
                // classList.drawerClose
              ),
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
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
                onClick={handleDrawerOpen}
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
            {/* <form name='clock' className={classList.clock}>
              <strong>Hora</strong>
              <br />
              <input
                type='button'
                name='hour'
                className={classList.hour}
                disabled
              />
            </form> */}
            <Divider />
            <div>
              <MainListItems />
            </div>
            <Divider />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css' className={classList.drawer}>
          <Drawer
            open={open}
            variant='permanent'
            // className={clsx(classList.drawer)}
            classes={{
              paper: clsx(
                classList.drawerPaper,
                classList.drawerOpen
                // classList.drawerClose
              ),
            }}>
            <div className={classList.infoUser}>
              <IconButton color='inherit' edge='start'>
                <Avatar
                  src={process.env.PUBLIC_URL + "/img/avatar-male.png"}
                  alt=''
                  className={classList.image}
                />
              </IconButton>
              <h6>{session.get("rol")}</h6>
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
            <div>
              <MainListItems />
            </div>
            <Divider />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

Menu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Menu;
