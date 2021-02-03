import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// importandom los componentes
import MenuBar from "../templates/menu";
import CardsInfo from "../templates/cardsInfo";
import CardsAdmin from "../templates/cardsAdmin";
import Graphics from "../templates/graphics";
import Footer from "../templates/footer";
// importando los estilos
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
    height: "25px",
  },
  contain: {
    marginTop: "auto",
    alignItems: "center",
    paddingTop: "15px",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
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

          <Grid container spacing={2}>
            <Grid container>
              {" "}
              <h4 className={classList.title}>
                SISTEMA UNICO DE MANEJO DE INVENTARIOS
              </h4>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <CardsInfo
                icon={<LocalGroceryStoreIcon className={classList.icons} />}
                title='Compras'
                text='10 registros'
                color='rgba(250,250,20,15)'
                font='gray'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <CardsInfo
                icon={<AssignmentTurnedInIcon className={classList.icons} />}
                title='Inventarios'
                text='10 registros'
                color='rgba(250,250,20,15)'
                font='gray'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <CardsInfo
                icon={<AssignmentIcon className={classList.icons} />}
                title='Pedidos'
                text='10 registros'
                color='rgba(250,250,20,15)'
                font='gray'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <CardsInfo
                icon={<TransformIcon className={classList.icons} />}
                title='Transacciones'
                text='10 registros'
                color='rgba(250,250,20,15)'
                font='gray'
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            className={classList.contain}
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CardsAdmin
                icon={<AssessmentIcon className={classList.icons} />}
                title='Reportes'
                text='1000 registros'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CardsAdmin
                icon={<PeopleAltIcon className={classList.icons} />}
                title='Usuarios'
                text='10 registrados'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CardsAdmin
                icon={<EmojiPeopleIcon className={classList.icons} />}
                title='Unidad Médica'
                text='5 registros'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CardsAdmin
                icon={<LocalShippingIcon className={classList.icons} />}
                title='Proveedores'
                text='10 registros'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <CardsAdmin
                icon={<StoreIcon className={classList.icons} />}
                title='Bodegas'
                text='10 registros'
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
          <Grid item xs={false} sm={false} md={1} lg={1} xl={1}></Grid>
          <Grid
            className={classList.contain}
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}>
            <Graphics />
          </Grid>
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
