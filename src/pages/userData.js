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
import md5 from "md5";
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

const ServUrl = "http://localhost/SUMI/models/userModel.php";

const UserData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [datalistSelectRol, setDatalistSelectRol] = useState([]);
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
    text: "",
    user: "",
    password: "",
    email: "",
    telf: "",
  });
  const [error, setError] = useState({
    text: false,
    user: false,
    password: false,
    email: false,
    telf: false,
  });
  const [dataSelect, setDataSelect] = useState({
    UsrId: "",
    RrlId: "",
    RrlNomRol: "",
    UsrNomUsu: "",
    UsrContraUsu: "",
    UsrEmailUsu: "",
    UsrTelfUsu: "",
    UsrImgUsu: "",
    UsrEstUsu: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({
      text: false,
      user: false,
      password: false,
      email: false,
      telf: false,
    });
    setMessage({ text: "", user: "", password: "", email: "", telf: "" });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({
      text: false,
      user: false,
      password: false,
      email: false,
      telf: false,
    });
    setMessage({ text: "", user: "", password: "", email: "", telf: "" });
  };

  const abrirCerrarModalDetail = () => {
    setShowModalDetail(!showModalDetail);
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    if (
      error.text === false &&
      error.user === false &&
      error.password === false &&
      error.email === false &&
      error.telf === false
    ) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    if (
      error.text === false &&
      error.user === false &&
      error.password === false &&
      error.email === false &&
      error.telf === false
    ) {
      setShowModalActual(!showModalActual);
    }
  };

  const abrirCerrarModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  // limpiando los campos
  const clear = () => {
    setDataSelect(() => ({
      UsrId: "",
      RrlId: "",
      RrlNomRol: "",
      UsrNomUsu: "",
      UsrContraUsu: "",
      UsrEmailUsu: "",
      UsrTelfUsu: "",
      UsrImgUsu: "",
      UsrEstUsu: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      text: /^[a-zA-ZA-ý\s]{1,40}$/,
      user: /^[a-zA-Z0-9_-]{4,16}$/,
      password: /^.{4,12}$/,
      email: /^[a-zA-Z0-9_\-.]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]{3,6}$/,
      telf: /^[0-9]{7,10}$/,
    };

    if (fieldName === "text") {
      if (expressions.text.test(dataSelect.UsrNomUsu)) {
        setError((prevState) => ({
          ...prevState,
          text: false,
        }));
        setMessage((prevState) => ({ ...prevState, text: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          text: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          text: "solo se permiten letras y un máximo de 40 caracteres",
        }));
      }
    } else if (fieldName === "user") {
      if (expressions.user.test(dataSelect.UsrNomUsu)) {
        setError((prevState) => ({
          ...prevState,
          user: false,
        }));
        setMessage((prevState) => ({ ...prevState, user: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          user: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          user:
            " no permitidos caracteres especiales, con mínimo 4 y máximo 16 caracteres",
        }));
      }
    } else if (fieldName === "password") {
      if (expressions.password.test(dataSelect.UsrContraUsu)) {
        setError((prevState) => ({
          ...prevState,
          password: false,
        }));
        setMessage((prevState) => ({ ...prevState, password: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          password: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          password:
            "la contraseña debe tener 4 caracteres mínimo y 12 caracteres máximo",
        }));
      }
    } else if (fieldName === "email") {
      if (expressions.email.test(dataSelect.UsrEmailUsu)) {
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
    } else if (fieldName === "telf") {
      if (expressions.telf.test(dataSelect.UsrTelfUsu)) {
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
          UsrImgUsu: arrayAux[1],
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
    if (e.target.name === "UsrImgUsu") {
      base64Convert(e.target.files);
    } else {
      setDataSelect((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // obteniendo datos de un servidor
  const listUser = async () => {
    await axios
      .get(ServUrl)
      .then((response) => {
        setData(JSON.parse(response.data.split("<", 1)));
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select rol
  const listSelectRol = async () => {
    await axios
      .get(ServUrl + "?rol=0")
      .then((response) => {
        setDatalistSelectRol(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    clear();
    listUser();
    listSelectRol();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newUser = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("RrlId", dataSelect.RrlId);
    f.append("UsrNomUsu", dataSelect.UsrNomUsu);
    f.append("UsrContraUsu", md5(dataSelect.UsrContraUsu));
    f.append("UsrEmailUsu", dataSelect.UsrEmailUsu);
    f.append("UsrTelfUsu", dataSelect.UsrTelfUsu);
    f.append("UsrImgUsu", dataSelect.UsrImgUsu);
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
  const updateUser = async (e) => {
    e.preventDefault();
    console.log(dataSelect.UsrContraUsu);
    let f = new FormData();
    f.append("RrlId", dataSelect.RrlId);
    f.append("UsrNomUsu", dataSelect.UsrNomUsu);
    if (dataSelect.UsrContraUsu.length > 31) {
      f.append("UsrContraUsu", 0);
    } else {
      f.append("UsrContraUsu", md5(dataSelect.UsrContraUsu));
    }

    f.append("UsrEmailUsu", dataSelect.UsrEmailUsu);
    f.append("UsrTelfUsu", dataSelect.UsrTelfUsu);
    f.append("UsrImgUsu", dataSelect.UsrImgUsu);
    f.append("UsrEstUsu", dataSelect.UsrEstUsu);
    f.append("METHOD", "PUT");
    await axios
      .post(
        ServUrl,
        f,
        { params: { id: dataSelect.UsrId } },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.log(response.data);
        let newData = data;
        newData.map((info) => {
          if (info.UsrId === dataSelect.UsrId) {
            info.RrlId = dataSelect.RrlId;
            info.UsrNomUsu = dataSelect.UsrNomUsu;
            info.UsrContraUsu = dataSelect.UsrContraUsu;
            info.UsrEmailUsu = dataSelect.UsrEmailUsu;
            info.UsrTelfUsu = dataSelect.UsrTelfUsu;
            info.UsrImgUsu = dataSelect.UsrImgUsu;
            info.UsrEstUsu = dataSelect.UsrEstUsu;
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
  const deleteUser = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.UsrId } })
      .then((response) => {
        setData(data.filter((user) => user.UsrId !== dataSelect.UsrId));
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
  const selectedItem = (user, type) => {
    if (type === "Edit") {
      setDataSelect(user);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(user);
      abrirCerrarModalDetail();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "UsrId" },
    { title: "ROL", field: "RrlNomRol" },
    { title: "USUARIO", field: "UsrNomUsu" },
    { title: "EMAIL", field: "UsrEmailUsu" },
    { title: "TELÉFONO", field: "UsrTelfUsu" },
  ];

  const status = dataSelect.UsrEstUsu === "A" ? "Activo" : "Inactivo";

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
              title={"Usuarios"}
              icon1={"zmdi zmdi-male-female"}
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
              title={"Usuarios habilitados en el sistema"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar un nuevo rol */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Usuario
            </ModalHeader>
            <ModalBody>
              <div>
                <form
                  id='formNewData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalSave(e)}>
                  <FormControl size='small' variant='outlined' fullWidth>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Rol contenedor
                    </InputLabel>
                    <Select
                      native
                      required
                      onChange={eventinput}
                      label='Rol contenedor'
                      inputProps={{
                        name: "RrlId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option key='0' aria-label='' value='' />
                      {datalistSelectRol.map((item, index) => (
                        <option key={index} value={item.RrlId} label=''>
                          {item.RrlNomRol}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    error={error.user}
                    helperText={message.user}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UsrNomUsu'
                    size='small'
                    id='user'
                    label='Nombre de Usuario'
                    fullWidth
                    autoFocus
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />

                  <TextField
                    required
                    error={error.password}
                    helperText={message.password}
                    variant='outlined'
                    margin='normal'
                    type='password'
                    name='UsrContraUsu'
                    size='small'
                    id='password'
                    label='Contraseña'
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
                    name='UsrEmailUsu'
                    size='small'
                    id='email'
                    label='Email'
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
                    name='UsrTelfUsu'
                    size='small'
                    id='telf'
                    label='Teléfono'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    className={classList.file}
                    variant='standard'
                    margin='normal'
                    type='file'
                    name='UsrImgUsu'
                    size='small'
                    id='file'
                    fullWidth
                    accept='image/*'
                    onChange={eventinput}
                  />
                  <label htmlFor='UsrImgUsu'>Imagen de Usuario</label>
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
              Editar Usuario
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
                  <input type='hidden' name='UsrId' value={dataSelect.UsrId} />
                  <FormControl size='small' variant='outlined' fullWidth>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Rol contenedor
                    </InputLabel>
                    <Select
                      native
                      required
                      onChange={eventinput}
                      label='Rol contenedor'
                      inputProps={{
                        name: "RrlId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={dataSelect.RrlNomRol}
                        value={dataSelect.RrlId}
                      />
                      {datalistSelectRol.map((item, index) => (
                        <option
                          key={index}
                          value={item.RrlId}
                          label={item.RrlNomRol}
                        />
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    error={error.user}
                    helperText={message.user}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UsrNomUsu'
                    size='small'
                    id='user'
                    label='Nombre de Usuario'
                    fullWidth
                    autoFocus
                    value={dataSelect.UsrNomUsu}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    error={error.password}
                    helperText={message.password}
                    variant='outlined'
                    margin='normal'
                    type='password'
                    name='UsrContraUsu'
                    size='small'
                    id='password'
                    label='Contraseña'
                    fullWidth
                    placeholder='********'
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
                    name='UsrEmailUsu'
                    size='small'
                    id='email'
                    label='Email'
                    fullWidth
                    value={dataSelect.UsrEmailUsu}
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
                    name='UsrTelfUsu'
                    size='small'
                    id='telf'
                    label='Teléfono'
                    fullWidth
                    value={dataSelect.UsrTelfUsu}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    className={classList.file}
                    variant='standard'
                    margin='normal'
                    type='file'
                    name='UsrImgUsu'
                    size='small'
                    id='UsrImgUsu'
                    fullWidth
                    accept='image/*'
                    onChange={eventinput}
                  />
                  <label htmlFor='UsrImgUsu'>Imagen de Usuario</label>
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
                        name: "UsrEstUsu",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={status}
                        value={dataSelect.UsrEstUsu}
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
          {/* Modal que muestra los datos del rol */}
          <Modal isOpen={showModalDetail} className={classList.modal} size='lg'>
            <ModalHeader className={classList.modalHeaderEdit}>
              Detalles Usuario
            </ModalHeader>
            <ModalBody>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <input type='hidden' name='UsrId' value={dataSelect.UsrId} />
                  <img
                    alt=''
                    src={`data:image/jpeg;base64,${dataSelect.UsrImgUsu}`}
                    width='90%'
                    height='400px'
                    variant='standard'
                    margin='normal'
                    size='small'
                    id='UsrImgUsu'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='RrlNomRol'
                    label='Rol de Usuario'
                    fullWidth
                    value={dataSelect.RrlNomRol}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='UsrNomUsu'
                    label='Nombre de Usuario'
                    fullWidth
                    value={dataSelect.UsrNomUsu}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='password'
                    size='small'
                    id='UsrContraUsu'
                    label='Contraseña'
                    fullWidth
                    placeholder='********'
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='email'
                    size='small'
                    id='UsrEmailUsu'
                    label='Email'
                    fullWidth
                    value={dataSelect.UsrEmailUsu}
                  />
                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='telf'
                    size='small'
                    id='UsrTelfUsu'
                    label='Teléfono'
                    fullWidth
                    value={dataSelect.UsrTelfUsu}
                  />

                  <TextField
                    disabled
                    variant='standard'
                    margin='normal'
                    type='text'
                    size='small'
                    id='UsrEstUsu'
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
            title={"Guardar usuario"}
            alertTitle={"¿Está seguro de crear el usuario:"}
            alertText={dataSelect.UsrNomUsu}
            showModal={showModalSave}
            actionUser={(e) => newUser(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar usuario"}
            alertTitle={"¿Está seguro de actualizar el usuario a:"}
            alertText={dataSelect.UsrNomUsu}
            showModal={showModalActual}
            actionUser={(e) => updateUser(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar usuario"}
            alertTitle={"¿Está seguro de eliminar el usuario:"}
            alertText={dataSelect.UsrNomUsu}
            showModal={showModalDelete}
            actionUser={deleteUser}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default UserData;
