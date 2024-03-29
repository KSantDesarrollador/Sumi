import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const stylesPage = makeStyles(() => ({
  root: {
    textAlign: "center",
    background: "rgba(65,180,250,2)",
    borderRadius: "10px",
  },
  text: {
    fontSize: 17,
    color: "#676C71",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#676C71",
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
