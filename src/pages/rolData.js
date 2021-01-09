import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";

export default class RolData extends Component {
  state = {
    RrlId: "",
    RrlNomRol: "",
    RrlEstRol: "",
    dataRol: [],
    showModal: false,
    showModalEdit: false,
    showModalDelete: false,
  };

  abrirCerrarModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  abrirCerrarModalEdit = () => {
    this.setState({ showModalEdit: !this.state.showModalEdit });
  };

  abrirCerrarModalDelete = () => {
    this.setState({ showModalDelete: !this.state.showModalDelete });
  };

  eventinput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // obteniendo datos de un servidor
  listRol = async () => {
    const ServUrl = "http://localhost/SUMI/models/rolModel.php";
    await axios
      .get(ServUrl)
      .then((response) => {
        this.setState({ dataRol: response.data });
      })
      .catch((er) => {
        console.log(er);
      });
  };

  componentDidMount() {
    this.listRol();
  }

  // Esta función guarda los datos de un nuevo rol
  newRol = async () => {
    let f = new FormData();
    f.append("RrlNomRol", this.state.RrlNomRol);
    f.append("METHOD", "POST");
    const ServUrl = "http://localhost/SUMI/models/rolModel.php";
    await axios
      .post(ServUrl, f)
      .then((response) => {
        this.setState({ dataRol: this.state.dataRol.concat(response.data) });
        this.abrirCerrarModal();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función actualiza los datos del rol selecionado
  updateRol = async () => {
    let f = new FormData();
    f.append("RrlNomRol", this.state.RrlNomRol);
    f.append("RrlEstRol", this.state.RrlEstRol);
    f.append("METHOD", "PUT");
    const ServUrl = "http://localhost/SUMI/models/rolModel.php";
    await axios
      .post(ServUrl, f, { params: { id: this.state.RrlId } })
      .then((response) => {
        let newData = this.state.dataRol;
        newData.map((info) => {
          if (info.RrlId === this.state.RrlId) {
            info.RrlNomRol = this.state.RrlNomRol;
            info.RrlEstRol = this.state.RrlEstRol;
          }
          return info;
        });

        this.setState({ dataRol: newData });
        this.abrirCerrarModalEdit();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función elimina los datos del rol seleccionado
  deleteRol = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    const ServUrl = "http://localhost/SUMI/models/rolModel.php";
    await axios
      .post(ServUrl, f, { params: { id: this.state.RrlId } })
      .then((response) => {
        this.setState({
          dataRol: this.state.dataRol.filter(
            (rol) => rol.RrlId !== this.state.RrlId
          ),
        });
        this.abrirCerrarModalDelete();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // Esta función permite elegir el modal que se abrirá y guaerda los datos en el estado
  selectedItem = (rol, type) => {
    this.setState({
      RrlId: rol.RrlId,
      RrlNomRol: rol.RrlNomRol,
      RrlEstRol: rol.RrlEstRol,
    });
    if (type === "Edit") {
      this.abrirCerrarModalEdit();
    } else {
      this.abrirCerrarModalDelete();
    }
  };

  render() {
    return (
      <div>
        <br />
        <h2>Roles</h2>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <button
            className='btn btn-warning me-md-2'
            onClick={() => this.abrirCerrarModal()}>
            Agregar
          </button>
        </div>
        <br />

        {/* Tabla que muestra la información de los roles en bd */}
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
            {this.state.dataRol.map((data) => {
              return (
                <tr key={data.RrlId}>
                  <th scope='row'>{data.RrlId}</th>
                  <td>{data.RrlNomRol}</td>
                  <td>{data.RrlEstRol}</td>
                  <td>
                    <button
                      className='btn btn-primary btn-sm'
                      onClick={() => this.selectedItem(data, "Edit")}>
                      Editar
                    </button>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => this.selectedItem(data, "Delete")}>
                      Borrar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Modal que muestra un formulario para agregar un nuevo rol */}
        <Modal isOpen={this.state.showModal}>
          <ModalHeader>Agregar Rol</ModalHeader>
          <ModalBody>
            <div>
              <input
                type='text'
                name='RrlNomRol'
                className='form-control'
                id='RrlNomRol'
                placeholder='Nombre del Rol'
                onChange={this.eventinput}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type='submit'
              className='btn btn-success btn-sm'
              onClick={() => this.newRol()}>
              {" "}
              Guardar
            </button>{" "}
            <button
              className='btn btn-danger btn-sm'
              onClick={() => this.abrirCerrarModal()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        {/* Modal que muestra los datos del rol a ser editado */}
        <Modal isOpen={this.state.showModalEdit}>
          <ModalHeader>Editar Rol</ModalHeader>
          <ModalBody>
            <div className='mb-3'>
              <input type='hidden' name='RrlId' value={this.state.RrlId} />
              <label for='RrlNomRol' className='form-label'>
                Nombre del Rol
              </label>
              <input
                type='text'
                name='RrlNomRol'
                className='form-control'
                id='RrlNomRol'
                value={this.state.RrlNomRol}
                onChange={this.eventinput}
              />

              <label for='RrlEstRol' className='form-label'>
                Estado
              </label>
              <input
                type='text'
                name='RrlEstRol'
                className='form-control'
                id='RrlEstRol'
                value={this.state.RrlEstRol}
                onChange={this.eventinput}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type='submit'
              className='btn btn-success btn-sm'
              onClick={() => this.updateRol()}>
              {" "}
              Editar
            </button>{" "}
            <button
              className='btn btn-danger btn-sm'
              onClick={() => this.abrirCerrarModalEdit()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        {/* Modal para confirmación antes de eliminar un registro */}
        <Modal isOpen={this.state.showModalDelete}>
          <ModalHeader>Eliminar Rol</ModalHeader>
          <ModalBody>
            <div className='mb-3'>
              <p>
                Está seguro de eliminar el rol:&nbsp;
                <strong>{this.state.RrlNomRol}</strong>
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type='submit'
              className='btn btn-success btn-sm'
              onClick={() => this.deleteRol()}>
              {" "}
              Aceptar
            </button>{" "}
            <button
              className='btn btn-danger btn-sm'
              onClick={() => this.abrirCerrarModalDelete()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
