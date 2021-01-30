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

const ServUrl = "http://localhost/SUMI/models/providerModel.php";

const ProviderData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalActual, setShowModalActual] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [type, setType] = useState("");
  const [alert, setAlert] = useState(null);
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
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    setShowModalSave(!showModalSave);
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    setShowModalActual(!showModalActual);
  };

  const abrirCerrarModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  // seleccionando el tipo
  const providerType = () => {
    if (dataSelect.PvdTipProv === "N") {
      setDataType("Natural");
    } else {
      setDataType("Jurídico");
    }
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
        setAlert("Registro creado correctamente");
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setAlert("....Ops! Hubo un error al procesar la petición");
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
        setAlert("Registro actualizado correctamente");
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setAlert("....Ops! Hubo un error al procesar la petición");
      });
  };

  // Esta función elimina los datos del rol seleccionado
  const deleteProvider = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.PvdId } })
      .then((response) => {
        setData(data.filter((user) => user.PvdId !== dataSelect.PvdId));
        abrirCerrarModalDelete();
        setType("success");
        setAlert("Registro eliminado correctamente");
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setAlert("....Ops! Hubo un error al procesar la petición");
      });
  };

  // Esta función permite elegir el modal que se abrirá y guaerda los datos en el estado
  const selectedItem = (prov, type) => {
    setDataSelect(prov);
    providerType();
    if (type === "Edit") {
      abrirCerrarModalEdit();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "PvdId" },
    { title: "RUC", field: "PvdIdentProv" },
    { title: "NOMBRE", field: "PvdRazSocProv" },
    { title: "DIRECCIÓN", field: "PvdDirProv" },
    { title: "TELF", field: "PvdTelfProv" },
    { title: "EMAIL", field: "PvdEmailProv" },
    { title: "ESTADO", field: "PvdEstProv" },
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
              title={"Proveedores"}
              icon1={"zmdi zmdi-truck"}
              icon2={"zmdi zmdi-plus"}
              type={type}
              alert={alert}
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
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdIdentProv'
                    size='small'
                    id='PvdIdentProv'
                    label='Identificación'
                    fullWidth
                    autoFocus
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdRazSocProv'
                    size='small'
                    id='PvdRazSocProv'
                    label='Razón Social'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='telf'
                    name='PvdTelfProv'
                    size='small'
                    id='PvdTelfProv'
                    label='Teléfono'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdDirProv'
                    size='small'
                    id='PvdDirProv'
                    label='Dirección'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='email'
                    name='PvdEmailProv'
                    size='small'
                    id='PvdEmailProv'
                    label='Email'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdPerContProv'
                    size='small'
                    id='PvdPerContProv'
                    label='Persona de contacto'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdCarContProv'
                    size='small'
                    id='PvdCarContProv'
                    label='Cargo del contacto'
                    fullWidth
                    required
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
                        label={dataType}
                        value={dataSelect.PvdTipProv}
                      />
                      <option key='1' value='N' label='Natural' />
                      <option key='2' value='J' label='Jurídico' />
                    </Select>
                  </FormControl>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdIdentProv'
                    size='small'
                    id='PvdIdentProv'
                    label='Identificación'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.PvdIdentProv}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdRazSocProv'
                    size='small'
                    id='PvdRazSocProv'
                    label='Razón Social'
                    fullWidth
                    required
                    value={dataSelect.PvdRazSocProv}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='telf'
                    name='PvdTelfProv'
                    size='small'
                    id='PvdTelfProv'
                    label='Teléfono'
                    fullWidth
                    required
                    value={dataSelect.PvdTelfProv}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdDirProv'
                    size='small'
                    id='PvdDirProv'
                    label='Dirección'
                    fullWidth
                    required
                    value={dataSelect.PvdDirProv}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='email'
                    name='PvdEmailProv'
                    size='small'
                    id='PvdEmailProv'
                    label='Email'
                    fullWidth
                    required
                    value={dataSelect.PvdEmailProv}
                    onChange={eventinput}
                  />
                  <TextField
                    className={classList.file}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdPerContProv'
                    size='small'
                    id='PvdPerContProv'
                    label='Persona de contacto'
                    fullWidth
                    required
                    value={dataSelect.PvdPerContProv}
                    onChange={eventinput}
                  />
                  <TextField
                    className={classList.file}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdCarContProv'
                    size='small'
                    id='PvdCarContProv'
                    label='Cargo del contacto'
                    fullWidth
                    required
                    value={dataSelect.PvdCarContProv}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='PvdEstProv'
                    size='small'
                    id='PvdEstProv'
                    label='Estado'
                    fullWidth
                    required
                    value={dataSelect.PvdEstProv}
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
