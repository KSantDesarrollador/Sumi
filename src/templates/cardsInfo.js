import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const CardsInfo = (props) => {
  const stylesPage = makeStyles(() => ({
    root: {
      textAlign: "center",
      background: props.color,
      marginTop: "auto",
    },
    text: {
      fontSize: 17,
      color: props.font,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      color: props.font,
    },
  }));

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

export default CardsInfo;
