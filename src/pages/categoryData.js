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

const ServUrl = "http://localhost/SUMI/models/categoryModel.php";

const CategoryData = () => {
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
  });
  const [error, setError] = useState({
    nom: false,
    color: false,
  });
  const [dataSelect, setDataSelect] = useState({
    CtgId: "",
    CtgNomCat: "",
    CtgColorCat: "",
    CtgEstCat: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({ nom: false, color: false });
    setMessage({ nom: "", color: "" });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({ nom: false, color: false });
    setMessage({ nom: "", color: "" });
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    if (error.nom === false && error.color === false) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    if (error.nom === false && error.color === false) {
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
      CtgId: "",
      CtgNomCat: "",
      CtgColorCat: "",
      CtgEstCat: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      text: /^[a-zA-ZA-ý\s]{1,40}$/,
      code: /^[a-zA-Z0-9]{6,10}$/,
    };

    if (fieldName === "nom") {
      if (expressions.text.test(dataSelect.CtgNomCat)) {
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
      if (expressions.code.test(dataSelect.CtgColorCat)) {
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
      CtgColorCat: color.hex,
    }));
  };

  // obteniendo datos de un servidor
  const listCategory = async () => {
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
    listCategory();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newCategory = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("CtgNomCat", dataSelect.CtgNomCat);
    f.append("CtgColorCat", dataSelect.CtgColorCat);
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
  const updateCategory = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("CtgNomCat", dataSelect.CtgNomCat);
    f.append("CtgColorCat", dataSelect.CtgColorCat);
    f.append("CtgEstCat", dataSelect.CtgEstCat);
    f.append("METHOD", "PUT");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.CtgId } })
      .then((response) => {
        let newData = data;
        newData.map((info) => {
          if (info.CtgId === dataSelect.CtgId) {
            info.CtgNomCat = dataSelect.CtgNomCat;
            info.CtgColorCat = dataSelect.CtgColorCat;
            info.CtgDescCat = dataSelect.CtgDescCat;
            info.CtgEstCat = dataSelect.CtgEstCat;
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
  const deleteCategory = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.CtgId } })
      .then((response) => {
        setData(data.filter((cat) => cat.CtgId !== dataSelect.CtgId));
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
  const selectedItem = (category, type) => {
    if (type === "Edit") {
      setDataSelect(category);
      abrirCerrarModalEdit();
    } else if (type === "Detail") {
      setDataSelect(category);
      abrirCerrarModalDetail();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "CtgId" },
    { title: "NOMBRE", field: "CtgNomCat" },
    {
      title: "COLOR",
      field: "CtgColorCat",
    },
    { title: "ESTADO", field: "CtgEstCat" },
  ];

  const status = dataSelect.CtgEstCat === "A" ? "Activo" : "Inactivo";

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
              title={"Categorías"}
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
              title={"Categoría de productos habilitadas"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar un nuevo rol */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Categoría
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
                    name='CtgNomCat'
                    size='small'
                    id='nom'
                    label='Nombre de la categoría'
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
                      label='Color de la categoría'
                      fullWidth
                      color={dataSelect.CtgColorCat}
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
              Editar Categoría
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
                  <input type='hidden' name='CtgId' value={dataSelect.CtgId} />
                  <TextField
                    error={error.nom}
                    helperText={message.nom}
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='CtgNomCat'
                    size='small'
                    id='nom'
                    label='Nombre de la categoría'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.CtgNomCat}
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
                      label='Color de la categoría'
                      fullWidth
                      color={dataSelect.CtgColorCat}
                      required
                      onChange={eventcolor}
                      onKeyUp={evalinput}
                    />
                  </Popover>
                  <Button
                    size='lg'
                    aria-label='CtgColorCat'
                    variant='contained'
                    style={{
                      background: dataSelect.CtgColorCat,
                      float: "right",
                    }}></Button>
                  <InputBase fullWidth />
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
                        name: "CtgEstCat",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={status}
                        value={dataSelect.CtgEstCat}
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
          {/* Modal que muestra los datos de la categoría */}
          <Modal isOpen={showModalDetail} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderEdit}>
              Detalles Categoría
            </ModalHeader>
            <ModalBody>
              <input type='hidden' name='CtgId' value={dataSelect.CtgId} />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='CtgNomCat'
                label='Nombre de la categoría'
                fullWidth
                value={dataSelect.CtgNomCat}
              />
              <InputBase fullWidth disabled />
              <label htmlFor='color'>Color de la categoría</label>
              &nbsp; &nbsp;
              <Button
                disabled
                id='color'
                fullWidth
                size='lg'
                aria-label='CtgColorCat'
                variant='contained'
                style={{ background: dataSelect.CtgColorCat }}></Button>
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='CtgEstCat'
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
            title={"Guardar Categoría"}
            alertTitle={"¿Está seguro de crear el Categoría:"}
            alertText={dataSelect.CtgNomCat}
            showModal={showModalSave}
            actionUser={(e) => newCategory(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar Categoría"}
            alertTitle={"¿Está seguro de actualizar la Categoría a:"}
            alertText={dataSelect.CtgNomCat}
            showModal={showModalActual}
            actionUser={(e) => updateCategory(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar Categoría"}
            alertTitle={"¿Está seguro de eliminar la Categoría:"}
            alertText={dataSelect.CtgNomCat}
            showModal={showModalDelete}
            actionUser={deleteCategory}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default CategoryData;
