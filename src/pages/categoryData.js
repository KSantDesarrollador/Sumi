import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
  makeStyles,
  Grid,
  TextField,
  Tooltip,
  Popover,
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
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalActual, setShowModalActual] = useState(false);
  const [show, setShow] = useState("alertHide");
  const [type, setType] = useState("");
  const [alert, setAlert] = useState(null);
  const [open, setOpen] = useState(null);
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

  // abrir y cerrar el picker de color
  const openPicker = (event) => {
    setOpen(event.currentTarget);
  };

  const closePicker = () => {
    setOpen(null);
  };

  const opened = Boolean(open);
  const id = opened ? "simple-popover" : undefined;

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
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setShow("alertShow");
        setAlert("....Ops! Hubo un error al procesar la petición");
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
      })
      .catch((er) => {
        console.log(er);
        setType("error");
        setShow("alertShow");
        setAlert("....Ops! Hubo un error al procesar la petición");
      });
  };

  // Esta función elimina los datos del rol seleccionado
  const deleteCategory = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.CtgId } })
      .then((response) => {
        setData(data.filter((rol) => rol.CtgId !== dataSelect.CtgId));
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
  const selectedItem = (category, type) => {
    setDataSelect(category);
    if (type === "Edit") {
      abrirCerrarModalEdit();
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
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='CtgNomCat'
                    size='small'
                    id='CtgNomCat'
                    label='Nombre de la categoría'
                    fullWidth
                    autoFocus
                    required
                    onChange={eventinput}
                  />
                  <TextField fullWidth></TextField>
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
                      id='CtgColorCat'
                      label='Color de la categoría'
                      fullWidth
                      color={dataSelect.CtgColorCat}
                      required
                      onChange={eventcolor}
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
                  <i className='zmdi zmdi-stop' />
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
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='CtgNomCat'
                    size='small'
                    id='CtgNomCat'
                    label='Nombre de la categoría'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.CtgNomCat}
                    onChange={eventinput}
                  />
                  <TextField fullWidth></TextField>
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
                      id='CtgColorCat'
                      label='Color de la categoría'
                      fullWidth
                      color={dataSelect.CtgColorCat}
                      required
                      onChange={eventcolor}
                    />
                  </Popover>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='CtgEstCat'
                    size='small'
                    id='CtgEstCat'
                    label='Estado'
                    fullWidth
                    required
                    value={dataSelect.CtgEstCat}
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
