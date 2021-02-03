import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { makeStyles, Grid, TextField, Tooltip } from "@material-ui/core";
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
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalActual, setShowModalActual] = useState(false);
  const [show, setShow] = useState("alertHide");
  const [type, setType] = useState("");
  const [alert, setAlert] = useState(null);
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
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setShow("alertShow");
        setAlert("....Ops! Hubo un error al procesar la petición");
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
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setShow("alertShow");
        setAlert("....Ops! Hubo un error al procesar la petición");
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
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setShow("alertShow");
        setAlert("....Ops! Hubo un error al procesar la petición");
      });
  };

  // Esta función permite elegir el modal que se abrirá y guaerda los datos en el estado
  const selectedItem = (unit, type) => {
    setDataSelect(unit);
    if (type === "Edit") {
      abrirCerrarModalEdit();
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
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdIdentUdm'
                    size='small'
                    id='UmdIdentUdm'
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
                    name='UmdNomUdm'
                    size='small'
                    id='UmdNomUdm'
                    label='Nombre'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='telf'
                    name='UmdTelfUdm'
                    size='small'
                    id='UmdTelfUdm'
                    label='Teléfono'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdDirUdm'
                    size='small'
                    id='UmdDirUdm'
                    label='Dirección'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='email'
                    name='UmdEmailUdm'
                    size='small'
                    id='UmdEmailUdm'
                    label='Email'
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
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdIdentUdm'
                    size='small'
                    id='UmdIdentUdm'
                    label='Identificación'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.UmdIdentUdm}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdNomUdm'
                    size='small'
                    id='UmdNomUdm'
                    label='Nombre'
                    fullWidth
                    required
                    value={dataSelect.UmdNomUdm}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='telf'
                    name='UmdTelfUdm'
                    size='small'
                    id='UmdTelfUdm'
                    label='Teléfono'
                    fullWidth
                    required
                    value={dataSelect.UmdTelfUdm}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdDirUdm'
                    size='small'
                    id='UmdDirUdm'
                    label='Dirección'
                    fullWidth
                    required
                    value={dataSelect.UmdDirUdm}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='email'
                    name='UmdEmailUdm'
                    size='small'
                    id='UmdEmailUdm'
                    label='Email'
                    fullWidth
                    required
                    value={dataSelect.UmdEmailUdm}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='UmdEstUdm'
                    size='small'
                    id='UmdEstUdm'
                    label='Estado'
                    fullWidth
                    required
                    value={dataSelect.UmdEstUdm}
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
