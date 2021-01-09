import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// importandom los componentes
import Menu from "./menu";
import CardsInfo from "./cardsInfo";
import CardsAdmin from "./cardsAdmin";
import Graphics from "./graphics";
import LateralMenu from "./lateralMenu";
import Footer from "./footer";
// importando los estilos
import "../assets/css/dashStyles.css";
import "fontsource-roboto";
// importando los iconos
import PeopleAltIcon from "@material-ui/icons/PeopleAlt"; //usuarios
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"; //empleados
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore"; //compras
import StoreIcon from "@material-ui/icons/Store"; //bodegas
import AssessmentIcon from "@material-ui/icons/Assessment"; //reportes
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"; //inventario
import AssignmentIcon from "@material-ui/icons/Assignment"; //pedidos
import TransformIcon from "@material-ui/icons/Transform"; //transacciones
import LocalShippingIcon from "@material-ui/icons/LocalShipping"; //proveedores
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"; //auditoría

const stylesPage = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundImage: "url('../assets/img/inicio.jpg')",
  },
  icons: {
    color: "white",
    width: "40px",
    height: "40px",
  },
  contain: {
    marginTop: "50px",
    alignItems: "center",
    marginLeft: "10px",
  },
  containFooter: { bottom: "0" },
}));

const Dashboard = () => {
  const classList = stylesPage();

  return (
    <div className={classList.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Menu />
          <LateralMenu />
        </Grid>

        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <CardsInfo
            icon={<LocalGroceryStoreIcon className={classList.icons} />}
            title='Compras'
            text='10 compras registradas'
            color='rgba(250,250,20,15)'
            font='gray'
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <CardsInfo
            icon={<AssignmentTurnedInIcon className={classList.icons} />}
            title='Inventarios'
            text='10 inventarios registradas'
            color='rgba(250,250,20,15)'
            font='gray'
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <CardsInfo
            icon={<AssignmentIcon className={classList.icons} />}
            title='Pedidos'
            text='10 pedidos registradas'
            color='rgba(250,250,20,15)'
            font='gray'
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <CardsInfo
            icon={<TransformIcon className={classList.icons} />}
            title='Transacciones'
            text='10 transacciones registradas'
            color='rgba(250,250,20,15)'
            font='gray'
          />
        </Grid>

        <Grid
          container
          spacing={1}
          className={classList.contain}
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardsAdmin
              icon={<AssessmentIcon className={classList.icons} />}
              title='Reportes'
              text='1000 reportes registradas'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardsAdmin
              icon={<PeopleAltIcon className={classList.icons} />}
              title='Usuarios'
              text='10 usuarios registrados'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardsAdmin
              icon={<EmojiPeopleIcon className={classList.icons} />}
              title='Empleados'
              text='100 empleados registradas'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardsAdmin
              icon={<LocalShippingIcon className={classList.icons} />}
              title='Proveedores'
              text='10 provedores registradas'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardsAdmin
              icon={<StoreIcon className={classList.icons} />}
              title='Bodegas'
              text='10 bodegas registradas'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardsAdmin
              icon={<CheckCircleOutlineIcon className={classList.icons} />}
              title='Auditoría'
              text='Más de 100 registros'
            />
          </Grid>
        </Grid>
        <Grid item xs={0} sm={0} md={0.75} lg={0.75} xl={0.75}></Grid>
        <Grid
          className={classList.contain}
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}>
          <Graphics />
        </Grid>
        <Grid item xs={12} className={classList.containFooter}></Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
