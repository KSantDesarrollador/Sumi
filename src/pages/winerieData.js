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

const ServUrl = "http://localhost/SUMI/models/winerieModel.php";

const WinerieData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [datalistSelectUnity, setDatalistSelectUnity] = useState([]);
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
    cod: "",
    dir: "",
    nom: "",
    telf: "",
  });
  const [error, setError] = useState({
    cod: false,
    dir: false,
    nom: false,
    telf: false,
  });
  const [dataSelect, setDataSelect] = useState({
    BdgId: "",
    UmdId: "",
    UmdNomUdm: "",
    BdgCodBod: "",
    BdgDescBod: "",
    BdgTelfBod: "",
    BdgDirBod: "",
    BdgEstBod: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({
      cod: false,
      dir: false,
      nom: false,
      telf: false,
    });
    setMessage({
      cod: "",
      dir: "",
      nom: "",
      telf: "",
    });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({
      cod: false,
      dir: false,
      nom: false,
      telf: false,
    });
    setMessage({
      cod: "",
      dir: "",
      nom: "",
      telf: "",
    });
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    if (
      error.cod === false &&
      error.nom === false &&
      error.dir === false &&
      error.telf === false
    ) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    if (
      error.cod === false &&
      error.nom === false &&
      error.dir === false &&
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
      BdgId: "",
      UmdId: "",
      UmdNomUdm: "",
      BdgCodBod: "",
      BdgDescBod: "",
      BdgTelfBod: "",
      BdgDirBod: "",
      BdgEstBod: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      code: /^[a-zA-Z0-9]{6,10}$/,
      mix2: /^[a-zA-Z0-9_\-. ]{1,60}$/,
      telf: /^[0-9]{7,10}$/,
    };

    if (fieldName === "cod") {
      if (expressions.code.test(dataSelect.BdgCodBod)) {
        setError((prevState) => ({
          ...prevState,
          cod: false,
        }));
        setMessage((prevState) => ({ ...prevState, cod: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          cod: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          cod:
            "No se permiten caracteres especiales con mínimo 6 y máximo 10 caracteres ",
        }));
      }
    } else if (fieldName === "nom") {
      if (expressions.mix2.test(dataSelect.BdgDescBod)) {
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
      if (expressions.telf.test(dataSelect.BdgTelfBod)) {
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
    } else if (fieldName === "dir") {
      if (expressions.mix2.test(dataSelect.BdgDirBod)) {
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
  const listWinerie = async () => {
    await axios
      .get(ServUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select unidad
  const listSelectUnity = async () => {
    await axios
      .get(ServUrl + "?uni=0")
      .then((response) => {
        setDatalistSelectUnity(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    clear();
    listWinerie();
    listSelectUnity();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newWinerie = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("UmdId", dataSelect.UmdId);
    f.append("BdgCodBod", dataSelect.BdgCodBod);
    f.append("BdgDescBod", dataSelect.BdgDescBod);
    f.append("BdgTelfBod", dataSelect.BdgTelfBod);
    f.append("BdgDirBod", dataSelect.BdgDirBod);
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
  const updateWinerie = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("UmdId", dataSelect.UmdId);
    f.append("BdgCodBod", dataSelect.BdgCodBod);
    f.append("BdgDescBod", dataSelect.BdgDescBod);
    f.append("BdgTelfBod", dataSelect.BdgTelfBod);
    f.append("BdgDirBod", dataSelect.BdgDirBod);
    f.append("BdgEstBod", dataSelect.BdgEstBod);
    f.append("METHOD", "PUT");
    await axios
      .post(
        ServUrl,
        f,
        { params: { id: dataSelect.BdgId } },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.log(response.data);
        let newData = data;
        newData.map((info) => {
          if (info.BdgId === dataSelect.BdgId) {
            info.UmdId = dataSelect.UmdId;
            info.BdgCodBod = dataSelect.BdgCodBod;
            info.BdgDescBod = dataSelect.BdgDescBod;
            info.BdgTelfBod = dataSelect.BdgTelfBod;
            info.BdgDirBod = dataSelect.BdgDirBod;
            info.BdgEstBod = dataSelect.BdgEstBod;
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
  const deleteWinerie = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.BdgId } })
      .then((response) => {
        setData(data.filter((win) => win.BdgId !== dataSelect.BdgId));
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
  const selectedItem = (win, type) => {
    if (type === "Edit") {
      setDataSelect(win);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(win);
      abrirCerrarModalDetail();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "BdgId" },
    { title: "UNIDAD.MED", field: "UmdNomUdm" },
    { title: "CODIGO", field: "BdgCodBod" },
    { title: "NOMBRE", field: "BdgDescBod" },
    { title: "TELF", field: "BdgTelfBod" },
  ];

  const status = dataSelect.BdgEstBod === "A" ? "Activo" : "Inactivo";

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
              title={"Bodegas"}
              icon1={"zmdi zmdi-store"}
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
              title={"Bodegas habilitados en el sistema"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar una nueva bodega */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Bodega
            </ModalHeader>
            <ModalBody>
              <div>
                <form
                  id='formNewData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalSave(e)}>
                  <FormControl size='small' variant='outlined' fullWidth>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Unidad contenedor
                    </InputLabel>
                    <Select
                      native
                      required
                      onChange={eventinput}
                      label='Unidad contenedor'
                      inputProps={{
                        name: "UmdId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option key='0' aria-label='' value='' />
                      {datalistSelectUnity.map((item, index) => (
                        <option key={index} value={item.UmdId} label=''>
                          {item.UmdNomUdm}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    error={error.cod}
                    helperText={message.cod}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='BdgCodBod'
                    size='small'
                    id='cod'
                    label='Código'
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
                    name='BdgDescBod'
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
                    name='BdgTelfBod'
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
                    name='BdgDirBod'
                    size='small'
                    id='dir'
                    label='Dirección'
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
          {/* Modal que muestra los datos de la bodega a ser editado */}
          <Modal isOpen={showModalEdit} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Editar Bodega
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
                  <input type='hidden' name='UmdId' value={dataSelect.UmdId} />
                  <FormControl size='small' variant='outlined' fullWidth>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Unidad contenedor
                    </InputLabel>
                    <Select
                      native
                      required
                      onChange={eventinput}
                      label='Unidad contenedor'
                      inputProps={{
                        name: "UmdId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={dataSelect.UmdNomUdm}
                        value={dataSelect.UmdId}
                      />
                      {datalistSelectUnity.map((item, index) => (
                        <option
                          key={index}
                          value={item.UmdId}
                          label={item.UmdNomUdm}
                        />
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    error={error.cod}
                    helperText={message.cod}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='BdgCodBod'
                    size='small'
                    id='cod'
                    label='Código'
                    fullWidth
                    autoFocus
                    value={dataSelect.BdgCodBod}
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
                    name='BdgDescBod'
                    size='small'
                    id='nom'
                    label='Nombre'
                    fullWidth
                    value={dataSelect.BdgDescBod}
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
                    name='BdgTelfBod'
                    size='small'
                    id='telf'
                    label='Teléfono'
                    fullWidth
                    value={dataSelect.BdgTelfBod}
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
                    name='BdgDirBod'
                    size='small'
                    id='dir'
                    label='Dirección'
                    fullWidth
                    value={dataSelect.BdgDirBod}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  &nbsp;
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
                        name: "BdgEstBod",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={status}
                        value={dataSelect.BdgEstBod}
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
          {/* Modal que muestra los datos de la bodega */}
          <Modal isOpen={showModalDetail} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Detalles Bodega
            </ModalHeader>
            <ModalBody>
              <input type='hidden' name='BdgId' value={dataSelect.BdgId} />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='nom'
                label='Unidad médica'
                fullWidth
                value={dataSelect.UmdNomUdm}
              />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='cod'
                label='Código'
                fullWidth
                value={dataSelect.BdgCodBod}
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
                value={dataSelect.BdgDescBod}
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
                value={dataSelect.BdgTelfBod}
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
                value={dataSelect.BdgDirBod}
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
            title={"Guardar Bodega"}
            alertTitle={"¿Está seguro de crear la Bodega:"}
            alertText={dataSelect.BdgDescBod}
            showModal={showModalSave}
            actionUser={(e) => newWinerie(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar Bodega"}
            alertTitle={"¿Está seguro de actualizar la Bodega:"}
            alertText={dataSelect.BdgDescBod}
            showModal={showModalActual}
            actionUser={(e) => updateWinerie(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar Bodega"}
            alertTitle={"¿Está seguro de eliminar la Bodega:"}
            alertText={dataSelect.BdgDescBod}
            showModal={showModalDelete}
            actionUser={deleteWinerie}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default WinerieData;
