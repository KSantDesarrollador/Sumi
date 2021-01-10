import React, { Component, useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from "axios";
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
  contain: {
    marginTop: "auto",
    alignItems: "center",
    paddingTop: "15px",
  },
  desk: {
    padding: "5% 2% 0 7%",
  },
  modal: {
    marginTop: "7%",
  },
}));

export default function RolData() {
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

  const eventinput = (e) => {
    setDataSelect((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  // obteniendo datos de un servidor
  const listRol = async () => {
    const ServUrl = "http://localhost/SUMI/models/rolModel.php";
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
  const newRol = async () => {
    let f = new FormData();
    f.append("RrlNomRol", dataSelect.RrlNomRol);
    f.append("METHOD", "POST");
    const ServUrl = "http://localhost/SUMI/models/rolModel.php";
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
  const updateRol = async () => {
    let f = new FormData();
    f.append("RrlNomRol", dataSelect.RrlNomRol);
    f.append("RrlEstRol", dataSelect.RrlEstRol);
    f.append("METHOD", "PUT");
    const ServUrl = "http://localhost/SUMI/models/rolModel.php";
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
    const ServUrl = "http://localhost/SUMI/models/rolModel.php";
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
  return (
    <div className={classList.root}>
      <Grid>
        <Menu />
      </Grid>
      <Grid className={classList.desk}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h2>Roles</h2>
          <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
            <button
              className='btn btn-warning me-md-2'
              onClick={() => abrirCerrarModal()}>
              Agregar
            </button>
          </div>
        </Grid>
        <br />

        {/* Tabla que muestra la información de los roles en bd */}
        <Grid>
          <table className='table table-hover table-light'>
            <thead className='table-dark'>
              <tr key=''>
                <th scope='col'>ID</th>
                <th scope='col'>ROL</th>
                <th scope='col'>ESTADO</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {
                return (
                  <tr key={data.RrlId}>
                    <th scope='row'>{data.RrlId}</th>
                    <td>{data.RrlNomRol}</td>
                    <td>{data.RrlEstRol}</td>
                    <td>
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={() => selectedItem(data, "Edit")}>
                        Editar
                      </button>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => selectedItem(data, "Delete")}>
                        Borrar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>

        {/* Modal que muestra un formulario para agregar un nuevo rol */}
        <Modal isOpen={showModal} className={classList.modal}>
          <ModalHeader>Agregar Rol</ModalHeader>
          <ModalBody>
            <div>
              <input
                type='text'
                name='RrlNomRol'
                className='form-control'
                id='RrlNomRol'
                placeholder='Nombre del Rol'
                onChange={eventinput}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type='submit'
              className='btn btn-success btn-sm'
              onClick={() => newRol()}>
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
              <input type='hidden' name='RrlId' value={dataSelect.RrlId} />
              <label for='RrlNomRol' className='form-label'>
                Nombre del Rol
              </label>
              <input
                type='text'
                name='RrlNomRol'
                className='form-control'
                id='RrlNomRol'
                value={dataSelect.RrlNomRol}
                onChange={eventinput}
              />

              <label for='RrlEstRol' className='form-label'>
                Estado
              </label>
              <input
                type='text'
                name='RrlEstRol'
                className='form-control'
                id='RrlEstRol'
                value={dataSelect.RrlEstRol}
                onChange={eventinput}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type='submit'
              className='btn btn-success btn-sm'
              onClick={() => updateRol()}>
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
      <Grid>
        <Footer />
      </Grid>
    </div>
  );
}
