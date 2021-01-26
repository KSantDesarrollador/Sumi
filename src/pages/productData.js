import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from "axios";
// importando componentes de material ui
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  Fab,
  Tooltip,
} from "@material-ui/core";
// importando los iconos
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
// importandom los componentes
import Menu from "../templates/menu";
import Footer from "../templates/footer";
import AllAlerts from "./components/alerts";

const stylesPage = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: "url('/img/inicio.jpg')",
    overflow: "auto",
    backgroundPosition: "top",
    width: "100%",
    height: "95vh",
  },
  gridList: {
    padding: "30px 0 10px 0",
    width: "100%",
    height: "auto",
    fontSize: "12px",
  },
  icon: {
    color: "#41D178",
  },
  iconPge: {
    color: "black",
    width: "40px",
    height: "40px",
  },
  image: {
    borderRadius: "30px",
    width: "25px",
    height: "25px",
  },
  file: { display: "block" },
  contain: {
    marginTop: "auto",
    alignItems: "center",
    paddingTop: "15px",
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.45),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.6),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  modal: {
    marginTop: "5%",
    background: "rgba(255,255,255,0.4)",
    borderRadius: "15px",
  },
  modalHeaderNew: {
    background: "orange",
    color: "#f5f5f5",
  },
  modalHeaderEdit: {
    background: "#3393FF",
    color: "#f5f5f5",
  },
  modalHeaderDelete: {
    background: "#EF1146",
    color: "#f5f5f5",
  },
  modalFooter: {
    justifyContent: "center",
  },
  footCard: {
    fontSize: "12px",
  },
}));

const ServUrl = "http://localhost/SUMI/models/productModel.php";

const ProductData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [alert, setAlert] = useState(null);
  const [dataSelect, setDataSelect] = useState({
    MdcId: "",
    CtgId: "",
    MdcCodMed: "",
    MdcDescMed: "",
    MdcPresenMed: "",
    MdcConcenMed: "",
    MdcNivPrescMed: "",
    MdcNivAtencMed: "",
    MdcViaAdmMed: "",
    MdcFotoMed: "",
    MdcEstMed: "",
  });

  const changeState = () => {
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const abrirCerrarModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  if (alert !== null) {
    let alert = document.getElementById("al");
    alert.classList.replace("alertHide", "alertShow");
  }

  // obteniendo los datos de las cajas de texto
  const eventinput = (e) => {
    if (e.target.name === "MdcFotoMed") {
      setDataSelect((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setDataSelect((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // obteniendo datos de un servidor
  const listProduct = async () => {
    await axios
      .get(ServUrl)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    listProduct();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newProduct = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("CtgId", dataSelect.CtgId);
    f.append("MdcCodMed", dataSelect.MdcCodMed);
    f.append("MdcDescMed", dataSelect.MdcDescMed);
    f.append("MdcPresenMed", dataSelect.MdcPresenMed);
    f.append("MdcConcenMed", dataSelect.MdcConcenMed);
    f.append("MdcNivPrescMed", dataSelect.MdcNivPrescMed);
    f.append("MdcNivAtencMed", dataSelect.MdcNivAtencMed);
    f.append("MdcViaAdmMed", dataSelect.MdcViaAdmMed);
    f.append("MdcFotoMed", dataSelect.MdcFotoMed);
    f.append("METHOD", "POST");
    await axios
      .post(ServUrl, f, { headers: { "Content-Type": "multipart/form-data" } })
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModal();
        setAlert("Registro creado correctamente");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función actualiza los datos del rol selecionado
  const updateProduct = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("CtgId", dataSelect.CtgId);
    f.append("MdcCodMed", dataSelect.MdcCodMed);
    f.append("MdcDescMed", dataSelect.MdcDescMed);
    f.append("MdcPresenMed", dataSelect.MdcPresenMed);
    f.append("MdcConcenMed", dataSelect.MdcConcenMed);
    f.append("MdcNivPrescMed", dataSelect.MdcNivPrescMed);
    f.append("MdcNivAtencMed", dataSelect.MdcNivAtencMed);
    f.append("MdcViaAdmMed", dataSelect.MdcViaAdmMed);
    f.append("MdcFotoMed", dataSelect.MdcFotoMed);
    f.append("MdcEstMed", dataSelect.MdcEstMed);
    f.append("METHOD", "PUT");
    await axios
      .post(
        ServUrl,
        f,
        { params: { id: dataSelect.MdcId } },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.log(response.data);
        let newData = data;
        newData.map((info) => {
          if (info.MdcId === dataSelect.MdcId) {
            info.CtgId = dataSelect.CtgId;
            info.MdcCodMed = dataSelect.MdcCodMed;
            info.MdcDescMed = dataSelect.MdcDescMed;
            info.MdcPresenMed = dataSelect.MdcPresenMed;
            info.MdcConcenMed = dataSelect.MdcConcenMed;
            info.MdcNivPrescMed = dataSelect.MdcNivPrescMed;
            info.MdcNivAtencMed = dataSelect.MdcNivAtencMed;
            info.MdcViaAdmMed = dataSelect.MdcViaAdmMed;
            info.MdcFotoMed = dataSelect.MdcFotoMed;
            info.MdcEstMed = dataSelect.MdcEstMed;
          }
          return info;
        });

        setData(newData);
        abrirCerrarModalEdit();
        setAlert("Registro actualizado correctamente");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función elimina los datos del rol seleccionado
  const deleteProduct = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.MdcId } })
      .then((response) => {
        setData(data.filter((product) => product.MdcId !== dataSelect.MdcId));
        abrirCerrarModalDelete();
        setAlert("Registro eliminado correctamente");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función permite elegir el modal que se abrirá y guaerda los datos en el estado
  const selectedItem = (product, type) => {
    setDataSelect(product);
    if (type === "Edit") {
      abrirCerrarModalEdit();
    } else {
      abrirCerrarModalDelete();
    }
  };

  return (
    <div className={classList.root}>
      <Menu />
      <main>
        <Grid container className={classList.content}>
          <div className={classList.toolbar}></div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <h2>
                Productos <ViewComfyIcon className={classList.iconPge} />
              </h2>
            </Grid>
          </Grid>

          {/* Tabla que muestra la información de los roles en bd */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <GridList
                cellHeight={250}
                className={classList.gridList}
                cols={4}>
                <GridListTile
                  key='Subheader'
                  cols={4}
                  style={{ height: "auto" }}>
                  <ListSubheader
                    component='div'
                    className='d-grid gap-2 d-md-flex justify-content-md-end'>
                    <div className='alertHide' id='al'>
                      <AllAlerts
                        alertClass='info'
                        alertType='success'
                        alertText={alert}
                        changeState={changeState}
                      />
                    </div>
                    <div className={classList.search}>
                      <div className={classList.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder='Buscar'
                        classes={{
                          root: classList.inputRoot,
                          input: classList.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                      />
                    </div>
                    &nbsp; &nbsp;
                    <Tooltip title='Nuevo producto' placement='up'>
                      <Fab color='secondary' onClick={() => abrirCerrarModal()}>
                        <AddIcon />
                      </Fab>
                    </Tooltip>
                  </ListSubheader>
                </GridListTile>
                {data.map((item) => (
                  <GridListTile
                    key={item.MdcId}
                    style={{
                      width: 360,
                      paddingTop: "35px",
                    }}>
                    <img src={item.MdcFotoMed} alt={item.MdcDescMed} />
                    <GridListTileBar
                      className={classList.footcard}
                      title={item.MdcDescMed}
                      subtitle={
                        <div>
                          <span> {item.MdcPresenMed}</span>
                          &nbsp;
                          <span> {item.MdcConcenMed}</span>
                        </div>
                      }
                      actionIcon={
                        <div>
                          <Tooltip title='Detalles' placement='down'>
                            <IconButton
                              aria-label={`detalles ${item.MdcDescMed}`}
                              className={classList.icon}>
                              <i className='zmdi zmdi-info' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Editar' placement='down'>
                            <IconButton
                              aria-label={`detalles ${item.MdcDescMed}`}
                              className={classList.icon}
                              onClick={() => selectedItem(item, "Edit")}>
                              <i className='zmdi zmdi-edit' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Eliminar' placement='down'>
                            <IconButton
                              aria-label={`detalles ${item.MdcDescMed}`}
                              className={classList.icon}
                              onClick={() => selectedItem(item, "Delete")}>
                              <i className='zmdi zmdi-delete' />
                            </IconButton>
                          </Tooltip>
                        </div>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
          </Grid>
          {/* Modal que muestra un formulario para agregar un nuevo rol */}
          <Modal isOpen={showModal} className={classList.modal} size='lg'>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Producto
            </ModalHeader>
            <ModalBody>
              <form
                id='formNewData'
                encType='multipart/form-data'
                onSubmit={(e) => newProduct(e)}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Seleccione una categoría
                      </InputLabel>
                      <Select
                        native
                        value={dataSelect.CtgId}
                        onChange={eventinput}
                        label='Seleccione una categoría'
                        required
                        inputProps={{
                          name: "CtgId",
                          id: "outlined-age-native-simple",
                        }}>
                        <option aria-label='' value='' />
                        <option value={1}>General</option>
                        <option value={2}>Antídoto</option>
                        <option value={3}></option>
                        <option value={4}></option>
                      </Select>
                    </FormControl>
                    &nbsp;
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Nivel de Prescripción
                      </InputLabel>
                      <Select
                        native
                        value={dataSelect.MdcNivPrescMed}
                        onChange={eventinput}
                        label='Nivel de Prescripción'
                        required
                        inputProps={{
                          name: "MdcNivPrescMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option aria-label='None' value='' />
                        <option value={"O"}>O</option>
                        <option value={"P"}>P</option>
                        <option value={"E"}>E</option>
                        <option value={"PE"}>PE</option>
                      </Select>
                    </FormControl>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcCodMed'
                      size='small'
                      id='MdcCodMed'
                      label='Código de Producto'
                      fullWidth
                      autoFocus
                      required
                      onChange={eventinput}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcPresenMed'
                      size='small'
                      id='MdcPresenMed'
                      label='Presentación'
                      fullWidth
                      required
                      onChange={eventinput}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Nivel de Atención
                      </InputLabel>
                      <Select
                        native
                        value={dataSelect.MdcNivAtencMed}
                        onChange={eventinput}
                        label='Nivel de Atención'
                        inputProps={{
                          name: "MdcNivAtencMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option aria-label='None' value='' />
                        <option value={"I"}>Nivel 1</option>
                        <option value={"II"}>Nivel 2</option>
                        <option value={"III"}>Nivel 3</option>
                        <option value={"I-II"}>Nivel 1-2</option>
                        <option value={"I-III"}>Nivel 1-3</option>
                        <option value={"I-II-III"}>Nivel 1-2-3</option>
                        <option value={"II-III"}>Nivel 2-3</option>
                      </Select>
                    </FormControl>
                    &nbsp;
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Vía de administración
                      </InputLabel>
                      <Select
                        native
                        value={dataSelect.MdcViaAdmMed}
                        onChange={eventinput}
                        label='Vía de administración'
                        inputProps={{
                          name: "MdcViaAdmMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option aria-label='None' value='' />
                        <option value={"O"}>O</option>
                        <option value={"P"}>P</option>
                        <option value={"E"}>E</option>
                        <option value={"PE"}>PE</option>
                      </Select>
                    </FormControl>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcDescMed'
                      size='small'
                      id='MdcDescMed'
                      label='Nombre de Producto'
                      fullWidth
                      autoFocus
                      required
                      onChange={eventinput}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcConcenMed'
                      size='small'
                      id='MdcConcenMed'
                      label='Concentración'
                      fullWidth
                      required
                      onChange={eventinput}
                    />
                  </Grid>
                  <TextField
                    className={classList.file}
                    variant='standard'
                    margin='normal'
                    type='file'
                    name='MdcFotoMed'
                    size='small'
                    id='MdcFotoMed'
                    fullWidth
                    accept='image/*'
                    onChange={eventinput}
                  />
                  <label for='MdcFotoMed'>Imagen de Producto</label>
                </Grid>
              </form>
            </ModalBody>
            <ModalFooter className={classList.modalFooter}>
              <Button
                type='submit'
                color='success'
                size='md'
                form='formNewData'>
                <Tooltip title='Guardar' placement='left'>
                  <i className='zmdi zmdi-save' />
                </Tooltip>
              </Button>{" "}
              <Button
                color='danger'
                size='md'
                onClick={() => abrirCerrarModal()}>
                <Tooltip title='Cancelar' placement='right'>
                  <i className='zmdi zmdi-stop' />
                </Tooltip>
              </Button>
            </ModalFooter>
          </Modal>

          {/* Modal que muestra los datos del rol a ser editado */}
          <Modal isOpen={showModalEdit} className={classList.modal} size='lg'>
            <ModalHeader className={classList.modalHeaderEdit}>
              Editar Producto
            </ModalHeader>
            <ModalBody>
              <form
                id='formUpdateData'
                encType='multipart/form-data'
                onSubmit={(e) => updateProduct(e)}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <input
                      type='hidden'
                      name='MdcId'
                      value={dataSelect.MdcId}
                    />
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Seleccione una categoría
                      </InputLabel>
                      <Select
                        native
                        value={dataSelect.CtgId}
                        onChange={eventinput}
                        label='Seleccione una categoría'
                        required
                        inputProps={{
                          name: "CtgId",
                          id: "outlined-age-native-simple",
                        }}>
                        <option
                          label={dataSelect.CtgNomCat}
                          value={dataSelect.CtgId}
                        />
                        <option value={1}>General</option>
                        <option value={2}>Antídoto</option>
                        <option value={3}></option>
                        <option value={4}></option>
                      </Select>
                    </FormControl>
                    &nbsp;
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Nivel de Prescripción
                      </InputLabel>
                      <Select
                        native
                        value={dataSelect.MdcNivPrescMed}
                        onChange={eventinput}
                        label='Nivel de Prescripción'
                        required
                        inputProps={{
                          name: "MdcNivPrescMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option
                          label={dataSelect.MdcNivPrescMed}
                          value={dataSelect.MdcNivPrescMed}
                        />
                        <option value={"O"}>O</option>
                        <option value={"P"}>P</option>
                        <option value={"E"}>E</option>
                        <option value={"PE"}>PE</option>
                      </Select>
                    </FormControl>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcCodMed'
                      size='small'
                      id='MdcCodMed'
                      label='Código de Producto'
                      fullWidth
                      autoFocus
                      required
                      value={dataSelect.MdcCodMed}
                      onChange={eventinput}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcPresenMed'
                      size='small'
                      id='MdcPresenMed'
                      label='Presentación'
                      fullWidth
                      value={dataSelect.MdcPresenMed}
                      onChange={eventinput}
                    />
                    <TextField
                      className={classList.file}
                      variant='standard'
                      margin='normal'
                      type='file'
                      name='MdcFotoMed'
                      size='small'
                      id='MdcFotoMed'
                      fullWidth
                      accept='image/*'
                      onChange={eventinput}
                    />
                    <label for='MdcFotoMed'>Imagen de Producto</label>
                    &nbsp;
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Nivel de Atención
                      </InputLabel>
                      <Select
                        native
                        value={dataSelect.MdcNivAtencMed}
                        onChange={eventinput}
                        label='Nivel de Atención'
                        inputProps={{
                          name: "MdcNivAtencMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option
                          label={dataSelect.MdcNivAtencMed}
                          value={dataSelect.MdcNivAtencMed}
                        />
                        <option value={"I"}>Nivel 1</option>
                        <option value={"II"}>Nivel 2</option>
                        <option value={"III"}>Nivel 3</option>
                        <option value={"I-II"}>Nivel 1-2</option>
                        <option value={"I-III"}>Nivel 1-3</option>
                        <option value={"I-II-III"}>Nivel 1-2-3</option>
                        <option value={"II-III"}>Nivel 2-3</option>
                      </Select>
                    </FormControl>
                    &nbsp;
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Vía de administración
                      </InputLabel>
                      <Select
                        native
                        value={dataSelect.MdcViaAdmMed}
                        onChange={eventinput}
                        label='Vía de administración'
                        inputProps={{
                          name: "MdcViaAdmMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option
                          label={dataSelect.MdcViaAdmMed}
                          value={dataSelect.MdcViaAdmMed}
                        />
                        <option value={"O"}>O</option>
                        <option value={"P"}>P</option>
                        <option value={"E"}>E</option>
                        <option value={"PE"}>PE</option>
                      </Select>
                    </FormControl>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcDescMed'
                      size='small'
                      id='MdcDescMed'
                      label='Nombre de Producto'
                      fullWidth
                      autoFocus
                      required
                      value={dataSelect.MdcDescMed}
                      onChange={eventinput}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcConcenMed'
                      size='small'
                      id='MdcConcenMed'
                      label='Concentración'
                      fullWidth
                      required
                      value={dataSelect.MdcConcenMed}
                      onChange={eventinput}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcEstMed'
                      size='small'
                      id='MdcEstMed'
                      label='Estado'
                      fullWidth
                      required
                      value={dataSelect.MdcEstMed}
                      onChange={eventinput}
                    />
                  </Grid>
                </Grid>
              </form>
            </ModalBody>
            <ModalFooter className={classList.modalFooter}>
              <Button
                type='submit'
                color='success'
                size='md'
                form='formUpdateData'>
                <Tooltip title='Guardar' placement='left'>
                  <i className='zmdi zmdi-save' />
                </Tooltip>
              </Button>{" "}
              <Button
                color='danger'
                size='md'
                onClick={() => abrirCerrarModalEdit()}>
                <Tooltip title='Cancelar' placement='right'>
                  <i className='zmdi zmdi-stop' />
                </Tooltip>
              </Button>
            </ModalFooter>
          </Modal>
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar Producto"}
            alertTitle={"¿Está seguro de eliminar el producto:"}
            alertText={dataSelect.MdcDescMed}
            showModalDelete={showModalDelete}
            deleteUser={deleteProduct}
            abrirCerrarModalDelete={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default ProductData;
