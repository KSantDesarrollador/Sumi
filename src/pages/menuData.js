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
  iconPge: {
    color: "black",
    width: "40px",
    height: "40px",
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

const ServUrl = "http://localhost/SUMI/models/menuModel.php";

const MenuData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [datalistSelect, setDatalistSelect] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalActual, setShowModalActual] = useState(false);
  const [type, setType] = useState("");
  const [alert, setAlert] = useState(null);
  const [dataSelect, setDataSelect] = useState({
    MnuId: "",
    MnuJerqMen: "",
    Jerarquia: "",
    MnuNomMen: "",
    MnuNivelMen: "",
    MnuIconMen: "",
    MnuUrlMen: "",
    MnuLeyendMen: "",
    MnuEstMen: "",
  });

  const changeState = () => {
    setAlert(null);
  };

  const [jerqSelect, setJerqSelect] = useState({
    MnuId: "",
    MnuNomMen: "",
  });
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
  const listMenu = async () => {
    await axios
      .get(ServUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select
  const listSelect = async () => {
    await axios
      .get(ServUrl + "?sel=0")
      .then((response) => {
        setDatalistSelect(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    listMenu();
    listSelect();
  }, []);

  // obteniendo datos de un servidor
  const listJerarquia = async () => {
    await axios
      .get(ServUrl + "?jer=" + dataSelect.MnuJerqMen)
      .then((response) => {
        setJerqSelect(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función guarda los datos de un nuevo rol
  const newMenu = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("MnuJerqMen", dataSelect.MnuJerqMen);
    f.append("MnuNomMen", dataSelect.MnuNomMen);
    f.append("MnuNivelMen", dataSelect.MnuNivelMen);
    f.append("MnuIconMen", dataSelect.MnuIconMen);
    f.append("MnuUrlMen", dataSelect.MnuUrlMen);
    f.append("MnuLeyendMen", dataSelect.MnuLeyendMen);
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
  const updateMenu = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("MnuJerqMen", dataSelect.MnuJerqMen);
    f.append("MnuNomMen", dataSelect.MnuNomMen);
    f.append("MnuNivelMen", dataSelect.MnuNivelMen);
    f.append("MnuIconMen", dataSelect.MnuIconMen);
    f.append("MnuUrlMen", dataSelect.MnuUrlMen);
    f.append("MnuLeyendMen", dataSelect.MnuLeyendMen);
    f.append("MnuEstMen", dataSelect.MnuEstMen);
    f.append("METHOD", "PUT");
    await axios
      .post(
        ServUrl,
        f,
        { params: { id: dataSelect.MnuId } },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        let newData = data;
        newData.map((info) => {
          if (info.MnuId === dataSelect.MnuId) {
            info.MnuJerqMen = dataSelect.MnuJerqMen;
            info.Jerarquia = dataSelect.Jerarquia;
            info.MnuNomMen = dataSelect.MnuNomMen;
            info.MnuNivelMen = dataSelect.MnuNivelMen;
            info.MnuIconMen = dataSelect.MnuIconMen;
            info.MnuUrlMen = dataSelect.MnuUrlMen;
            info.MnuLeyendMen = dataSelect.MnuLeyendMen;
            info.MnuEstMen = dataSelect.MnuEstMen;
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
  const deleteMenu = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.MnuId } })
      .then((response) => {
        setData(data.filter((menu) => menu.MnuId !== dataSelect.MnuId));
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
  const selectedItem = (menu, type) => {
    setDataSelect(menu);
    if (type === "Edit") {
      listJerarquia();
      abrirCerrarModalEdit();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "MnuId" },
    { title: "PADRE", field: "MnuJerqMen" },
    { title: "NOMBRE", field: "MnuNomMen" },
    { title: "NIVEL", field: "MnuNivelMen" },
    { title: "ICONO", field: "MnuIconMen" },
    { title: "URL", field: "MnuUrlMen" },
    { title: "ESTADO", field: "MnuEstMen" },
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
              title={"Menús"}
              icon1={"zmdi zmdi-menu"}
              icon2={"zmdi zmdi-plus"}
              type={type}
              alert={alert}
              changeState={changeState}
            />
          </Grid>
          &nbsp;
          <Grid container spacing={2}>
            {/* Tabla que muestra la información de los menús en bd */}
            <DataTable
              selectedItem={selectedItem}
              data={data}
              columns={columns}
              title={"Menús habilitados en el sistema"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar un nuevo rol */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Menú
            </ModalHeader>
            <ModalBody>
              <div>
                <form
                  id='formNewData'
                  encType='multipart/form-data'
                  onSubmit={(e) => newMenu(e)}>
                  <FormControl
                    size='small'
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Menú contenedor
                    </InputLabel>
                    <Select
                      native
                      value={dataSelect.MnuJerqMen}
                      onChange={eventinput}
                      label='Menú contenedor'
                      required
                      inputProps={{
                        name: "MnuJerqMen",
                        id: "outlined-age-native-simple",
                      }}>
                      <option key='0' aria-label='' value='' />
                      {datalistSelect.map((item, index) => (
                        <option key={index} value={item.MnuId} label=''>
                          {item.MnuNomMen}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuNomMen'
                    size='small'
                    id='MnuNomMen'
                    label='Nombre del menú'
                    fullWidth
                    autoFocus
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='number'
                    name='MnuNivelMen'
                    size='small'
                    id='MnuNivelMen'
                    label='Nivel'
                    minimum='0'
                    maximum='1'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuIconMen'
                    size='small'
                    id='MnuIconMen'
                    label='Icono'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuUrlMen'
                    size='small'
                    id='MnuUrlMen'
                    label='Url'
                    fullWidth
                    required
                    onChange={eventinput}
                  />
                  <TextField
                    className={classList.file}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuLeyendMen'
                    size='small'
                    id='MnuLeyendMen'
                    label='Leyenda'
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
              Editar Menú
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => updateMenu(e)}>
                  <input type='hidden' name='MnuId' value={dataSelect.MnuId} />
                  <FormControl
                    size='small'
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Menú contenedor
                    </InputLabel>
                    <Select
                      native
                      value={dataSelect.MnuJerqMen}
                      onChange={eventinput}
                      label='Menú contenedor'
                      inputProps={{
                        name: "MnuJerqMen",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        label={jerqSelect.MnuNomMen}
                        value={jerqSelect.MnuId}
                      />
                      {datalistSelect.map((item, index) => (
                        <option key={index} value={item.MnuId} label=''>
                          {item.MnuNomMen}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuNomMen'
                    size='small'
                    id='MnuNomMen'
                    label='Nombre del menú'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.MnuNomMen}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='number'
                    name='MnuNivelMen'
                    size='small'
                    id='MnuNivelMen'
                    label='Nivel'
                    fullWidth
                    required
                    value={dataSelect.MnuNivelMen}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuIconMen'
                    size='small'
                    id='MnuIconMen'
                    label='Icono'
                    fullWidth
                    required
                    value={dataSelect.MnuIconMen}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuUrlMen'
                    size='small'
                    id='MnuUrlMen'
                    label='Url'
                    fullWidth
                    value={dataSelect.MnuUrlMen}
                    onChange={eventinput}
                  />
                  <TextField
                    className={classList.file}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuLeyendMen'
                    size='small'
                    id='MnuLeyendMen'
                    label='Leyenda'
                    fullWidth
                    required
                    value={dataSelect.MnuLeyendMen}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuEstMen'
                    size='small'
                    id='MnuEstMen'
                    label='Estado'
                    fullWidth
                    required
                    value={dataSelect.MnuEstMen}
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
            title={"Guardar menú"}
            alertTitle={"¿Está seguro de crear el menú:"}
            alertText={dataSelect.MnuNomMen}
            showModal={showModalSave}
            actionUser={(e) => newMenu(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar menú"}
            alertTitle={"¿Está seguro de actualizar el menú a:"}
            alertText={dataSelect.MnuNomMen}
            showModal={showModalActual}
            actionUser={(e) => updateMenu(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar menú"}
            alertTitle={"¿Está seguro de eliminar el menú:"}
            alertText={dataSelect.MnuNomMen}
            showModal={showModalDelete}
            actionUser={deleteMenu}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default MenuData;
