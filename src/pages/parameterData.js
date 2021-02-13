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

const ServUrl = "http://localhost/SUMI/models/parameterModel.php";

const ParameterData = () => {
  const classList = stylesPage();
  const [data, setData] = useState([]);
  const [datalistSelectProduct, setDatalistSelectProduct] = useState([]);
  const [datalistSelectAlert, setDatalistSelectAlert] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataAlert, setDataAlert] = useState([]);
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
    min: "",
    max: "",
  });
  const [error, setError] = useState({
    min: false,
    max: false,
  });
  const [dataSelect, setDataSelect] = useState({
    PmtId: "",
    MdcId: "",
    AltId: "",
    PmtMinPar: "",
    PmtMaxPar: "",
  });

  const changeState = () => {
    setShow("alertHide");
    setAlert(null);
  };

  const abrirCerrarModal = () => {
    setShowModal(!showModal);
    setError({
      min: false,
      max: false,
    });
    setMessage({ min: "", max: "" });
  };

  const abrirCerrarModalEdit = () => {
    setShowModalEdit(!showModalEdit);
    setError({
      min: false,
      max: false,
    });
    setMessage({ min: "", max: "" });
  };

  const abrirCerrarModalDetail = () => {
    setShowModalDetail(!showModalDetail);
  };

  const abrirCerrarModalSave = (e) => {
    e.preventDefault();
    listProductName();
    listAlertName();
    if (error.min === false && error.max === false) {
      setShowModalSave(!showModalSave);
    }
  };

  const abrirCerrarModalActual = (e) => {
    e.preventDefault();
    listProductName();
    listAlertName();
    if (error.min === false && error.max === false) {
      setShowModalActual(!showModalActual);
    }
  };

  const abrirCerrarModalDelete = () => {
    listProductName();
    listAlertName();
    setShowModalDelete(!showModalDelete);
  };

  // limpiando los campos
  const clear = () => {
    setDataSelect(() => ({
      PmtId: "",
      MdcId: "",
      AltId: "",
      PmtMinPar: "",
      PmtMaxPar: "",
    }));
  };

  // mostrando errores de validación
  const validations = () => {
    const expressions = {
      num: /^[0-9]{1,4}$/,
    };

    if (fieldName === "min") {
      if (expressions.num.test(dataSelect.PmtMinPar)) {
        setError((prevState) => ({
          ...prevState,
          min: false,
        }));
        setMessage((prevState) => ({ ...prevState, min: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          min: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          min: "solo se permiten números y un máximo de 1000",
        }));
      }
    } else if (fieldName === "max") {
      if (expressions.num.test(dataSelect.PmtMaxPar)) {
        setError((prevState) => ({
          ...prevState,
          max: false,
        }));
        setMessage((prevState) => ({ ...prevState, max: "" }));
      } else {
        setError((prevState) => ({
          ...prevState,
          max: true,
        }));
        setMessage((prevState) => ({
          ...prevState,
          max: "solo se permiten números y un máximo de 1000",
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
  const listParameter = async () => {
    await axios
      .get(ServUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select producto
  const listSelectProduct = async () => {
    await axios
      .get(ServUrl + "?med=0")
      .then((response) => {
        setDatalistSelectProduct(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select producto
  const listProductName = async () => {
    await axios
      .get(ServUrl + "?med=" + dataSelect.MdcId)
      .then((response) => {
        setDataProduct(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select alerta
  const listSelectAlert = async () => {
    await axios
      .get(ServUrl + "?alt=0")
      .then((response) => {
        setDatalistSelectAlert(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  // llenando select alerta
  const listAlertName = async () => {
    await axios
      .get(ServUrl + "?alt=" + dataSelect.AltId)
      .then((response) => {
        setDataAlert(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    clear();
    listParameter();
    listSelectProduct();
    listSelectAlert();
  }, []);

  // Esta función guarda los datos de un nuevo rol
  const newParameter = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("MdcId", dataSelect.MdcId);
    f.append("AltId", dataSelect.AltId);
    f.append("PmtMinPar", dataSelect.PmtMinPar);
    f.append("PmtMaxPar", dataSelect.PmtMaxPar);
    f.append("METHOD", "POST");
    await axios
      .post(ServUrl, f)
      .then((response) => {
        listParameter();
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
  const updateParameter = async (e) => {
    e.preventDefault();
    let f = new FormData();
    f.append("MdcId", dataSelect.MdcId);
    f.append("AltId", dataSelect.AltId);
    f.append("PmtMinPar", dataSelect.PmtMinPar);
    f.append("PmtMaxPar", dataSelect.PmtMaxPar);
    f.append("METHOD", "PUT");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.PmtId } })
      .then((response) => {
        let newData = data;
        newData.map((info) => {
          if (info.PmtId === dataSelect.PmtId) {
            info.MdcId = dataSelect.MdcId;
            info.AltId = dataSelect.AltId;
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
  const deleteParameter = async () => {
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(ServUrl, f, { params: { id: dataSelect.PmtId } })
      .then((response) => {
        setData(data.filter((priv) => priv.PmtId !== dataSelect.PmtId));
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
    { title: "ID", field: "PmtId" },
    { title: "PRODUCTO", field: "MdcDescMed" },
    { title: "ALERTA", field: "AltNomAle" },
    { title: "VALOR.MIN", field: "PmtMinPar" },
    { title: "VALOR.MAX", field: "PmtMaxPar" },
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
              title={"Parámetros"}
              icon1={"zmdi zmdi-arrow-merge"}
              icon2={"zmdi zmdi-plus"}
              type={type}
              alert={alert}
              show={show}
              changeState={changeState}
            />
          </Grid>
          &nbsp;
          <Grid container spacing={2}>
            {/* Tabla que muestra la información de los parámtros en bd */}
            <DataTable
              selectedItem={selectedItem}
              data={data}
              columns={columns}
              title={"Parámetros"}
            />
          </Grid>
          {/* Modal que muestra un formulario para agregar un nuevo parámtro */}
          <Modal isOpen={showModal} className={classList.modal}>
            <ModalHeader className={classList.modalHeaderNew}>
              Agregar Parámetro
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
                      Producto contenedor
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Producto contenedor'
                      name='MdcId'
                      required
                      inputProps={{
                        name: "MdcId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option key='0' aria-label='' value='' />
                      {datalistSelectProduct.map((item, index) => (
                        <option key={index} value={item.MdcId} label=''>
                          {item.MdcDescMed +
                            " " +
                            item.MdcPresenMed +
                            " " +
                            item.MdcConcenMed}
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
                      Alerta contenedor
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Alerta contenedor'
                      name='AltId'
                      required
                      inputProps={{
                        name: "AltId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option key='1' aria-label='' value='' />
                      {datalistSelectAlert.map((item, index) => (
                        <option
                          key={index}
                          value={item.AltId}
                          label=''
                          style={{
                            background: item.AltColorAle,
                            fontWeight: "700",
                          }}>
                          {item.AltNomAle}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    error={error.min}
                    helperText={message.min}
                    variant='outlined'
                    margin='normal'
                    type='number'
                    name='PmtMinPar'
                    size='small'
                    id='min'
                    label='Valor mínimo'
                    fullWidth
                    autoFocus
                    required
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    error={error.max}
                    helperText={message.max}
                    variant='outlined'
                    margin='normal'
                    type='number'
                    name='PmtMaxPar'
                    size='small'
                    id='max'
                    label='Valor máximo'
                    fullWidth
                    autoFocus
                    required
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
              Editar Parámetro
            </ModalHeader>
            <ModalBody>
              <div className='mb-3'>
                <form
                  id='formUpdateData'
                  encType='multipart/form-data'
                  onSubmit={(e) => abrirCerrarModalActual(e)}>
                  <input type='hidden' name='PmtId' value={dataSelect.PmtId} />
                  <FormControl
                    size='small'
                    variant='outlined'
                    className={classList.formControl}>
                    <InputLabel htmlFor='outlined-age-native-simple'>
                      Producto contenedor
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Producto contenedor'
                      required
                      inputProps={{
                        name: "MdcId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='0'
                        label={
                          dataSelect.MdcDescMed +
                          dataSelect.MdcPresenMed +
                          dataSelect.MdcConcenMed
                        }
                        value={dataSelect.MdcId}
                      />
                      {datalistSelectProduct.map((item, index) => (
                        <option key={index} value={item.MdcId} label=''>
                          {item.MdcDescMed +
                            item.MdcPresenMed +
                            item.MdcConcenMed}
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
                      Alerta contenedor
                    </InputLabel>
                    <Select
                      native
                      onChange={eventinput}
                      label='Alerta contenedor'
                      required
                      inputProps={{
                        name: "AltId",
                        id: "outlined-age-native-simple",
                      }}>
                      <option
                        key='1'
                        label={dataSelect.AltNomAle}
                        value={dataSelect.AltId}
                      />
                      {datalistSelectAlert.map((item, index) => (
                        <option
                          key={index}
                          value={item.AltId}
                          label=''
                          style={{
                            background: item.AltColorAle,
                            fontWeight: "700",
                          }}>
                          {item.AltNomAle}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    error={error.min}
                    helperText={message.min}
                    variant='outlined'
                    margin='normal'
                    type='number'
                    name='PmtMinPar'
                    size='small'
                    id='min'
                    label='Valor mínimo'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.PmtMinPar}
                    onChange={eventinput}
                    onKeyUp={evalinput}
                  />
                  <TextField
                    error={error.max}
                    helperText={message.max}
                    variant='outlined'
                    margin='normal'
                    type='number'
                    name='PmtMaxPar'
                    size='small'
                    id='max'
                    label='Valor máximo'
                    fullWidth
                    autoFocus
                    required
                    value={dataSelect.PmtMaxPar}
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
              Detalles Parámetro
            </ModalHeader>
            <ModalBody>
              <input type='hidden' name='PmtId' value={dataSelect.PmtId} />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='MdcId'
                label='Nombre del producto'
                fullWidth
                value={
                  dataSelect.MdcDescMed +
                  dataSelect.MdcPresenMed +
                  dataSelect.MdcConcenMed
                }
              />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='AltId'
                label='Nombre de la alerta'
                fullWidth
                value={dataSelect.AltNomAle}
              />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='PmtMinPAr'
                label='Valor mínimo'
                fullWidth
                value={dataSelect.PmtMinPar}
              />
              <TextField
                disabled
                variant='standard'
                margin='normal'
                type='text'
                size='small'
                id='PmtMaxPar'
                label='Valor máximo'
                fullWidth
                value={dataSelect.PmtMaxPar}
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
            title={"Guardar parámetro"}
            alertTitle={"¿Está seguro de asignar el parámetro:"}
            alertText={dataProduct.MdcDescMed + "  con  " + dataAlert.AltNomAle}
            showModal={showModalSave}
            actionUser={(e) => newParameter(e)}
            abrirCerrarModal={abrirCerrarModalSave}
          />
          {/* Modal para confirmación antes de actualizar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Actualizar parámetro"}
            alertTitle={"¿Está seguro de asignar el parámetro:"}
            alertText={dataProduct.MdcDescMed + "  con  " + dataAlert.AltNomAle}
            showModal={showModalActual}
            actionUser={(e) => updateParameter(e)}
            abrirCerrarModal={abrirCerrarModalActual}
          />
          {/* Modal para confirmación antes de eliminar un registro */}
          <AllAlerts
            alertClass={"confirm"}
            alertType={"warning"}
            title={"Eliminar parámetro"}
            alertTitle={"¿Está seguro de eliminar el parámetro:"}
            alertText={dataProduct.MdcDescMed + "  con  " + dataAlert.AltNomAle}
            showModal={showModalDelete}
            actionUser={deleteParameter}
            abrirCerrarModal={abrirCerrarModalDelete}
          />
        </Grid>
        <Footer />
      </main>
    </div>
  );
};

export default ParameterData;
