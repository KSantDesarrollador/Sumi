import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from "axios";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";

// importando los iconos
import AssistantIcon from "@material-ui/icons/Assistant";
import AddIcon from "@material-ui/icons/Add";
// importandom los componentes
import Menu from "../templates/menu";
import Footer from "../templates/footer";

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
  modal: {
    marginTop: "7%",
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
}));

const ServUrl = "http://localhost/SUMI/models/rolModel.php";

const RolData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataSelect, setDataSelect] = useState({
    RrlId: "",
    RrlNomRol: "",
    RrlEstRol: "",
  });

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const abrirCerrarModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  // obteniendo los datos de las cajas de texto
  const eventinput = (e) => {
    setDataSelect((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  // obteniendo datos de un servidor
  const listRol = async () => {
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
    listRol();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newRol = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("RrlNomRol", dataSelect.RrlNomRol);
    f.append("METHOD", "POST");
    await axios
      .post(ServUrl, f)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModal();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función actualiza los datos del rol selecionado
  const updateRol = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("RrlNomRol", dataSelect.RrlNomRol);
    f.append("RrlEstRol", dataSelect.RrlEstRol);
    f.append("METHOD", "PUT");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.RrlId } })
      .then((response) => {
        let newData = data;
        newData.map((info) => {
          if (info.RrlId === dataSelect.RrlId) {
            info.RrlNomRol = dataSelect.RrlNomRol;
            info.RrlEstRol = dataSelect.RrlEstRol;
          }
          return info;
        });

        setData(newData);
        abrirCerrarModalEdit();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función elimina los datos del rol seleccionado
  const deleteRol = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.RrlId } })
      .then((response) => {
        setData(data.filter((rol) => rol.RrlId !== dataSelect.RrlId));
        abrirCerrarModalDelete();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función permite elegir el modal que se abrirá y guaerda los datos en el estado
  const selectedItem = (rol, type) => {
    setDataSelect(rol);
    if (type === "Edit") {
      abrirCerrarModalEdit();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "RrlId" },
    { title: "", field: "" },
    { title: "ROL", field: "RrlNomRol" },
    { title: "", field: "" },
    { title: "ESTADO", field: "RrlEstRol" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
  ];

  return (
    <div className={classList.root}>
      <Menu />
      <main>
        <Grid container className={classList.content}>
          <div className={classList.toolbar}></div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <h2>
                Roles <AssistantIcon className={classList.iconPge} />
              </h2>

              <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                <button
                  className='btn btn-warning btn-sm'
                  tooltip='Agregar'
                  onClick={() => abrirCerrarModal()}>
                  <AddIcon />
                </button>
              </div>
            </Grid>
          </Grid>
          <br />

          {/* Tabla que muestra la información de los roles en bd */}
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{ textAlign: "center" }}>
              <MaterialTable
                columns={columns}
                data={data}
                title='Roles habilitados en el sistema'
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar rol",
                    onClick: (event, rowData) => selectedItem(rowData, "Edit"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar rol",
                    onClick: (event, rowData) =>
                      selectedItem(rowData, "Delete"),
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                  headerStyle: {
                    background: "#4094e2",
                    color: "#000000",
                    fontWeight: "700",
                    border: "none",
                    fontSize: "18px",
                  },
                  actionsCellStyle: {
                    // background: "#96acc0",
                    color: "#000000",
                    borderBottom: "1px solid #96acc0",
                  },
                  cellStyle: { borderBottom: "1px solid #96acc0" },
                }}
                localization={{
                  header: {
                    actions: "ACCIONES",
                  },
                  toolbar: {
                    searchPlaceholder: "Buscar",
                    searchTooltip: "Buscar",
                  },
                  body: {
                    emptyDataSourceMessage: "No hay registros que mostrar",
                    filterRow: {
                      filterTooltip: "Filtrar",
                    },
                  },
                  pagination: {
                    labelRowsSelect: "registros",
                    firstTooltip: "primera página",
                    previousTooltip: "página anterior",
                    labelRowsPerPage: "Total de registros",
                    labelDisplayedRows:
                      "{from} - {to} de {count} regsitros encontrados",
                    nextTooltip: "página siguiente",
                    lastTooltip: "última página",
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Modal que muestra un formulario para agregar un nuevo rol */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader>Agregar Rol</ModalHeader>
            <ModalBody>
              <div>
                <form
                  id='formNewData'
                  encType='multipart/form-data'
                  onSubmit={(e) => newRol(e)}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='RrlNomRol'
                    size='small'
                    id='RrlNomRol'
                    label='Nombre del Rol'
                    fullWidth
                    autoFocus
                    required
                    onChange={eventinput}
                  />
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                type='submit'
                className='btn btn-success btn-sm'
                form='formNewData'>
                {" "}
                Guardar
              </button>{" "}
              <button
                className='btn btn-danger btn-sm'
                onClick={() => abrirCerrarModal()}>
                Cancelar
              </button>
            </ModalFooter>
          </Modal>

          {/* Modal que muestra los datos del rol a ser editado */}
          <Modal isOpen={showModalEdit} className={classList.modal}>
            <ModalHeader>Editar Rol</ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => updateRol(e)}>
                  <input type='hidden' name='RrlId' value={dataSelect.RrlId} />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='RrlNomRol'
                    size='small'
                    id='RrlNomRol'
                    label='Nombre del Rol'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.RrlNomRol}
                    onChange={eventinput}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    type='text'
                    name='RrlEstRol'
                    size='small'
                    id='RrlEstRol'
                    label='Estado'
                    fullWidth
                    required
                    value={dataSelect.RrlEstRol}
                    onChange={eventinput}
                  />
                </form>
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                type='submit'
                className='btn btn-success btn-sm'
                form='formUpdateData'>
                {" "}
                Editar
              </button>{" "}
              <button
                className='btn btn-danger btn-sm'
                onClick={() => abrirCerrarModalEdit()}>
                Cancelar
              </button>
            </ModalFooter>
          </Modal>

          {/* Modal para confirmación antes de eliminar un registro */}
          <Modal isOpen={showModalDelete} className={classList.modal}>
            <ModalHeader>Eliminar Rol</ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <p>
                  Está seguro de eliminar el rol:&nbsp;
                  <strong>{dataSelect.RrlNomRol}</strong>
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                type='submit'
                className='btn btn-success btn-sm'
                onClick={() => deleteRol()}>
                {" "}
                Aceptar
              </button>{" "}
              <button
                className='btn btn-danger btn-sm'
                onClick={() => abrirCerrarModalDelete()}>
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default RolData;
