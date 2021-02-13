import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
  makeStyles,
  Grid,
  TextField,
  Tooltip,
  FormControl,
  Select,
  InputLabel,
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
  iconPge: {
    color: "black",
    width: "40px",
    height: "40px",
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
    padding: theme.spacing(2, 6),
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

const ServUrl = "http://localhost/SUMI/models/rolModel.php";

const RolData = () => {
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
    nom: "",
  });
  const [error, setError] = useState({
    nom: false,
  });
  const [dataSelect, setDataSelect] = useState({
    RrlId: "",
    RrlNomRol: "",
    RrlEstRol: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({ nom: false });
    setMessage({ nom: "" });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({ nom: false });
    setMessage({ nom: "" });
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    if (error.nom === false) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    if (error.nom === false) {
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
      RrlId: "",
      RrlNomRol: "",
      RrlEstRol: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      text: /^[a-zA-ZA-ý\s]{1,40}$/,
    };

    if (fieldName === "nom") {
      if (expressions.text.test(dataSelect.RrlNomRol)) {
        setError((prevState) => ({
          ...prevState,
          nom: false,
        }));
        setMessage((prevState) => ({ ...prevState, nom: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          nom: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          nom: "solo se permiten letras con un máximo 40 caracteres",
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
      [e.target.name]: [e.target.value],
    }));
  };

  // obteniendo datos de un servidor
  const listRol = async () => {
    await axios
      .get(ServUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    clear();
    listRol();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newRol = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("RrlNomRol", dataSelect.RrlNomRol);
    f.append("METHOD", "POST");
    await axios
      .post(ServUrl, f)
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
  const updateRol = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("RrlNomRol", dataSelect.RrlNomRol);
    f.append("RrlEstRol", dataSelect.RrlEstRol);
    f.append("METHOD", "PUT");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.RrlId } })
      .then((response) => {
        let newData = data;
        newData.map((info) => {
          if (info.RrlId === dataSelect.RrlId) {
            info.RrlNomRol = dataSelect.RrlNomRol;
            info.RrlEstRol = dataSelect.RrlEstRol;
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
  const deleteRol = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.RrlId } })
      .then((response) => {
        setData(data.filter((rol) => rol.RrlId !== dataSelect.RrlId));
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
  const selectedItem = (rol, type) => {
    if (type === "Edit") {
      setDataSelect(rol);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(rol);
      abrirCerrarModalDetail();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "RrlId" },
    { title: "ROL", field: "RrlNomRol" },
    { title: "ESTADO", field: "RrlEstRol" },
  ];

  const status = dataSelect.RrlEstRol === "A" ? "Activo" : "Inactivo";

  return (
    <div className={classList.root}>
      <MenuBar />
      <main>
        <Grid container className={classList.content}>
          <div className={classList.toolbar}></div>
          <Grid container spacing={1}>
            {/* Cabecera de la página */}
            <HeaderPage
              AbrirCerrarModal={abrirCerrarModal}
              title={"Roles"}
              icon1={"zmdi zmdi-assignment"}
              icon2={"zmdi zmdi-plus"}
              type={type}
              alert={alert}
              show={show}
              changeState={changeState}
            />
          </Grid>
          &nbsp;
          <Grid container spacing={1}>
            {/* Tabla que muestra la información de los roles en bd */}
            <DataTable
              selectedItem={selectedItem}
              data={data}
              columns={columns}
              title={"Roles habilitados en el sistema"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar un nuevo rol */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Rol
            </ModalHeader>
            <ModalBody>
              <div>
                <form
                  id='formNewData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalSave(e)}>
                  <TextField
                    error={error.nom}
                    helperText={message.nom}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='RrlNomRol'
                    size='small'
                    id='nom'
                    label='Nombre del Rol'
                    fullWidth
                    autoFocus
                    required
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
              Editar Rol
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
                  <input type='hidden' name='RrlId' value={dataSelect.RrlId} />
                  <TextField
                    error={error.nom}
                    helperText={message.nom}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='RrlNomRol'
                    size='small'
                    id='RrlNomRol'
                    label='Nombre del Rol'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.RrlNomRol}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  &nbsp;
                  <FormControl
                    size='small'
                    variant='outlined'
                    fullWidth
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Estado
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Estado'
                      inputProps={{
                        name: "RrlEstRol",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={status}
                        value={dataSelect.RrlEstRol}
                      />
                      <option key='1' value={"A"}>
                        Activo
                      </option>
                      <option key='2' value={"X"}>
                        Inactivo
                      </option>
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
          {/* Modal que muestra los datos del rol a ser editado */}
          <Modal isOpen={showModalDetail} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Detalles Rol
            </ModalHeader>
            <ModalBody>
              <input type='hidden' name='RrlId' value={dataSelect.RrlId} />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='RrlNomRol'
                label='Nombre del Rol'
                fullWidth
                value={dataSelect.RrlNomRol}
              />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='RrlEstRol'
                label='Estado'
                fullWidth
                value={status}
              />
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
            title={"Guardar Rol"}
            alertTitle={"¿Está seguro de crear el rol:"}
            alertText={dataSelect.RrlNomRol}
            showModal={showModalSave}
            actionUser={(e) => newRol(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar Rol"}
            alertTitle={"¿Está seguro de actualizar el rol a:"}
            alertText={dataSelect.RrlNomRol}
            showModal={showModalActual}
            actionUser={(e) => updateRol(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar Rol"}
            alertTitle={"¿Está seguro de eliminar el rol:"}
            alertText={dataSelect.RrlNomRol}
            showModal={showModalDelete}
            actionUser={deleteRol}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default RolData;
