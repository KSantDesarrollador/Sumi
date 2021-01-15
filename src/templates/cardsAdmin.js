import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const stylesPage = makeStyles(() => ({
  root: {
    textAlign: "center",
    background: "rgba(65,180,250,2)",
  },
  text: {
    fontSize: 17,
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
}));

const CardsAdmin = (props) => {
  const classList = stylesPage();

  return (
    <Card className={classList.root}>
      <CardContent>
        {props.icon}
        <Typography className={classList.title}> {props.title}</Typography>
        <Typography className={classList.text}> {props.text}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardsAdmin;
