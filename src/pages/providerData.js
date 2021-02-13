import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
  makeStyles,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  Select,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
// importandom los componentes
import MenuBar from "../templates/menu";
import Footer from "../templates/footer";
import HeaderPage from "./components/headerPage";
import DataTable from "./components/dataTable";
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
  icons: {
    color: "white",
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
    padding: theme.spacing(2),
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
}));

const ServUrl = "http://localhost/SUMI/models/providerModel.php";

const ProviderData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
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
    razSoc: "",
    ident: "",
    dir: "",
    email: "",
    telf: "",
    perCont: "",
    carCont: "",
  });
  const [error, setError] = useState({
    razSoc: false,
    ident: false,
    dir: false,
    email: false,
    telf: false,
    perCont: false,
    carCont: false,
  });
  const [dataSelect, setDataSelect] = useState({
    PvdId: "",
    PvdTipProv: "",
    PvdIdentProv: "",
    PvdRazSocProv: "",
    PvdTelfProv: "",
    PvdDirProv: "",
    PvdEmailProv: "",
    PvdPerContProv: "",
    PvdCarContProv: "",
    PvdEstProv: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({
      razSoc: false,
      ident: false,
      dir: false,
      email: false,
      telf: false,
      perCont: false,
      carCont: false,
    });
    setMessage({
      razSoc: "",
      ident: "",
      dir: "",
      email: "",
      telf: "",
      perCont: "",
      carCont: "",
    });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({
      razSoc: false,
      ident: false,
      dir: false,
      email: false,
      telf: false,
      perCont: false,
      carCont: false,
    });
    setMessage({
      text: "",
      ident: "",
      dir: "",
      email: "",
      telf: "",
      perCont: "",
      carCont: "",
    });
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    if (
      error.razSoc === false &&
      error.ident === false &&
      error.dir === false &&
      error.email === false &&
      error.telf === false &&
      error.perCont === false &&
      error.carCont === false
    ) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    if (
      error.razSoc === false &&
      error.ident === false &&
      error.dir === false &&
      error.email === false &&
      error.telf === false &&
      error.perCont === false &&
      error.carCont === false
    ) {
      setShowModalActual(!showModalActual);
    }
  };

  const abrirCerrarModalDetail = () => {
    setShowModalDetail(!showModalDetail);
  };

  const abrirCerrarModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  // limpiando los campos
  const clear = () => {
    setDataSelect(() => ({
      PvdId: "",
      PvdTipProv: "",
      PvdIdentProv: "",
      PvdRazSocProv: "",
      PvdTelfProv: "",
      PvdDirProv: "",
      PvdEmailProv: "",
      PvdPerContProv: "",
      PvdCarContProv: "",
      PvdEstProv: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      text: /^[a-zA-ZA-ý\s]{1,40}$/,
      ident: /^[0-9]{10,13}$/,
      mix2: /^[a-zA-Z0-9\-. ]{1,60}$/,
      email: /^[a-zA-Z0-9_\-.]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]{3,6}$/,
      telf: /^[0-9]{7,10}$/,
    };

    if (fieldName === "ident") {
      if (expressions.ident.test(dataSelect.PvdIdentProv)) {
        setError((prevState) => ({
          ...prevState,
          ident: false,
        }));
        setMessage((prevState) => ({ ...prevState, ident: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          ident: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          ident:
            "solo se permiten números con mínimo 10 y máximo 13 caracteres ",
        }));
      }
    } else if (fieldName === "razSoc") {
      if (expressions.mix2.test(dataSelect.PvdRazSocProv)) {
        setError((prevState) => ({
          ...prevState,
          razSoc: false,
        }));
        setMessage((prevState) => ({ ...prevState, razSoc: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          razSoc: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          razSoc:
            " no permitidos caracteres especiales, con un máximo 60 caracteres",
        }));
      }
    } else if (fieldName === "telf") {
      if (expressions.telf.test(dataSelect.PvdTelfProv)) {
        setError((prevState) => ({
          ...prevState,
          telf: false,
        }));
        setMessage((prevState) => ({ ...prevState, telf: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          telf: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          telf: "solo se permiten números con mínimo 7 y máximo 10 caracteres",
        }));
      }
    } else if (fieldName === "email") {
      if (expressions.email.test(dataSelect.PvdEmailProv)) {
        setError((prevState) => ({
          ...prevState,
          email: false,
        }));
        setMessage((prevState) => ({ ...prevState, email: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          email: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          email: "el email debe contener '@' y '.' ejp(texto@texto.texto)",
        }));
      }
    } else if (fieldName === "dir") {
      if (expressions.mix2.test(dataSelect.PvdDirProv)) {
        setError((prevState) => ({
          ...prevState,
          dir: false,
        }));
        setMessage((prevState) => ({ ...prevState, dir: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          dir: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          dir: "no se permiten caracteres especiales con máximo 60 caracteres",
        }));
      }
    } else if (fieldName === "perCont") {
      if (expressions.text.test(dataSelect.PvdPerContProv)) {
        setError((prevState) => ({
          ...prevState,
          perCont: false,
        }));
        setMessage((prevState) => ({ ...prevState, perCont: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          perCont: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          perCont: "solo se permiten letras con máximo 40 caracteres",
        }));
      }
    } else if (fieldName === "carCont") {
      if (expressions.text.test(dataSelect.PvdCarContProv)) {
        setError((prevState) => ({
          ...prevState,
          carCont: false,
        }));
        setMessage((prevState) => ({ ...prevState, carCont: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          carCont: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          carCont: "solo se permiten letras con máximo 40 caracteres",
        }));
      }
    }
  };

  // obteniendo el typo para validar
  const evalinput = (e) => {
    setFieldName(e.target.id);
    validations();
  };

  // obteniendo los datos de las cajas de texto
  const eventinput = (e) => {
    setDataSelect((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // obteniendo datos de un servidor
  const listProvider = async () => {
    await axios
      .get(ServUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    clear();
    listProvider();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newProvider = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("PvdTipProv", dataSelect.PvdTipProv);
    f.append("PvdIdentProv", dataSelect.PvdIdentProv);
    f.append("PvdRazSocProv", dataSelect.PvdRazSocProv);
    f.append("PvdTelfProv", dataSelect.PvdTelfProv);
    f.append("PvdDirProv", dataSelect.PvdDirProv);
    f.append("PvdEmailProv", dataSelect.PvdEmailProv);
    f.append("PvdPerContProv", dataSelect.PvdPerContProv);
    f.append("PvdCarContProv", dataSelect.PvdCarContProv);
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
  const updateProvider = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("PvdTipProv", dataSelect.PvdTipProv);
    f.append("PvdIdentProv", dataSelect.PvdIdentProv);
    f.append("PvdRazSocProv", dataSelect.PvdRazSocProv);
    f.append("PvdTelfProv", dataSelect.PvdTelfProv);
    f.append("PvdDirProv", dataSelect.PvdDirProv);
    f.append("PvdEmailProv", dataSelect.PvdEmailProv);
    f.append("PvdPerContProv", dataSelect.PvdPerContProv);
    f.append("PvdCarContProv", dataSelect.PvdCarContProv);
    f.append("PvdEstProv", dataSelect.PvdEstProv);
    f.append("METHOD", "PUT");
    await axios
      .post(
        ServUrl,
        f,
        { params: { id: dataSelect.PvdId } },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.log(response.data);
        let newData = data;
        newData.map((info) => {
          if (info.PvdId === dataSelect.PvdId) {
            info.PvdTipProv = dataSelect.PvdTipProv;
            info.PvdIdentProv = dataSelect.PvdIdentProv;
            info.PvdRazSocProv = dataSelect.PvdRazSocProv;
            info.PvdTelfProv = dataSelect.PvdTelfProv;
            info.PvdDirProv = dataSelect.PvdDirProv;
            info.PvdEmailProv = dataSelect.PvdEmailProv;
            info.PvdPerContProv = dataSelect.PvdPerContProv;
            info.PvdCarContProv = dataSelect.PvdCarContProv;
            info.PvdEstProv = dataSelect.PvdEstProv;
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
  const deleteProvider = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.PvdId } })
      .then((response) => {
        setData(data.filter((prov) => prov.PvdId !== dataSelect.PvdId));
        abrirCerrarModalDelete();
        abrirCerrarModalDetail();
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
  const selectedItem = (prov, type) => {
    if (type === "Edit") {
      setDataSelect(prov);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(prov);
      abrirCerrarModalDetail();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "PvdId" },
    { title: "RUC", field: "PvdIdentProv" },
    { title: "NOMBRE", field: "PvdRazSocProv" },
    { title: "TELF", field: "PvdTelfProv" },
    { title: "EMAIL", field: "PvdEmailProv" },
  ];

  const identType = dataSelect.PvdTipProv === "N" ? "Natural" : "Juridico";
  const status = dataSelect.PvdEstProv === "A" ? "Activo" : "Inactivo";

  return (
    <div className={classList.root}>
      <MenuBar />
      <main>
        <Grid container className={classList.content}>
          <div className={classList.toolbar}></div>
          <Grid container spacing={2}>
            {/* Cabecera de la página */}
            <HeaderPage
              AbrirCerrarModal={abrirCerrarModal}
              title={"Proveedores"}
              icon1={"zmdi zmdi-truck"}
              icon2={"zmdi zmdi-plus"}
              type={type}
              alert={alert}
              show={show}
              changeState={changeState}
            />
          </Grid>
          &nbsp;
          <Grid container spacing={2}>
            {/* Tabla que muestra la información de los usuarios en bd */}
            <DataTable
              selectedItem={selectedItem}
              data={data}
              columns={columns}
              title={"Proveedores habilitados en el sistema"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar un nuevo rol */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Proveedor
            </ModalHeader>
            <ModalBody>
              <div>
                <form
                  id='formNewData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalSave(e)}>
                  <FormControl
                    size='small'
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Tipo de Identificación
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Tipo de Identificación'
                      required
                      inputProps={{
                        name: "PvdTipProv",
                        id: "outlined-age-native-simple",
                      }}>
                      <option key='0' aria-label='' value='' />
                      <option key='1' value='N' label='Natural' />
                      <option key='2' value='J' label='Jurídico' />
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    error={error.ident}
                    helperText={message.ident}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdIdentProv'
                    size='small'
                    id='ident'
                    label='Identificación'
                    fullWidth
                    autoFocus
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.razSoc}
                    helperText={message.razSoc}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdRazSocProv'
                    size='small'
                    id='razSoc'
                    label='Razón Social'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.telf}
                    helperText={message.telf}
                    variant='outlined'
                    margin='normal'
                    type='telf'
                    name='PvdTelfProv'
                    size='small'
                    id='telf'
                    label='Teléfono'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.dir}
                    helperText={message.dir}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdDirProv'
                    size='small'
                    id='dir'
                    label='Dirección'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.email}
                    helperText={message.email}
                    variant='outlined'
                    margin='normal'
                    type='email'
                    name='PvdEmailProv'
                    size='small'
                    id='email'
                    label='Email'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.perCont}
                    helperText={message.perCont}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdPerContProv'
                    size='small'
                    id='perCont'
                    label='Persona de contacto'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.carCont}
                    helperText={message.carCont}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdCarContProv'
                    size='small'
                    id='carCont'
                    label='Cargo del contacto'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                </form>
              </div>
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
          <Modal isOpen={showModalEdit} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Editar Proveedor
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
                  <input type='hidden' name='PvdId' value={dataSelect.PvdId} />
                  <FormControl
                    size='small'
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Tipo de Identificación
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Tipo de Identificación'
                      required
                      inputProps={{
                        name: "PvdTipProv",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={identType}
                        value={dataSelect.PvdTipProv}
                      />
                      <option key='1' value='N' label='Natural' />
                      <option key='2' value='J' label='Jurídico' />
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    error={error.ident}
                    helperText={message.ident}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdIdentProv'
                    size='small'
                    id='ident'
                    label='Identificación'
                    fullWidth
                    autoFocus
                    value={dataSelect.PvdIdentProv}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.razSoc}
                    helperText={message.razSoc}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdRazSocProv'
                    size='small'
                    id='razSoc'
                    label='Razón Social'
                    fullWidth
                    value={dataSelect.PvdRazSocProv}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.telf}
                    helperText={message.telf}
                    variant='outlined'
                    margin='normal'
                    type='telf'
                    name='PvdTelfProv'
                    size='small'
                    id='telf'
                    label='Teléfono'
                    fullWidth
                    value={dataSelect.PvdTelfProv}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.dir}
                    helperText={message.dir}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdDirProv'
                    size='small'
                    id='dir'
                    label='Dirección'
                    fullWidth
                    value={dataSelect.PvdDirProv}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.email}
                    helperText={message.email}
                    variant='outlined'
                    margin='normal'
                    type='email'
                    name='PvdEmailProv'
                    size='small'
                    id='email'
                    label='Email'
                    fullWidth
                    value={dataSelect.PvdEmailProv}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.perCont}
                    helperText={message.perCont}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdPerContProv'
                    size='small'
                    id='perCont'
                    label='Persona de contacto'
                    fullWidth
                    value={dataSelect.PvdPerContProv}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.carCont}
                    helperText={message.carCont}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdCarContProv'
                    size='small'
                    id='carCont'
                    label='Cargo del contacto'
                    fullWidth
                    value={dataSelect.PvdCarContProv}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <FormControl size='small' variant='outlined' fullWidth>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Estado
                    </InputLabel>
                    <Select
                      native
                      required
                      onChange={eventinput}
                      label='Estado'
                      inputProps={{
                        name: "PvdEstProv",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={status}
                        value={dataSelect.PvdEstProv}
                      />
                      <option key='1' value={"A"} label={"Activo"} />
                      <option key='2' value={"X"} label={"Inactivo"} />
                    </Select>
                  </FormControl>
                </form>
              </div>
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
          {/* Modal que muestra los datos del proveedor */}
          <Modal isOpen={showModalDetail} className={classList.modal} size='lg'>
            <ModalHeader className={classList.modalHeaderEdit}>
              Detalles Proveedor
            </ModalHeader>
            <ModalBody>
              <Grid container spacing={1}>
                <input type='hidden' name='PvdId' value={dataSelect.PvdId} />
                <TextField
                  disabled
                  variant='standard'
                  margin='normal'
                  type='text'
                  size='small'
                  id='ident'
                  label='Tipo de identificación'
                  fullWidth
                  value={identType}
                />
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='ident'
                    label='Identificación'
                    fullWidth
                    value={dataSelect.PvdIdentProv}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='razSoc'
                    label='Razón Social'
                    fullWidth
                    value={dataSelect.PvdRazSocProv}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='telf'
                    size='small'
                    id='telf'
                    label='Teléfono'
                    fullWidth
                    value={dataSelect.PvdTelfProv}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='dir'
                    label='Dirección'
                    fullWidth
                    value={dataSelect.PvdDirProv}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='email'
                    size='small'
                    id='email'
                    label='Email'
                    fullWidth
                    value={dataSelect.PvdEmailProv}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='perCont'
                    label='Persona de contacto'
                    fullWidth
                    value={dataSelect.PvdPerContProv}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='carCont'
                    label='Cargo del contacto'
                    fullWidth
                    value={dataSelect.PvdCarContProv}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='ident'
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
                <span>
                  <Tooltip title='Cerrar' placement='right'>
                    <i className='zmdi zmdi-close' />
                  </Tooltip>
                </span>
              </Button>
            </ModalFooter>
          </Modal>
          {/* Modal para confirmación antes de guardar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Guardar proveedor"}
            alertTitle={"¿Está seguro de crear el proveedor:"}
            alertText={dataSelect.PvdRazSocProv}
            showModal={showModalSave}
            actionUser={(e) => newProvider(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar proveedor"}
            alertTitle={"¿Está seguro de actualizar el proveedor:"}
            alertText={dataSelect.PvdRazSocProv}
            showModal={showModalActual}
            actionUser={(e) => updateProvider(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar proveedor"}
            alertTitle={"¿Está seguro de eliminar el proveedor:"}
            alertText={dataSelect.PvdRazSocProv}
            showModal={showModalDelete}
            actionUser={deleteProvider}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default ProviderData;
