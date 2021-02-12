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
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
// importandom los componentes
import MenuBar from "../templates/menu";
import Footer from "../templates/footer";
import AllAlerts from "./components/alerts";

const stylesPage = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: "url('/img/inicio.jpg')",
    overflow: "auto",
    backgroundPosition: "top",
    width: "100%",
    height: "96vh",
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
  category: { height: "30px", background: "#000000" },
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
    padding: theme.spacing(2),
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
    fontSize: "8px",
  },
}));

const ServUrl = "http://localhost/SUMI/models/productModel.php";

const ProductData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [datalistSelectCat, setDatalistSelectCat] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalActual, setShowModalActual] = useState(false);
  const [show, setShow] = useState("alertHide");
  const [type, setType] = useState("");
  const [alert, setAlert] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [message, setMessage] = useState({
    code: "",
    desc: "",
    concen: "",
    presen: "",
  });
  const [error, setError] = useState({
    code: false,
    desc: false,
    concen: false,
    presen: false,
  });
  const [dataSelect, setDataSelect] = useState({
    MdcId: "",
    CtgId: "",
    CtgNomCat: "",
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
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({ code: false, desc: false, presen: false, concen: false });
    setMessage({ code: "", desc: "", presen: "", concen: "" });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({ code: false, desc: false, presen: false, concen: false });
    setMessage({ code: "", desc: "", presen: "", concen: "" });
  };

  const abrirCerrarModalDetail = () => {
    setShowModalDetail(!showModalDetail);
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    if (
      error.code === false &&
      error.desc === false &&
      error.presen === false &&
      error.concen === false
    ) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    if (
      error.code === false &&
      error.desc === false &&
      error.presen === false &&
      error.concen === false
    ) {
      setShowModalActual(!showModalActual);
    }
  };

  const abrirCerrarModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  if (alert !== null) {
    let alert = document.getElementById("al");
    alert.classList.replace("alertHide", "alertShow");
  }

  // limpiando los campos
  const clear = () => {
    setDataSelect(() => ({
      MdcId: "",
      CtgId: "",
      CtgNomCat: "",
      MdcCodMed: "",
      MdcDescMed: "",
      MdcPresenMed: "",
      MdcConcenMed: "",
      MdcNivPrescMed: "",
      MdcNivAtencMed: "",
      MdcViaAdmMed: "",
      MdcFotoMed: "",
      MdcEstMed: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      text: /^[a-zA-ZA-ý\s]{1,40}$/,
      code: /^[a-zA-Z0-9]{6,10}$/,
      mix2: /^[a-zA-Z0-9_-]{1,40}$/,
    };

    if (fieldName === "code") {
      if (expressions.code.test(dataSelect.MdcCodMed)) {
        setError((prevState) => ({
          ...prevState,
          code: false,
        }));
        setMessage((prevState) => ({ ...prevState, code: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          code: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          code:
            "permitidos letras y números con mínimo 6 y máximo 10 caracteres",
        }));
      }
    } else if (fieldName === "desc") {
      if (expressions.text.test(dataSelect.MdcDescMed)) {
        setError((prevState) => ({
          ...prevState,
          desc: false,
        }));
        setMessage((prevState) => ({ ...prevState, desc: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          desc: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          desc: " solo se permiten letras, con mínimo 3 y máximo 40 caracteres",
        }));
      }
    } else if (fieldName === "presen") {
      if (expressions.text.test(dataSelect.MdcPresenMed)) {
        setError((prevState) => ({
          ...prevState,
          presen: false,
        }));
        setMessage((prevState) => ({ ...prevState, presen: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          presen: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          presen:
            " solo se permiten letras, con mínimo 3 y máximo 40 caracteres",
        }));
      }
    } else if (fieldName === "concen") {
      if (expressions.mix2.test(dataSelect.MdcConcenMed)) {
        setError((prevState) => ({
          ...prevState,
          concen: false,
        }));
        setMessage((prevState) => ({ ...prevState, concen: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          concen: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          concen: "permitidos solo letras y números",
        }));
      }
    }
  };

  // convirtiendo a base 64
  const base64Convert = (images) => {
    Array.from(images).forEach((image) => {
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        let arrayAux = [];
        let base64 = reader.result;
        arrayAux = base64.split(",");
        // console.log(arrayAux[1]);
        setDataSelect((prevState) => ({
          ...prevState,
          MdcFotoMed: arrayAux[1],
        }));
      };
    });
  };

  // obteniendo el typo para validar
  const evalinput = (e) => {
    setFieldName(e.target.id);
    validations();
  };

  // obteniendo los datos de las cajas de texto
  const eventinput = (e) => {
    if (e.target.name === "MdcFotoMed") {
      base64Convert(e.target.files);
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
        setData(JSON.parse(response.data.split("<", 1)));
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select categoría
  const listSelectCategory = async () => {
    await axios
      .get(ServUrl + "?cat=0")
      .then((response) => {
        setDatalistSelectCat(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    clear();
    listProduct();
    listSelectCategory();
  }, []);

  console.log(dataSelect);
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
        abrirCerrarModalSave(e);
        abrirCerrarModal();
        setType("success");
        setShow("alertShow");
        setAlert("Registro creado correctamente");
        clear();
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setShow("alertShow");
        setAlert("....Ops! Hubo un error al procesar la petición");
        clear();
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
        abrirCerrarModalActual(e);
        abrirCerrarModalEdit();
        setType("success");
        setShow("alertShow");
        setAlert("Registro actualizado correctamente");
        clear();
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setShow("alertShow");
        setAlert("....Ops! Hubo un error al procesar la petición");
        clear();
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
        setType("success");
        setShow("alertShow");
        setAlert("Registro eliminado correctamente");
        clear();
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setShow("alertShow");
        setAlert("....Ops! Hubo un error al procesar la petición");
        clear();
      });
  };

  // Esta función permite elegir el modal que se abrirá y guaerda los datos en el estado
  const selectedItem = (product, type) => {
    if (type === "Edit") {
      setDataSelect(product);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(product);
      abrirCerrarModalDetail();
    } else {
      abrirCerrarModalDelete();
    }
  };

  const status = dataSelect.MdcEstMed === "A" ? "Activo" : "Inactivo";

  return (
    <div className={classList.root}>
      <MenuBar />
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
                cellHeight={230}
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
                        alertType={type}
                        alertText={alert}
                        show={show}
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
                    <Tooltip title='Nuevo producto' placement='top'>
                      <Fab color='secondary' onClick={() => abrirCerrarModal()}>
                        <AddIcon />
                      </Fab>
                    </Tooltip>
                  </ListSubheader>
                </GridListTile>

                {data.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <GridListTile
                      key={index}
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingTop: "15px",
                      }}>
                      <div
                        style={{
                          background: `${item.CtgColorCat}`,
                          height: "30px",
                          textAlign: "center",
                          padding: "5px 0",
                          fontSize: "15px",
                        }}>
                        {item.CtgNomCat}
                      </div>
                      <img
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "100%",
                        }}
                        src={`data:image/jpeg;base64,${item.MdcFotoMed}`}
                        alt={item.MdcDescMed}
                      />
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
                            <Tooltip title='Detalles' placement='bottom'>
                              <IconButton
                                aria-label={`detalles ${item.MdcDescMed}`}
                                className={classList.icon}
                                onClick={() => selectedItem(item, "Detail")}>
                                <i className='zmdi zmdi-info' />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='Editar' placement='bottom'>
                              <IconButton
                                aria-label={`detalles ${item.MdcDescMed}`}
                                className={classList.icon}
                                onClick={() => selectedItem(item, "Edit")}>
                                <i className='zmdi zmdi-edit' />
                              </IconButton>
                            </Tooltip>
                          </div>
                        }
                      />
                    </GridListTile>
                  </Grid>
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
                onSubmit={(e) => abrirCerrarModalSave(e)}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Categoría contenedor
                      </InputLabel>
                      <Select
                        native
                        onChange={eventinput}
                        label='Categoría contenedor'
                        required
                        inputProps={{
                          name: "CtgId",
                          id: "outlined-age-native-simple",
                        }}>
                        <option key='0' aria-label='' value='' />
                        {datalistSelectCat.map((item, index) => (
                          <option key={index} value={item.CtgId} label=''>
                            {item.CtgNomCat}
                          </option>
                        ))}
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
                        onChange={eventinput}
                        label='Nivel de Prescripción'
                        required
                        inputProps={{
                          name: "MdcNivPrescMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option aria-label='' value='' />
                        <option value={"O"}>O</option>
                        <option value={"P"}>P</option>
                        <option value={"E"}>E</option>
                        <option value={"PE"}>PE</option>
                      </Select>
                    </FormControl>
                    <TextField
                      error={error.code}
                      helperText={message.code}
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcCodMed'
                      size='small'
                      id='code'
                      label='Código de Producto'
                      fullWidth
                      autoFocus
                      required
                      onChange={eventinput}
                      onKeyUp={evalinput}
                    />
                    <TextField
                      error={error.presen}
                      helperText={message.presen}
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcPresenMed'
                      size='small'
                      id='presen'
                      label='Presentación'
                      fullWidth
                      required
                      onChange={eventinput}
                      onKeyUp={evalinput}
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
                        onChange={eventinput}
                        label='Nivel de Atención'
                        inputProps={{
                          name: "MdcNivAtencMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option aria-label='' value='' />
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
                        onChange={eventinput}
                        label='Vía de administración'
                        inputProps={{
                          name: "MdcViaAdmMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option aria-label='' value='' />
                        <option value={"O"}>O</option>
                        <option value={"P"}>P</option>
                        <option value={"E"}>E</option>
                        <option value={"PE"}>PE</option>
                      </Select>
                    </FormControl>
                    <TextField
                      error={error.desc}
                      helperText={message.desc}
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcDescMed'
                      size='small'
                      id='desc'
                      label='Nombre de Producto'
                      fullWidth
                      autoFocus
                      required
                      onChange={eventinput}
                      onKeyUp={evalinput}
                    />
                    <TextField
                      error={error.concen}
                      helperText={message.concen}
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcConcenMed'
                      size='small'
                      id='concen'
                      label='Concentración'
                      fullWidth
                      required
                      onChange={eventinput}
                      onKeyUp={evalinput}
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
                  <label htmlFor='MdcFotoMed'>Imagen de Producto</label>
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
                  <i className='zmdi zmdi-close' />
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
                onSubmit={(e) => abrirCerrarModalActual(e)}>
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
                        Categoría contenedor
                      </InputLabel>
                      <Select
                        native
                        onChange={eventinput}
                        label='Categoría contenedor'
                        required
                        inputProps={{
                          name: "CtgId",
                          id: "outlined-age-native-simple",
                        }}>
                        <option
                          key='0'
                          label={dataSelect.CtgNomCat}
                          value={dataSelect.CtgId}
                        />
                        {datalistSelectCat.map((item, index) => (
                          <option key={index} value={item.CtgId} label=''>
                            {item.CtgNomCat}
                          </option>
                        ))}
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
                      error={error.code}
                      helperText={message.code}
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcCodMed'
                      size='small'
                      id='code'
                      label='Código de Producto'
                      fullWidth
                      autoFocus
                      required
                      value={dataSelect.MdcCodMed}
                      onChange={eventinput}
                      onKeyUp={evalinput}
                    />
                    <TextField
                      error={error.presen}
                      helperText={message.presen}
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcPresenMed'
                      size='small'
                      id='presen'
                      label='Presentación'
                      fullWidth
                      value={dataSelect.MdcPresenMed}
                      onChange={eventinput}
                      onKeyUp={evalinput}
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
                    <label htmlFor='MdcFotoMed'>Imagen de Producto</label>
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
                      error={error.desc}
                      helperText={message.desc}
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcDescMed'
                      size='small'
                      id='desc'
                      label='Nombre de Producto'
                      fullWidth
                      autoFocus
                      required
                      value={dataSelect.MdcDescMed}
                      onChange={eventinput}
                      onKeyUp={evalinput}
                    />
                    <TextField
                      error={error.concen}
                      helperText={message.concen}
                      variant='outlined'
                      margin='normal'
                      type='text'
                      name='MdcConcenMed'
                      size='small'
                      id='concen'
                      label='Concentración'
                      fullWidth
                      required
                      value={dataSelect.MdcConcenMed}
                      onChange={eventinput}
                      onKeyUp={evalinput}
                    />
                    <FormControl
                      size='small'
                      variant='outlined'
                      className={classList.formControl}>
                      <InputLabel htmlFor='outlined-age-native-simple'>
                        Estado
                      </InputLabel>
                      <Select
                        native
                        onChange={eventinput}
                        label='Estado'
                        inputProps={{
                          name: "MdcEstMed",
                          id: "outlined-age-native-simple",
                        }}>
                        <option
                          key='0'
                          label={status}
                          value={dataSelect.MdcEstMed}
                        />
                        <option key='1' value={"A"}>
                          Activo
                        </option>
                        <option key='2' value={"X"}>
                          Inactivo
                        </option>
                      </Select>
                    </FormControl>
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
                  <i className='zmdi zmdi-close' />
                </Tooltip>
              </Button>
            </ModalFooter>
          </Modal>
          {/* Modal que muestra los datos del producto */}
          <Modal isOpen={showModalDetail} className={classList.modal} size='lg'>
            <ModalHeader className={classList.modalHeaderEdit}>
              Detalles Producto
            </ModalHeader>
            <ModalBody>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <input type='hidden' name='MdcId' value={dataSelect.MdcId} />
                  <img
                    alt=''
                    src={`data:image/jpeg;base64,${dataSelect.MdcFotoMed}`}
                    width='80%'
                    height='208px'
                    variant='standard'
                    margin='normal'
                    size='small'
                    id='MdcFotoMed'
                    fullWidth
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='CtgNomCat'
                    label='Categoría del Producto'
                    fullWidth
                    value={dataSelect.CtgNomCat}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='MdcCodMed'
                    label='Código de Producto'
                    fullWidth
                    value={dataSelect.MdcCodMed}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='MdcDescMed'
                    label='Nombre de Producto'
                    fullWidth
                    value={dataSelect.MdcDescMed}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='MdcNivPrescMed'
                    label='Nivel de Prescripción'
                    fullWidth
                    value={dataSelect.MdcNivPrescMed}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='MdcNivAtencMed'
                    label='Nivel de Atención'
                    fullWidth
                    value={dataSelect.MdcNivAtencMed}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='MdcViaAdmMed'
                    label='Vía de administración'
                    fullWidth
                    value={dataSelect.MdcViaAdmMed}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='MdcPresenMed'
                    label='Presentación'
                    fullWidth
                    value={dataSelect.MdcPresenMed}
                  />

                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='MdcConcenMed'
                    label='Concentración'
                    fullWidth
                    value={dataSelect.MdcConcenMed}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='MdcEstMed'
                    label='Estado'
                    fullWidth
                    value={status}
                  />
                </Grid>
              </Grid>
            </ModalBody>
            <ModalFooter className={classList.modalFooter}>
              <Button
                type='submit'
                color='success'
                size='md'
                onClick={() => selectedItem(0, "Delete")}>
                <Tooltip title='Eliminar' placement='left'>
                  <i className='zmdi zmdi-delete' />
                </Tooltip>
              </Button>{" "}
              <Button
                color='danger'
                size='md'
                onClick={() => abrirCerrarModalDetail()}>
                <Tooltip title='Cancelar' placement='right'>
                  <i className='zmdi zmdi-close' />
                </Tooltip>
              </Button>
            </ModalFooter>
          </Modal>
          {/* Modal para confirmación antes de guardar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Guardar producto"}
            alertTitle={"¿Está seguro de crear el producto:"}
            alertText={dataSelect.MdcDescMed}
            showModal={showModalSave}
            actionUser={(e) => newProduct(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar producto"}
            alertTitle={"¿Está seguro de actualizar el producto a:"}
            alertText={dataSelect.MdcDescMed}
            showModal={showModalActual}
            actionUser={(e) => updateProduct(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar producto"}
            alertTitle={"¿Está seguro de eliminar el producto:"}
            alertText={dataSelect.MdcDescMed}
            showModal={showModalDelete}
            actionUser={deleteProduct}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default ProductData;
