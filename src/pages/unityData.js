import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
  makeStyles,
  Grid,
  TextField,
  Tooltip,
  InputLabel,
  FormControl,
  Select,
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

const ServUrl = "http://localhost/SUMI/models/medicUnitModel.php";

const UnityData = () => {
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
    ident: "",
    dir: "",
    email: "",
    telf: "",
  });
  const [error, setError] = useState({
    nom: false,
    ident: false,
    dir: false,
    email: false,
    telf: false,
  });
  const [dataSelect, setDataSelect] = useState({
    UmdId: "",
    UmdIdentUdm: "",
    UmdNomUdm: "",
    UmdTelfUdm: "",
    UmdDirUdm: "",
    UmdEmailUdm: "",
    UmdEstUdm: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({
      nom: false,
      ident: false,
      dir: false,
      email: false,
      telf: false,
    });
    setMessage({
      nom: "",
      ident: "",
      dir: "",
      email: "",
      telf: "",
    });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({
      nom: false,
      ident: false,
      dir: false,
      email: false,
      telf: false,
    });
    setMessage({
      nom: "",
      ident: "",
      dir: "",
      email: "",
      telf: "",
    });
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    if (
      error.nom === false &&
      error.ident === false &&
      error.dir === false &&
      error.email === false &&
      error.telf === false
    ) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    if (
      error.nom === false &&
      error.ident === false &&
      error.dir === false &&
      error.email === false &&
      error.telf === false
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
      UmdId: "",
      UmdIdentUdm: "",
      UmdNomUdm: "",
      UmdTelfUdm: "",
      UmdDirUdm: "",
      UmdEmailUdm: "",
      UmdEstUdm: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      ident: /^[0-9]{10,13}$/,
      mix2: /^[a-zA-Z0-9_\-. ]{1,60}$/,
      email: /^[a-zA-Z0-9_\-.]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]{3,6}$/,
      telf: /^[0-9]{7,10}$/,
    };

    if (fieldName === "ident") {
      if (expressions.ident.test(dataSelect.UmdIdentUdm)) {
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
    } else if (fieldName === "nom") {
      if (expressions.mix2.test(dataSelect.UmdNomUdm)) {
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
          nom:
            " no permitidos caracteres especiales, con un máximo 60 caracteres",
        }));
      }
    } else if (fieldName === "telf") {
      if (expressions.telf.test(dataSelect.UmdTelfUdm)) {
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
      if (expressions.email.test(dataSelect.UmdEmailUdm)) {
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
      if (expressions.mix2.test(dataSelect.UmdDirUdm)) {
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
  const listUnity = async () => {
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
    listUnity();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newUnity = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("UmdIdentUdm", dataSelect.UmdIdentUdm);
    f.append("UmdNomUdm", dataSelect.UmdNomUdm);
    f.append("UmdTelfUdm", dataSelect.UmdTelfUdm);
    f.append("UmdDirUdm", dataSelect.UmdDirUdm);
    f.append("UmdEmailUdm", dataSelect.UmdEmailUdm);
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
  const updateUnity = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("UmdIdentUdm", dataSelect.UmdIdentUdm);
    f.append("UmdNomUdm", dataSelect.UmdNomUdm);
    f.append("UmdTelfUdm", dataSelect.UmdTelfUdm);
    f.append("UmdDirUdm", dataSelect.UmdDirUdm);
    f.append("UmdEmailUdm", dataSelect.UmdEmailUdm);
    f.append("UmdEstUdm", dataSelect.UmdEstUdm);
    f.append("METHOD", "PUT");
    await axios
      .post(
        ServUrl,
        f,
        { params: { id: dataSelect.UmdId } },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.log(response.data);
        let newData = data;
        newData.map((info) => {
          if (info.UmdId === dataSelect.UmdId) {
            info.UmdIdentUdm = dataSelect.UmdIdentUdm;
            info.UmdNomUdm = dataSelect.UmdNomUdm;
            info.UmdTelfUdm = dataSelect.UmdTelfUdm;
            info.UmdDirUdm = dataSelect.UmdDirUdm;
            info.UmdEmailUdm = dataSelect.UmdEmailUdm;
            info.UmdEstUdm = dataSelect.UmdEstUdm;
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
  const deleteUnity = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.UmdId } })
      .then((response) => {
        setData(data.filter((unit) => unit.UmdId !== dataSelect.UmdId));
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
  const selectedItem = (unit, type) => {
    if (type === "Edit") {
      setDataSelect(unit);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(unit);
      abrirCerrarModalDetail();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "UmdId" },
    { title: "RUC", field: "UmdIdentUdm" },
    { title: "NOMBRE", field: "UmdNomUdm" },
    { title: "TELF", field: "UmdTelfUdm" },
    { title: "EMAIL", field: "UmdEmailUdm" },
  ];

  const status = dataSelect.UmdEstUdm === "A" ? "Activo" : "Inactivo";

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
              title={"Unidades"}
              icon1={"zmdi zmdi-home"}
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
              title={"Unidades habilitados en el sistema"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar un nuevo rol */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Unidad
            </ModalHeader>
            <ModalBody>
              <div>
                <form
                  id='formNewData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalSave(e)}>
                  <TextField
                    required
                    error={error.ident}
                    helperText={message.ident}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdIdentUdm'
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
                    error={error.nom}
                    helperText={message.nom}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdNomUdm'
                    size='small'
                    id='nom'
                    label='Nombre'
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
                    name='UmdTelfUdm'
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
                    name='UmdDirUdm'
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
                    name='UmdEmailUdm'
                    size='small'
                    id='email'
                    label='Email'
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
          {/* Modal que muestra los datos de la unidad a ser editado */}
          <Modal isOpen={showModalEdit} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Editar Unidad
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
                  <input type='hidden' name='UmdId' value={dataSelect.UmdId} />
                  <TextField
                    required
                    error={error.ident}
                    helperText={message.ident}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdIdentUdm'
                    size='small'
                    id='ident'
                    label='Identificación'
                    fullWidth
                    autoFocus
                    value={dataSelect.UmdIdentUdm}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.nom}
                    helperText={message.nom}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdNomUdm'
                    size='small'
                    id='nom'
                    label='Nombre'
                    fullWidth
                    value={dataSelect.UmdNomUdm}
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
                    name='UmdTelfUdm'
                    size='small'
                    id='telf'
                    label='Teléfono'
                    fullWidth
                    value={dataSelect.UmdTelfUdm}
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
                    name='UmdDirUdm'
                    size='small'
                    id='dir'
                    label='Dirección'
                    fullWidth
                    value={dataSelect.UmdDirUdm}
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
                    name='UmdEmailUdm'
                    size='small'
                    id='email'
                    label='Email'
                    fullWidth
                    value={dataSelect.UmdEmailUdm}
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
                        name: "UmdEstUdm",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={status}
                        value={dataSelect.UmdEstUdm}
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
          {/* Modal que muestra los datos de la unidad */}
          <Modal isOpen={showModalDetail} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Editar Unidad
            </ModalHeader>
            <ModalBody>
              <input type='hidden' name='UmdId' value={dataSelect.UmdId} />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='ident'
                label='Identificación'
                fullWidth
                value={dataSelect.UmdIdentUdm}
              />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='nom'
                label='Nombre'
                fullWidth
                value={dataSelect.UmdNomUdm}
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
                value={dataSelect.UmdTelfUdm}
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
                value={dataSelect.UmdDirUdm}
              />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='email'
                size='small'
                id='email'
                label='Email'
                fullWidth
                value={dataSelect.UmdEmailUdm}
              />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='estado'
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
            title={"Guardar Unidad"}
            alertTitle={"¿Está seguro de crear la Unidad:"}
            alertText={dataSelect.UmdNomUdm}
            showModal={showModalSave}
            actionUser={(e) => newUnity(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar Unidad"}
            alertTitle={"¿Está seguro de actualizar la Unidad:"}
            alertText={dataSelect.UmdNomUdm}
            showModal={showModalActual}
            actionUser={(e) => updateUnity(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar Unidad"}
            alertTitle={"¿Está seguro de eliminar la Unidad:"}
            alertText={dataSelect.UmdNomUdm}
            showModal={showModalDelete}
            actionUser={deleteUnity}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default UnityData;
