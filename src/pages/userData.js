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
import Menu from "../templates/menu";
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
    padding: theme.spacing(3),
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
let counter = null;

const UserData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [alert, setAlert] = useState(null);
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

  // obteniendo los datos de las cajas de texto
  const eventinput = (e) => {
    if (e.target.name === "UsrImgUsu") {
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
  const listUser = async () => {
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
    listUser();
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
        abrirCerrarModal();
        setAlert("Registro creado correctamente");
      })
      .catch((er) => {
        console.log(er);
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
        abrirCerrarModalEdit();
        setAlert("Registro actualizado correctamente");
      })
      .catch((er) => {
        console.log(er);
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
        setAlert("Registro eliminado correctamente");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función permite elegir el modal que se abrirá y guaerda los datos en el estado
  const selectedItem = (user, type) => {
    setDataSelect(user);
    if (type === "Edit") {
      abrirCerrarModalEdit();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "UsrId" },
    { title: "FOTO", field: "data:image/png;base64,UsrImgUsu" },
    { title: "ROL", field: "RrlNomRol" },
    { title: "USUARIO", field: "UsrNomUsu" },
    { title: "EMAIL", field: "UsrEmailUsu" },
    { title: "TELÉFONO", field: "UsrTelfUsu" },
    { title: "ESTADO", field: "UsrEstUsu" },
  ];

  return (
    <div className={classList.root}>
      <Menu />
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
              alert={alert}
              changeState={changeState}
            />
          </Grid>
          &nbsp;
          {/* Tabla que muestra la información de los roles en bd */}
          <Grid container spacing={2}>
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
                  onSubmit={(e) => newUser(e)}>
                  <FormControl
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Seleccione un Rol
                    </InputLabel>
                    <Select
                      native
                      value={dataSelect.RrlId}
                      onChange={eventinput}
                      label='Seleccione un Rol'
                      required
                      inputProps={{
                        name: "RrlId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option aria-label='' value='' />
                      <option value={2}>Supervisor</option>
                      <option value={3}>Técnico</option>
                      <option value={4}>Usuario</option>
                      <option value={5}>Invitado</option>
                    </Select>
                  </FormControl>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UsrNomUsu'
                    size='small'
                    id='UsrNomUsu'
                    label='Nombre de Usuario'
                    fullWidth
                    autoFocus
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='password'
                    name='UsrContraUsu'
                    size='small'
                    id='UsrContraUsu'
                    label='Contraseña'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='email'
                    name='UsrEmailUsu'
                    size='small'
                    id='UsrEmailUsu'
                    label='Email'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='telf'
                    name='UsrTelfUsu'
                    size='small'
                    id='UsrTelfUsu'
                    label='Teléfono'
                    fullWidth
                    required
                    onChange={eventinput}
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
                  <label for='UsrImgUsu'>Imagen de Usuario</label>
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
                  <i className='zmdi zmdi-stop' />
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
                  onSubmit={(e) => updateUser(e)}>
                  <input type='hidden' name='UsrId' value={dataSelect.UsrId} />
                  <FormControl
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Seleccione un Rol
                    </InputLabel>
                    <Select
                      native
                      value={dataSelect.RrlId}
                      onChange={eventinput}
                      label='Seleccione un Rol'
                      inputProps={{
                        name: "RrlId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        label={dataSelect.RrlNomRol}
                        value={dataSelect.RrlId}
                      />
                      <option value={2}>Supervisor</option>
                      <option value={3}>Técnico</option>
                      <option value={4}>Usuario</option>
                      <option value={5}>Invitado</option>
                    </Select>
                  </FormControl>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UsrNomUsu'
                    size='small'
                    id='UsrNomUsu'
                    label='Nombre de Usuario'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.UsrNomUsu}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='password'
                    name='UsrContraUsu'
                    size='small'
                    id='UsrContraUsu'
                    label='Contraseña'
                    fullWidth
                    placeholder='********'
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='email'
                    name='UsrEmailUsu'
                    size='small'
                    id='UsrEmailUsu'
                    label='Email'
                    fullWidth
                    required
                    value={dataSelect.UsrEmailUsu}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='telf'
                    name='UsrTelfUsu'
                    size='small'
                    id='UsrTelfUsu'
                    label='Teléfono'
                    fullWidth
                    required
                    value={dataSelect.UsrTelfUsu}
                    onChange={eventinput}
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
                  <label for='UsrImgUsu'>Imagen de Usuario</label>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UsrEstUsu'
                    size='small'
                    id='UsrEstUsu'
                    label='Estado'
                    fullWidth
                    required
                    value={dataSelect.UsrEstUsu}
                    onChange={eventinput}
                  />
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
                  <i className='zmdi zmdi-stop' />
                </Tooltip>
              </Button>
            </ModalFooter>
          </Modal>
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            alertTitle={"¿Está seguro de eliminar el usuario:"}
            alertText={dataSelect.UsrNomUsu}
            showModalDelete={showModalDelete}
            deleteUser={deleteUser}
            abrirCerrarModalDelete={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default UserData;
