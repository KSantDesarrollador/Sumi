import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
  makeStyles,
  Grid,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  TextField,
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

const ServUrl = "http://localhost/SUMI/models/privilegeModel.php";

const PrivilegioData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [datalistSelectRol, setDatalistSelectRol] = useState([]);
  const [datalistSelectMenu, setDatalistSelectMenu] = useState([]);
  const [dataRol, setDataRol] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalActual, setShowModalActual] = useState(false);
  const [show, setShow] = useState("alertHide");
  const [type, setType] = useState("");
  const [alert, setAlert] = useState(null);
  const [dataSelect, setDataSelect] = useState({
    MxRId: "",
    RrlId: "",
    MnuId: "",
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

  const abrirCerrarModalDetail = () => {
    setShowModalDetail(!showModalDetail);
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    listRolName();
    listMenuName();
    setShowModalSave(!showModalSave);
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    listRolName();
    listMenuName();
    setShowModalActual(!showModalActual);
  };

  const abrirCerrarModalDelete = () => {
    listRolName();
    listMenuName();
    setShowModalDelete(!showModalDelete);
  };

  // limpiando los campos
  const clear = () => {
    setDataSelect(() => ({
      MxRId: "",
      RrlId: "",
      MnuId: "",
    }));
  };

  // obteniendo los datos de las cajas de texto
  const eventinput = (e) => {
    setDataSelect((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // obteniendo datos de un servidor
  const listPrivilegio = async () => {
    await axios
      .get(ServUrl)
      .then((response) => {
        setData(response.data);
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

  // llenando select rol
  const listRolName = async () => {
    await axios
      .get(ServUrl + "?rol=" + dataSelect.RrlId)
      .then((response) => {
        setDataRol(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select menú
  const listSelectMenu = async () => {
    await axios
      .get(ServUrl + "?menu=0")
      .then((response) => {
        setDatalistSelectMenu(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select menú
  const listMenuName = async () => {
    await axios
      .get(ServUrl + "?menu=" + dataSelect.MnuId)
      .then((response) => {
        setDataMenu(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    clear();
    listPrivilegio();
    listSelectRol();
    listSelectMenu();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newPrivilegio = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("RrlId", dataSelect.RrlId);
    f.append("MnuId", dataSelect.MnuId);
    f.append("METHOD", "POST");
    await axios
      .post(ServUrl, f)
      .then((response) => {
        listPrivilegio();
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
  const updatePrivilegio = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("RrlId", dataSelect.RrlId);
    f.append("MnuId", dataSelect.MnuId);
    f.append("METHOD", "PUT");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.MxRId } })
      .then((response) => {
        let newData = data;
        newData.map((info) => {
          if (info.MxRId === dataSelect.MxRId) {
            info.RrlId = dataSelect.RrlId;
            info.MnuId = dataSelect.MnuId;
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
  const deletePrivilegio = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.MxRId } })
      .then((response) => {
        setData(data.filter((priv) => priv.MxRId !== dataSelect.MxRId));
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
  const selectedItem = (priv, type) => {
    if (type === "Edit") {
      setDataSelect(priv);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(priv);
      abrirCerrarModalDetail();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "MxRId" },
    { title: "ROL", field: "RrlNomRol" },
    { title: "MENÚ", field: "MnuNomMen" },
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
              title={"Privilegios"}
              icon1={"zmdi zmdi-assignment"}
              icon2={"zmdi zmdi-plus"}
              type={type}
              alert={alert}
              show={show}
              changeState={changeState}
            />
          </Grid>
          &nbsp;
          <Grid container spacing={2}>
            {/* Tabla que muestra la información de los roles en bd */}
            <DataTable
              selectedItem={selectedItem}
              data={data}
              columns={columns}
              title={"Privilegios de usuario"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar un nuevo rol */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Privilegio
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
                      Rol contenedor
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Rol contenedor'
                      name='RrlId'
                      required
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
                  &nbsp;
                  <FormControl
                    size='small'
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Menú contenedor
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Menú contenedor'
                      name='MnuId'
                      required
                      inputProps={{
                        name: "MnuId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option key='1' aria-label='' value='' />
                      {datalistSelectMenu.map((item, index) => (
                        <option key={index} value={item.MnuId} label=''>
                          {item.MnuNomMen}
                        </option>
                      ))}
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
              Editar Privilegio
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
                  <input type='hidden' name='MxRId' value={dataSelect.MxRId} />
                  <FormControl
                    size='small'
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Rol contenedor
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Rol contenedor'
                      required
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
                        <option key={index} value={item.RrlId} label=''>
                          {item.RrlNomRol}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  &nbsp;
                  <FormControl
                    size='small'
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Menú contenedor
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Menú contenedor'
                      required
                      inputProps={{
                        name: "MnuId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='1'
                        label={dataSelect.MnuNomMen}
                        value={dataSelect.MnuId}
                      />
                      {datalistSelectMenu.map((item, index) => (
                        <option key={index} value={item.MnuId} label=''>
                          {item.MnuNomMen}
                        </option>
                      ))}
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
          <Modal isOpen={showModalDetail} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Detalles Privilegio
            </ModalHeader>
            <ModalBody>
              <input type='hidden' name='MxRId' value={dataSelect.MxRId} />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='RrlId'
                label='Nombre del Rol'
                fullWidth
                value={dataSelect.RrlNomRol}
              />
              &nbsp;
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='MnuId'
                label='Nombre del Menú'
                fullWidth
                value={dataSelect.MnuNomMen}
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
            title={"Guardar privilegio"}
            alertTitle={"¿Está seguro de asignar el privilegio:"}
            alertText={dataRol.RrlNomRol + "  a  " + dataMenu.MnuNomMen}
            showModal={showModalSave}
            actionUser={(e) => newPrivilegio(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar privilegio"}
            alertTitle={"¿Está seguro de asignar el privilegio:"}
            alertText={dataRol.RrlNomRol + "  a  " + dataMenu.MnuNomMen}
            showModal={showModalActual}
            actionUser={(e) => updatePrivilegio(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar privilegio"}
            alertTitle={"¿Está seguro de eliminar el privilegio:"}
            alertText={dataRol.RrlNomRol + "  a  " + dataMenu.MnuNomMen}
            showModal={showModalDelete}
            actionUser={deletePrivilegio}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default PrivilegioData;
