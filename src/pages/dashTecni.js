import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// importandom los componentes
import Menu from "../templates/menu";
import CardsInfo from "../templates/cardsInfo";
import Footer from "../templates/footer";
// importando los estilos
import "fontsource-roboto";
// importando los iconos
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"; //inventario
import AssignmentIcon from "@material-ui/icons/Assignment"; //pedidos
import TransformIcon from "@material-ui/icons/Transform"; //transacciones
import "../assets/css/dashStyles.css";

const stylesPage = makeStyles(() => ({
  root: {
    // flexGrow: 1,
    backgroundImage: "url('/img/inicio.jpg')",
    overflow: "auto",
    backgroundPosition: "top",
    width: "100%",
    height: "100vh",
  },
  icons: {
    color: "gray",
    width: "40px",
    height: "40px",
  },
  contain: {
    marginTop: "auto",
    alignItems: "center",
    paddingTop: "15px",
  },
  desk: {
    padding: "4.5% 20% 0 25%",
  },
}));

const Dashboard = () => {
  const classList = stylesPage();

  return (
    <div className={classList.root}>
      <Grid item xs={12}>
        <Menu />
      </Grid>
      <Grid container className={classList.desk}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <CardsInfo
              icon={<AssignmentTurnedInIcon className={classList.icons} />}
              title='Inventarios'
              text='10 inventarios registradas'
              color='rgba(250,250,20,15)'
              font='gray'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <CardsInfo
              icon={<AssignmentIcon className={classList.icons} />}
              title='Pedidos'
              text='10 pedidos registradas'
              color='rgba(250,250,20,15)'
              font='gray'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <CardsInfo
              icon={<TransformIcon className={classList.icons} />}
              title='Transacciones'
              text='10 transacciones registradas'
              color='rgba(250,250,20,15)'
              font='gray'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <CardsInfo
              icon={<TransformIcon className={classList.icons} />}
              title='Bodegas'
              text='10 Bodegas registradas'
              color='rgba(250,250,20,15)'
              font='gray'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <CardsInfo
              icon={<TransformIcon className={classList.icons} />}
              title='Productos'
              text='10 productos registradas'
              color='rgba(250,250,20,15)'
              font='gray'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={0} md={0}>
        <Footer />
      </Grid>
    </div>
  );
};

export default Dashboard;
