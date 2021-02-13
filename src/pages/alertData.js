import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
  makeStyles,
  Grid,
  TextField,
  Tooltip,
  Popover,
  InputLabel,
  InputBase,
  FormControl,
  Select,
} from "@material-ui/core";
import SketchPicker from "react-color";
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
    padding: theme.spacing(2, 4),
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

const ServUrl = "http://localhost/SUMI/models/alertModel.php";

const AlertData = () => {
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
  const [open, setOpen] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [message, setMessage] = useState({
    nom: "",
    color: "",
    desc: "",
  });
  const [error, setError] = useState({
    nom: false,
    color: false,
    desc: false,
  });
  const [dataSelect, setDataSelect] = useState({
    AltId: "",
    AltNomAle: "",
    AltColorAle: "",
    AltDescAle: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({ nom: false, color: false, desc: false });
    setMessage({ nom: "", color: "", desc: "" });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({ nom: false, color: false, desc: false });
    setMessage({ nom: "", color: "", desc: "" });
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    if (error.nom === false && error.color === false && error.desc === false) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    if (error.nom === false && error.color === false && error.desc === false) {
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
      AltId: "",
      AltNomAle: "",
      AltColorAle: "",
      AltDescAle: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      text: /^[a-zA-ZA-ý\s]{1,70}$/,
      code: /^[a-zA-Z0-9]{6,10}$/,
    };

    if (fieldName === "nom") {
      if (expressions.text.test(dataSelect.AltNomAle)) {
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
    } else if (fieldName === "color") {
      if (expressions.code.test(dataSelect.AltColorAle)) {
        setError((prevState) => ({
          ...prevState,
          color: false,
        }));
        setMessage((prevState) => ({ ...prevState, color: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          color: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          color: "solo código hexadecimal",
        }));
      }
    } else if (fieldName === "desc") {
      if (expressions.text.test(dataSelect.AltDescAle)) {
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
          desc: "solo se permiten letras con un máximo 40 caracteres",
        }));
      }
    }
  };

  // abrir y cerrar el picker de color
  const openPicker = (event) => {
    setOpen(event.currentTarget);
  };

  const closePicker = () => {
    setOpen(null);
  };

  const opened = Boolean(open);
  const id = opened ? "simple-popover" : undefined;

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

  // obteniendo el color
  const eventcolor = (color) => {
    setDataSelect((prevState) => ({
      ...prevState,
      AltColorAle: color.hex,
    }));
  };

  // obteniendo datos de un servidor
  const listAlert = async () => {
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
    listAlert();
  }, []);

  // Esta función guarda los datos de una nueva alerta
  const newAlert = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("AltNomAle", dataSelect.AltNomAle);
    f.append("AltColorAle", dataSelect.AltColorAle);
    f.append("AltDescAle", dataSelect.AltDescAle);
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

  // Esta función actualiza los datos de la alerta selecionada
  const updateAlert = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("AltNomAle", dataSelect.AltNomAle);
    f.append("AltColorAle", dataSelect.AltColorAle);
    f.append("AltDescAle", dataSelect.AltDescAle);
    f.append("METHOD", "PUT");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.AltId } })
      .then((response) => {
        let newData = data;
        newData.map((info) => {
          if (info.AltId === dataSelect.AltId) {
            info.AltNomAle = dataSelect.AltNomAle;
            info.AltColorAle = dataSelect.AltColorAle;
            info.AltDescAle = dataSelect.AltDescAle;
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

  // Esta función elimina los datos de la alerta seleccionada
  const deleteAlert = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.AltId } })
      .then((response) => {
        setData(data.filter((alt) => alt.AltId !== dataSelect.AltId));
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
  const selectedItem = (alert, type) => {
    if (type === "Edit") {
      setDataSelect(alert);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(alert);
      abrirCerrarModalDetail();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "AltId" },
    { title: "NOMBRE", field: "AltNomAle" },
    {
      title: "COLOR",
      field: "AltColorAle",
    },
    { title: "DESCRIPCIÓN", field: "AltDescAle", width: 10 },
  ];

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
              title={"Alertas"}
              icon1={"zmdi zmdi-alert-triangle"}
              icon2={"zmdi zmdi-plus"}
              type={type}
              alert={alert}
              show={show}
              changeState={changeState}
            />
          </Grid>
          &nbsp;
          <Grid container spacing={2}>
            {/* Tabla que muestra la información de las alertas en bd */}
            <DataTable
              selectedItem={selectedItem}
              data={data}
              columns={columns}
              title={"Alerta de productos habilitadas"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar una nueva alerta */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Alerta
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
                    name='AltNomAle'
                    size='small'
                    id='nom'
                    label='Nombre de la Alerta'
                    fullWidth
                    autoFocus
                    required
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    error={error.desc}
                    helperText={message.desc}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='AltDescAle'
                    size='small'
                    id='desc'
                    label='Descripción de la Alerta'
                    fullWidth
                    autoFocus
                    required
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <InputBase fullWidth disabled />
                  <Button
                    aria-label={id}
                    variant='contained'
                    color='info'
                    onClick={openPicker}>
                    Seleccione un color
                  </Button>
                  <Popover
                    id={id}
                    open={opened}
                    anchorEl={open}
                    onClose={closePicker}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{
                      vertical: "left",
                      horizontal: "left",
                    }}>
                    <SketchPicker
                      error={error.color}
                      helperText={message.color}
                      id='color'
                      label='Color de la Alerta'
                      fullWidth
                      color={dataSelect.AltColorAle}
                      required
                      onChange={eventcolor}
                      onKeyUp={evalinput}
                    />
                  </Popover>
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
              Editar Alerta
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
                  <input type='hidden' name='AltId' value={dataSelect.AltId} />
                  <TextField
                    error={error.nom}
                    helperText={message.nom}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='AltNomAle'
                    size='small'
                    id='nom'
                    label='Nombre de la Alerta'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.AltNomAle}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    error={error.desc}
                    helperText={message.desc}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='AltDescAle'
                    size='small'
                    id='desc'
                    label='Descripción de la Alerta'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.AltDescAle}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <InputBase fullWidth disabled />
                  <Button
                    aria-label={id}
                    variant='contained'
                    color='info'
                    onClick={openPicker}>
                    Seleccione un color
                  </Button>
                  <Popover
                    id={id}
                    open={opened}
                    anchorEl={open}
                    onClose={closePicker}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{
                      vertical: "left",
                      horizontal: "left",
                    }}>
                    <SketchPicker
                      error={error.color}
                      helperText={message.color}
                      id='color'
                      label='Color de la Alerta'
                      fullWidth
                      color={dataSelect.AltColorAle}
                      required
                      onChange={eventcolor}
                      onKeyUp={evalinput}
                    />
                  </Popover>
                  <Button
                    size='lg'
                    aria-label='AltColorAle'
                    variant='contained'
                    style={{
                      background: dataSelect.AltColorAle,
                      float: "right",
                    }}></Button>
                  <InputBase fullWidth />
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
          {/* Modal que muestra los datos de la Alerta */}
          <Modal isOpen={showModalDetail} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Detalles Alerta
            </ModalHeader>
            <ModalBody>
              <input type='hidden' name='AltId' value={dataSelect.AltId} />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='AltNomAle'
                label='Nombre de la Alerta'
                fullWidth
                value={dataSelect.AltNomAle}
              />
              <InputBase fullWidth disabled />
              <label htmlFor='color'>Color de la Alerta</label>
              &nbsp; &nbsp;
              <Button
                disabled
                id='color'
                fullWidth
                size='lg'
                aria-label='AltColorAle'
                variant='contained'
                style={{ background: dataSelect.AltColorAle }}></Button>
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='AltDescAle'
                label='Descripción de la Alerta'
                fullWidth
                value={dataSelect.AltDescAle}
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
            title={"Guardar Alerta"}
            alertTitle={"¿Está seguro de crear el Alerta:"}
            alertText={dataSelect.AltNomAle}
            showModal={showModalSave}
            actionUser={(e) => newAlert(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar Alerta"}
            alertTitle={"¿Está seguro de actualizar la Alerta a:"}
            alertText={dataSelect.AltNomAle}
            showModal={showModalActual}
            actionUser={(e) => updateAlert(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar Alerta"}
            alertTitle={"¿Está seguro de eliminar la Alerta:"}
            alertText={dataSelect.AltNomAle}
            showModal={showModalDelete}
            actionUser={deleteAlert}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default AlertData;
