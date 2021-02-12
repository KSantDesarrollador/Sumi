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

const ServUrl = "http://localhost/SUMI/models/menuModel.php";

const MenuData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [datalistSelect, setDatalistSelect] = useState([]);
  const [jerqSelect, setJerqSelect] = useState([]);
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
    niv: "",
    icon: "",
    url: "",
    ley: "",
  });
  const [error, setError] = useState({
    nom: false,
    niv: false,
    icon: false,
    url: false,
    ley: false,
  });
  const [dataSelect, setDataSelect] = useState({
    MnuId: "",
    MnuJerqMen: "",
    MnuNomMen: "",
    MnuNivelMen: "",
    MnuIconMen: "",
    MnuUrlMen: "",
    MnuLeyendMen: "",
    MnuEstMen: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({
      nom: false,
      niv: false,
      icon: false,
      url: false,
      ley: false,
    });
    setMessage({
      nom: "",
      niv: "",
      icon: "",
      url: "",
      ley: "",
    });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({
      nom: false,
      niv: false,
      icon: false,
      url: false,
      ley: false,
    });
    setMessage({
      nom: "",
      niv: "",
      icon: "",
      url: "",
      ley: "",
    });
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    if (
      error.nom === false &&
      error.niv === false &&
      error.icon === false &&
      error.url === false &&
      error.ley === false
    ) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    if (
      error.nom === false &&
      error.niv === false &&
      error.icon === false &&
      error.url === false &&
      error.ley === false
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
      MnuId: "",
      MnuJerqMen: "",
      MnuNomMen: "",
      MnuNivelMen: "",
      MnuIconMen: "",
      MnuUrlMen: "",
      MnuLeyendMen: "",
      MnuEstMen: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      nom: /^[a-zA-ZA-ý\s]{1,40}$/,
      text: /^[a-zA-z/\-. ]{4,50}$/,
      num: /^[0-9]{0,3}$/,
    };

    if (fieldName === "nom") {
      if (expressions.nom.test(dataSelect.MnuNomMen)) {
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
          nom: "solo se permiten letras con un máximo 40 caracteres ",
        }));
      }
    } else if (fieldName === "niv") {
      if (expressions.num.test(dataSelect.MnuNivelMen)) {
        setError((prevState) => ({
          ...prevState,
          niv: false,
        }));
        setMessage((prevState) => ({ ...prevState, niv: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          niv: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          niv: " solo se permiten números enter 0 y 3",
        }));
      }
    } else if (fieldName === "icon") {
      if (expressions.text.test(dataSelect.MnuIconMen)) {
        setError((prevState) => ({
          ...prevState,
          icon: false,
        }));
        setMessage((prevState) => ({ ...prevState, icon: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          icon: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          icon:
            "permitidos letras y Guión medio con mínimo 4 y máximo 10 caracteres",
        }));
      }
    } else if (fieldName === "url") {
      if (expressions.text.test(dataSelect.MnuUrlMen)) {
        setError((prevState) => ({
          ...prevState,
          url: false,
        }));
        setMessage((prevState) => ({ ...prevState, url: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          url: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          url: "permitidos letras y slash con mínimo 4 y máximo 10 caracteres",
        }));
      }
    } else if (fieldName === "ley") {
      if (expressions.nom.test(dataSelect.MnuLeyendMen)) {
        setError((prevState) => ({
          ...prevState,
          ley: false,
        }));
        setMessage((prevState) => ({ ...prevState, ley: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          ley: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          ley: "solo se permiten letras con un máximo 40 caracteres ",
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
    clear();
    listMenu();
    listSelect();
  }, []);

  // obteniendo datos de un servidor
  const listJerarquia = async (jer) => {
    console.log(jer);
    await axios
      .get(ServUrl + "?jer=" + jer)
      .then((response) => {
        setJerqSelect(response.data);
        console.log(response.data);
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
  const deleteMenu = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.MnuId } })
      .then((response) => {
        setData(data.filter((menu) => menu.MnuId !== dataSelect.MnuId));
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
  const selectedItem = (menu, type) => {
    if (type === "Edit") {
      setDataSelect(menu);
      listJerarquia(menu.MnuJerqMen);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(menu);
      listJerarquia(menu.MnuJerqMen);
      abrirCerrarModalDetail();
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
  ];

  const status = dataSelect.MnuEstMen === "A" ? "Activo" : "Inactivo";

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
              title={"Menús"}
              icon1={"zmdi zmdi-menu"}
              icon2={"zmdi zmdi-plus"}
              type={type}
              alert={alert}
              show={show}
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
              dataTree={"menu"}
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
                  onSubmit={(e) => abrirCerrarModalSave(e)}>
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
                    required
                    error={error.nom}
                    helperText={message.nom}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuNomMen'
                    size='small'
                    id='nom'
                    label='Nombre del menú'
                    fullWidth
                    autoFocus
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.niv}
                    helperText={message.niv}
                    variant='outlined'
                    margin='normal'
                    type='number'
                    name='MnuNivelMen'
                    size='small'
                    id='niv'
                    label='Nivel'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.icon}
                    helperText={message.icon}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuIconMen'
                    size='small'
                    id='icon'
                    label='Icono'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.url}
                    helperText={message.url}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuUrlMen'
                    size='small'
                    id='url'
                    label='Url'
                    fullWidth
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.ley}
                    helperText={message.ley}
                    className={classList.file}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuLeyendMen'
                    size='small'
                    id='ley'
                    label='Leyenda'
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
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
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
                      onChange={eventinput}
                      label='Menú contenedor'
                      inputProps={{
                        name: "MnuJerqMen",
                        id: "outlined-age-native-simple",
                      }}>
                      {jerqSelect.map((item, index) => {
                        if (dataSelect.MnuJerqMen !== 0) {
                          return (
                            <option
                              key={index}
                              label={item.MnuNomMen}
                              value={item.MnuId}
                            />
                          );
                        } else {
                          return <option key='0' aria-label='' value='' />;
                        }
                      })}
                      {datalistSelect.map((item, index) => (
                        <option key={index} value={item.MnuId} label=''>
                          {item.MnuNomMen}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    error={error.nom}
                    helperText={message.nom}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuNomMen'
                    size='small'
                    id='nom'
                    label='Nombre del menú'
                    fullWidth
                    autoFocus
                    value={dataSelect.MnuNomMen}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.niv}
                    helperText={message.niv}
                    variant='outlined'
                    margin='normal'
                    type='number'
                    name='MnuNivelMen'
                    size='small'
                    id='niv'
                    label='Nivel'
                    fullWidth
                    value={dataSelect.MnuNivelMen}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.icon}
                    helperText={message.icon}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuIconMen'
                    size='small'
                    id='icon'
                    label='Icono'
                    fullWidth
                    value={dataSelect.MnuIconMen}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.url}
                    helperText={message.url}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuUrlMen'
                    size='small'
                    id='url'
                    label='Url'
                    fullWidth
                    value={dataSelect.MnuUrlMen}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    required
                    error={error.ley}
                    helperText={message.ley}
                    className={classList.file}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='MnuLeyendMen'
                    size='small'
                    id='ley'
                    label='Leyenda'
                    fullWidth
                    value={dataSelect.MnuLeyendMen}
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
                        name: "MnuEstMen",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={status}
                        value={dataSelect.MnuEstMen}
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
          {/* Modal que muestra los datos del rol a ser editado */}
          <Modal isOpen={showModalDetail} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Detalles Menú
            </ModalHeader>
            <ModalBody>
              <TextField
                variant='outlined'
                margin='normal'
                type='text'
                size='small'
                id='jerq'
                label='Jerarquía'
                fullWidth
                // value={item.MnuNomMen}
              />
              <TextField
                variant='outlined'
                margin='normal'
                type='text'
                size='small'
                id='nom'
                label='Nombre del menú'
                fullWidth
                value={dataSelect.MnuNomMen}
              />
              <TextField
                variant='outlined'
                margin='normal'
                type='number'
                size='small'
                id='niv'
                label='Nivel'
                fullWidth
                value={dataSelect.MnuNivelMen}
              />
              <TextField
                variant='outlined'
                margin='normal'
                type='text'
                size='small'
                id='icon'
                label='Icono'
                fullWidth
                value={dataSelect.MnuIconMen}
              />
              <TextField
                variant='outlined'
                margin='normal'
                type='text'
                size='small'
                id='url'
                label='Url'
                fullWidth
                value={dataSelect.MnuUrlMen}
              />
              <TextField
                variant='outlined'
                margin='normal'
                type='text'
                size='small'
                id='ley'
                label='Leyenda'
                fullWidth
                value={dataSelect.MnuLeyendMen}
              />
              <TextField
                variant='outlined'
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
