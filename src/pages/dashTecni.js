import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// importandom los componentes
import MenuBar from "../templates/menu";
import CardsInfo from "../templates/cardsInfo";
import Footer from "../templates/footer";
// importando los estilos
import "fontsource-roboto";
// importando los iconos
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn"; //inventario
import AssignmentIcon from "@material-ui/icons/Assignment"; //pedidos
import TransformIcon from "@material-ui/icons/Transform"; //transacciones
import "../assets/css/dashStyles.css";

const stylesPage = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: "url('/img/inicio.jpg')",
    overflow: "auto",
    backgroundPosition: "top",
    width: "100%",
    height: "95vh",
  },
  icons: {
    color: "#676C71",
    width: "40px",
    height: "35px",
  },
  contain: {
    marginTop: "30px",
    alignItems: "center",
    paddingTop: "15px",
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
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  title: {
    width: "100%",
    fontFamily: "Dungeon",
    textAlign: "center",
    padding: "10px 0",
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: "10px",
  },
}));

const Dashboard = () => {
  const classList = stylesPage();

  return (
    <div className={classList.root}>
      <MenuBar />
      <main>
        <Grid container className={classList.content}>
          <div className={classList.toolbar}></div>
          <Grid container spacing={3}>
            <Grid container>
              {" "}
              <h4 className={classList.title}>
                SISTEMA UNICO DE MANEJO DE INVENTARIOS
              </h4>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CardsInfo
                icon={<AssignmentTurnedInIcon className={classList.icons} />}
                title='Inventarios'
                text='10 inventarios registradas'
                color='rgba(250,250,20,15)'
                font='gray'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CardsInfo
                icon={<AssignmentIcon className={classList.icons} />}
                title='Pedidos'
                text='10 pedidos registradas'
                color='rgba(250,250,20,15)'
                font='gray'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CardsInfo
                icon={<TransformIcon className={classList.icons} />}
                title='Transacciones'
                text='10 transacciones registradas'
                color='rgba(250,250,20,15)'
                font='gray'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
