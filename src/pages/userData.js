import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from "axios";
import MaterialTable from "material-table";
// importando los iconos
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";
// importandom los componentes
import Menu from "../templates/menu";
import Footer from "../templates/footer";

const stylesPage = makeStyles(() => ({
  root: {
    // flexGrow: 1,
    backgroundImage: "url('/img/fondo.jpg')",
    overflow: "auto",
    backgroundPosition: "top",
    width: "100%",
    height: "100vh",
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
  image: {
    borderRadius: "30px",
    width: "25px",
    height: "25px",
  },
  contain: {
    marginTop: "auto",
    alignItems: "center",
    paddingTop: "15px",
  },
  desk: {
    padding: "5% 2% 0 7%",
  },
  modal: {
    marginTop: "5%",
  },
}));

const ServUrl = "http://localhost/SUMI/models/userModel.php";

const UserData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataSelect, setDataSelect] = useState({
    UsrId: "",
    RrlId: "",
    RrlNomRol: "",
    UsrNomUsu: "",
    UsrContraUsu: "",
    UsrEmailUsu: "",
    UsrTelfUsu: "",
    UsrImgUsu: "",
    UsrEstUsu: "",
  });
  const [image, setImage] = useState(null);

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const abrirCerrarModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const eventinput = (e) => {
    // console.log([e.target.name]);
    if (e.target.name === "UsrImgUsu") {
      setDataSelect((prevState) => ({
        ...prevState,
        [e.target.name]: [e.target.files[0]],
      }));
    } else {
      setDataSelect((prevState) => ({
        ...prevState,
        [e.target.name]: [e.target.value],
      }));
    }
  };

  // obteniendo datos de un servidor
  const listUser = async () => {
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
    listUser();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newUser = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("RrlId", dataSelect.RrlId);
    f.append("UsrNomUsu", dataSelect.UsrNomUsu);
    f.append("UsrContraUsu", dataSelect.UsrContraUsu);
    f.append("UsrEmailUsu", dataSelect.UsrEmailUsu);
    f.append("UsrTelfUsu", dataSelect.UsrTelfUsu);
    f.append("UsrImgUsu", dataSelect.UsrImgUsu);
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
  const updateUser = async (e) => {
    e.preventDefault();

    let f = new FormData();
    f.append("RrlId", dataSelect.RrlId);
    f.append("UsrNomUsu", dataSelect.UsrNomUsu);
    f.append("UsrContraUsu", dataSelect.UsrContraUsu);
    f.append("UsrEmailUsu", dataSelect.UsrEmailUsu);
    f.append("UsrTelfUsu", dataSelect.UsrTelfUsu);
    f.append("UsrImgUsu", dataSelect.UsrImgUsu);
    f.append("UsrEstUsu", dataSelect.UsrEstUsu);
    f.append("METHOD", "PUT");
    await axios
      .post(
        ServUrl,
        f,
        { params: { id: dataSelect.UsrId } },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.log(response.data);
        let newData = data;
        newData.map((info) => {
          if (info.UsrId === dataSelect.UsrId) {
            info.RrlId = dataSelect.RrlId;
            info.UsrNomUsu = dataSelect.UsrNomUsu;
            info.UsrContraUsu = dataSelect.UsrContraUsu;
            info.UsrEmailUsu = dataSelect.UsrEmailUsu;
            info.UsrTelfUsu = dataSelect.UsrTelfUsu;
            info.UsrImgUsu = dataSelect.UsrImgUsu;
            info.UsrEstUsu = dataSelect.UsrEstUsu;
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
  const deleteUser = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.UsrId } })
      .then((response) => {
        setData(data.filter((user) => user.UsrId !== dataSelect.UsrId));
        abrirCerrarModalDelete();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función permite elegir el modal que se abrirá y guaerda los datos en el estado
  const selectedItem = (user, type) => {
    setDataSelect(user);
    if (type === "Edit") {
      abrirCerrarModalEdit();
    } else {
      abrirCerrarModalDelete();
    }
  };

  // Formando las columnas de la tabla
  const columns = [
    { title: "ID", field: "UsrId" },
    { title: "FOTO", field: "data:image/png;base64,UsrImgUsu" },
    { title: "ROL", field: "RrlNomRol" },
    { title: "USUARIO", field: "UsrNomUsu" },
    { title: "CONTRASEÑA", field: "UsrContraUsu" },
    { title: "EMAIL", field: "UsrEmailUsu" },
    { title: "TELÉFONO", field: "UsrTelfUsu" },
    { title: "ESTADO", field: "UsrEstUsu" },
  ];

  return (
    <div className={classList.root}>
      <Grid>
        <Menu />
      </Grid>
      <Grid className={classList.desk}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h2>
            Usuarios <PeopleIcon className={classList.iconPge} />
          </h2>
          <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
            <button
              className='btn btn-warning me-md-2'
              onClick={() => abrirCerrarModal()}>
              <AddIcon />
            </button>
          </div>
        </Grid>
        <br />

        {/* Tabla que muestra la información de los roles en bd */}
        <Grid>
          <MaterialTable
            columns={columns}
            data={data}
            title='Usuarios habilitados en el sistema'
            actions={[
              {
                icon: "edit",
                tooltip: "Editar usuario",
                onClick: (event, rowData) => selectedItem(rowData, "Edit"),
              },
              {
                icon: "delete",
                tooltip: "Eliminar usuario",
                onClick: (event, rowData) => selectedItem(rowData, "Delete"),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                background: "#4094e2",
                color: "#000000",
                fontWeight: "700",
                border: "none",
                fontSize: "17px",
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

        {/* Modal que muestra un formulario para agregar un nuevo rol */}
        <Modal isOpen={showModal} className={classList.modal}>
          <ModalHeader>Agregar Usuario</ModalHeader>
          <ModalBody>
            <div>
              <form id='formNewData' encType='multipart/form-data'>
                <select
                  className='form-control'
                  name='RrlId'
                  onChange={eventinput}>
                  <option value='0' key='0'>
                    SELECCIONE ROL
                  </option>
                  <option value='1' key='1'>
                    Administrador
                  </option>
                  <option value='2' key='2'>
                    Supervisor
                  </option>
                  <option value='3' key='3'>
                    Tecnico
                  </option>
                </select>
                <br />
                <input
                  type='text'
                  name='UsrNomUsu'
                  className='form-control'
                  id='UsrNomUsu'
                  placeholder='Nombre de Usuario'
                  onChange={eventinput}
                />
                <br />
                <input
                  type='password'
                  name='UsrContraUsu'
                  className='form-control'
                  id='UsrContraUsu'
                  placeholder='Contraseña'
                  onChange={eventinput}
                />
                <br />
                <input
                  type='email'
                  name='UsrEmailUsu'
                  className='form-control'
                  id='UsrEmailUsu'
                  placeholder='Email'
                  onChange={eventinput}
                />
                <br />
                <input
                  type='telf'
                  name='UsrTelfUsu'
                  className='form-control'
                  id='UsrTelfUsu'
                  placeholder='Teléfono'
                  onChange={eventinput}
                />
                <br />
                <label for='UsrImgUsu' className='form-label'>
                  <h6>Imagen</h6>
                </label>
                <input
                  type='file'
                  name='UsrImgUsu'
                  className='form-control'
                  id='UsrImgUsu'
                  accept='image/*'
                  onChange={eventinput}
                />
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type='submit'
              className='btn btn-success btn-sm'
              form='formNewData'
              onClick={(e) => newUser(e)}>
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
          <ModalHeader>Editar Usuario</ModalHeader>
          <ModalBody>
            <div className='mb-3'>
              <form id='formUpdateData' encType='multipart/form-data'>
                <input type='hidden' name='UsrId' value={dataSelect.UsrId} />
                <select
                  className='form-control'
                  name='RrlId'
                  onChange={eventinput}>
                  <option value={dataSelect.RrlId} key=''>
                    {dataSelect.RrlNomRol}
                  </option>
                  <option value=''>cargando.......</option>
                </select>
                <br />
                <label for='UsrNomUsu' className='form-label'>
                  Usuario
                </label>
                <input
                  type='text'
                  name='UsrNomUsu'
                  className='form-control'
                  id='UsrNomUsu'
                  value={dataSelect.UsrNomUsu}
                  onChange={eventinput}
                />
                <br />
                <label for='UsrContraUsu' className='form-label'>
                  Contraseña
                </label>
                <input
                  type='password'
                  name='UsrContraUsu'
                  className='form-control'
                  id='UsrContraUsu'
                  value={dataSelect.UsrContraUsu}
                  onChange={eventinput}
                />
                <br />
                <label for='UsrEmailUsu' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  name='UsrEmailUsu'
                  className='form-control'
                  id='UsrEmailUsu'
                  value={dataSelect.UsrEmailUsu}
                  onChange={eventinput}
                />
                <br />
                <label for='UsrTelfUsu' className='form-label'>
                  Teléfono
                </label>
                <input
                  type='telf'
                  name='UsrTelfUsu'
                  className='form-control'
                  id='UsrTelfUsu'
                  value={dataSelect.UsrTelfUsu}
                  onChange={eventinput}
                />
                <br />
                <label for='UsrImgUsu' className='form-label'>
                  Imagen&nbsp;
                  <img
                    className={classList.image}
                    alt=''
                    height='45px'
                    width='45px'
                    src={dataSelect.image}
                  />
                </label>
                <input
                  type='file'
                  name='UsrImgUsu'
                  className='form-control'
                  id='UsrImgUsu'
                  accept='image/*'
                  onChange={eventinput}
                />
                <br />
                <label for='UsrEstUsu' className='form-label'>
                  Estado
                </label>
                <input
                  type='text'
                  name='UsrEstUsu'
                  className='form-control'
                  id='UsrEstUsu'
                  value={dataSelect.UsrEstUsu}
                  onChange={eventinput}
                />
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type='submit'
              className='btn btn-success btn-sm'
              form='formUpdateData'
              onClick={(e) => updateUser(e)}>
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
                <strong>{dataSelect.UsrNomUsu}</strong>
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type='submit'
              className='btn btn-success btn-sm'
              onClick={() => deleteUser()}>
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
      <Grid>
        <Footer />
      </Grid>
    </div>
  );
};

export default UserData;
