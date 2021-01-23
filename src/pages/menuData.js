import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from "axios";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// importando los iconos
import PeopleIcon from "@material-ui/icons/People";
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
    marginTop: "5%",
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
}));

const ServUrl = "http://localhost/SUMI/models/menuModel.php";

const MenuData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [datalistSelect, setDatalistSelect] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
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
        abrirCerrarModal();
      })
      .catch((er) => {
        console.log(er);
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
        abrirCerrarModalEdit();
      })
      .catch((er) => {
        console.log(er);
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
      })
      .catch((er) => {
        console.log(er);
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <h2>
                Menús <PeopleIcon className={classList.iconPge} />
              </h2>
              <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                <button
                  className='btn btn-warning me-md-2'
                  onClick={() => {
                    abrirCerrarModal();
                  }}>
                  <AddIcon />
                </button>
              </div>
            </Grid>
          </Grid>

          {/* Tabla que muestra la información de los roles en bd */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <MaterialTable
                columns={columns}
                data={data}
                title='Lista de menús en el sistema'
                actions={[
                  {
                    icon: "edit",
                    tooltip: "Editar menú",
                    onClick: (event, rowData) => selectedItem(rowData, "Edit"),
                  },
                  {
                    icon: "delete",
                    tooltip: "Eliminar menú",
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
                    fontSize: "15px",
                  },
                  actionsCellStyle: {
                    // background: "#96acc0",
                    color: "#000000",
                    borderBottom: "1px solid #96acc0",
                  },
                  cellStyle: {
                    borderBottom: "1px solid #96acc0",
                    fontSize: "13px",
                  },
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
            <ModalHeader>Agregar Usuario</ModalHeader>
            <ModalBody>
              <div>
                <form
                  id='formNewData'
                  encType='multipart/form-data'
                  onSubmit={(e) => newMenu(e)}>
                  <FormControl
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
            <ModalHeader>Editar Menú</ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => updateMenu(e)}>
                  <input type='hidden' name='MnuId' value={dataSelect.MnuId} />
                  <FormControl
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
            <ModalHeader>Eliminar Usuario</ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <p>
                  Está seguro de eliminar el usuario:&nbsp;
                  <strong>{dataSelect.MnuNomMen}</strong>
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                type='submit'
                className='btn btn-success btn-sm'
                onClick={() => deleteMenu()}>
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

export default MenuData;
