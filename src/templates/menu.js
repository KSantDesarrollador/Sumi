import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
// importando los iconos
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

const stylesPage = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "15px",
  },
  title: {
    flexGrow: 1,
  },
  image: {
    borderRadius: "50%",
  },
}));

const Menu = () => {
  const classList = stylesPage();
  return (
    <div className={classList.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classList.menuButton}
            color='inherit'>
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant='h5' className={classList.title}>
            S.U.M.I
          </Typography>
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
              src={require("../assets/img/reporteG3.jpg")}
              alt=''
              width='40px'
              height='40px'
              className={classList.image}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
