import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import axios from "axios";
import Cookies from "universal-cookie";
import md5 from "md5";
// importando componenetes de materialUI
import LockIcon from "@material-ui/icons/Lock";
// importando componentes
import AllAlerts from "./components/alerts";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        Softvak
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: "url( '../img/inicio.jpg')",
    backgroundPosition: "top",
    overflow: "auto",
    height: "100vh",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
    width: "75px",
    height: "75px",
  },
  icons: {
    color: "white",
    width: "45px",
    height: "45px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const session = new Cookies();
const ServUrl = "http://localhost/SUMI/models/loginModel.php";

const Login = () => {
  const classList = useStyles();

  // const [resp, setResp] = useState(null);
  const [type, setType] = useState("");
  const [alert, setAlert] = useState(null);
  const [show, setShow] = useState("alertHide");
  const [dataSelect, setDataSelect] = useState({
    UsrEmailUsu: "",
    UsrContraUsu: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  // obteniendo los datos de las cajas de texto
  const eventinput = (e) => {
    setDataSelect((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(dataSelect.UsrContraUsu);

  // Esta función guarda los datos de un nuevo rol
  const login = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("UsrEmailUsu", dataSelect.UsrEmailUsu);
    f.append("UsrContraUsu", md5(dataSelect.UsrContraUsu));
    f.append("METHOD", "POST");
    await axios
      .post(ServUrl, f)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          session.set("id", res.RrlId, { path: "/" });
          session.set("user", res.UsrId, { path: "/" });
          session.set("name", res.UsrNomUsu, { path: "/" });
          session.set("email", res.UsrEmailUsu, { path: "/" });
          session.set("rol", res.RrlNomRol, { path: "/" });
          let deskRol = session.get("id");
          console.log(deskRol);
          switch (deskRol) {
            case "1":
              window.location.href = "/dashAdmin";
              break;
            case "2":
              window.location.href = "/dashSuper";
              break;
            case "3":
              window.location.href = "/dashTecni";
              break;
            case "4":
              window.location.href = "/dashUser";
              break;

            default:
              break;
          }
        } else {
          setType("error");
          setShow("alertShow");
          setAlert(
            `....Ops! El usuario no existe,\n
              Por favor revise los datos`
          );
        }
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setShow("alertShow");
        setAlert("....Ops! Hubo un error al procesar la petición");
      });
  };

  useEffect(() => {
    if (session.get("name")) {
      let deskRol = session.get("id");
      switch (deskRol) {
        case "1":
          window.location.href = "/dashAdmin";
          break;
        case "2":
          window.location.href = "/dashSuper";
          break;
        case "3":
          window.location.href = "/dashTecni";
          break;
        case "4":
          window.location.href = "/dashUser";
          break;

        default:
          break;
      }
    }
  }, []);

  return (
    <Grid className={classList.container} container>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classList.paper}>
          <Avatar className={classList.avatar}>
            <LockIcon className={classList.icons} />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Inicio de Sesion
          </Typography>
          <br />
          <form className={classList.form} onSubmit={(e) => login(e)}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='UsrEmailUsu'
              label='Email'
              name='UsrEmailUsu'
              autoComplete='UsrEmailUsu'
              autoFocus
              onChange={eventinput}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='UsrContraUsu'
              label='Contraseña'
              type='password'
              id='UsrContraUsu'
              // autoComplete='current-password'
              onChange={eventinput}
            />
            {/* <Link to='/dashboard'/> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classList.submit}>
              Ingreasar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='#' variant='body2'>
                  Ólvido su contraseña?
                </Link>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <br />
        {/* Modal para confirmación antes de guardar un registro */}
        <AllAlerts
          alertClass='info'
          alertType={type}
          alertText={alert}
          show={show}
          changeState={changeState}
        />
      </Container>
    </Grid>
  );
};

export default Login;
