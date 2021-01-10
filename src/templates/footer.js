import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    textDecoration: "none",
    right: 0,
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  footer: {
    position: "fixed",
    border: "1px solid #000000",
    width: "100%",
    color: "#000000",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: "10px 37%",
    bottom: 0,
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Footer() {
  const classList = useStyles();

  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb' className={classList.footer}>
        <Typography className={classList.link}>
          <HomeIcon className={classList.icon} />
          Softvak
        </Typography>
        <Link
          color='inherit'
          href='https://www.linkedin.com'
          target='blank'
          onClick={handleClick}
          className={classList.link}>
          <LinkedInIcon className={classList.icon} />
          LinkedIn
        </Link>
        <Link
          color='inherit'
          href='/roles'
          target='blank'
          onClick={handleClick}
          className={classList.link}>
          <LanguageIcon className={classList.icon} />
          Website
        </Link>
      </Breadcrumbs>
    </div>
  );
}
