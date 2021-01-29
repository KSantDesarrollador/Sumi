import React, { useState } from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
// importando componentes
import ProgressBar from "./progressBar";

const stylesPage = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  modal: {
    marginTop: "20%",
    background: "rgba(255,255,255,0.4)",
    borderRadius: "15px",
  },
  modalHeaderDelete: {
    background: "#EF1146",
    color: "#f5f5f5",
  },
  modalFooter: {
    justifyContent: "center",
  },
}));

const AllAlerts = (props) => {
  const classList = stylesPage();

  const [show, setShow] = useState("alertHide");

  const showBar = async (e) => {
    setShow("alertShow");
    await props.actionUser(e);
    setShow("alertHide");
  };

  const closeAlert = () => {
    let alert = document.getElementById("al");
    alert.classList.replace("alertShow", "alertHide");
    props.changeState();
  };

  const closeBar = (e) => {
    setShow("alertHide");
    props.abrirCerrarModal(e);
  };

  if (props.alertClass === "info") {
    return (
      <div className={`${classList.root} alertShow`} id='al'>
        <Alert
          variant='filled'
          severity={props.alertType}
          action={
            <Button color='inherit' onClick={closeAlert}>
              <CloseIcon fontSize='inherit' />
            </Button>
          }>
          {props.alertText}
        </Alert>
      </div>
    );
  } else {
    // console.log(props.showModal);
    // if (props.showModal) {
    //   setShow("alertHide");
    // }

    return (
      <div className={classList.root}>
        {/* Modal para confirmación antes de eliminar un registro */}
        <Modal isOpen={props.showModal} className={classList.modal}>
          <ModalHeader className={classList.modalHeaderDelete}>
            <i
              className='zmdi zmdi-alert-triangle'
              style={{ fontSize: "30px" }}
            />
            &nbsp; {props.title}
          </ModalHeader>
          <ModalBody>
            <div className='mb-3'>
              <p>
                {props.alertTitle}&nbsp; &nbsp;
                <strong>{props.alertText}</strong>?
              </p>
            </div>
            <ProgressBar show={show} />
          </ModalBody>
          <ModalFooter className={classList.modalFooter}>
            <Button type='submit' color='success' size='md' onClick={showBar}>
              <Tooltip title='Confirmar' placement='left'>
                <i className='zmdi zmdi-save' />
              </Tooltip>
            </Button>{" "}
            <Button color='danger' size='md' onClick={closeBar}>
              <Tooltip title='Cancelar' placement='right'>
                <i className='zmdi zmdi-stop' />
              </Tooltip>
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default AllAlerts;
