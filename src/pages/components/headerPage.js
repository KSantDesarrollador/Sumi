import React from "react";
import { Grid, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
// importando componentes
import AllAlerts from "./alerts";

const stylesPage = makeStyles((theme) => ({
  iconPge: {
    color: "black",
    fontSize: "35px",
  },
  header: {
    fontFamily: "roboto",
  },
}));

const HeaderPage = (props) => {
  const classList = stylesPage();

  if (props.alert !== null) {
    let alert = document.getElementById("al");
    alert.classList.replace("alertHide", "alertShow");
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <h2 className={classList.header}>
        {props.title} &nbsp;
        <span className={classList.iconPge}>
          <i className={props.icon1} />
        </span>
      </h2>
      <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
        <div className='alertHide' id='al'>
          <AllAlerts
            alertClass='info'
            alertType={props.type}
            alertText={props.alert}
            changeState={props.changeState}
          />
        </div>
        &nbsp; &nbsp;
        <Tooltip title='Nuevo registro'>
          <Fab color='secondary' onClick={props.AbrirCerrarModal}>
            <span className={classList.iconPge}>
              <i className={props.icon2} />
            </span>
          </Fab>
        </Tooltip>
      </div>
    </Grid>
  );
};

export default HeaderPage;
