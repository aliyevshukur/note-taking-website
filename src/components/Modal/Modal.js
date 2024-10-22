import React from "react";
import "./Modal.scss";

const Modal = (props) => {
  return (
    <div className='ModalWindow'>
      <div className='ModalTitleContainer'>
        <span className='ModalTitleStyle'>Delete this note?</span>
      </div>
      <div className='ModalButtons'>
        <button onClick={props.yesHandler} className='ModalYesButton'>
          Delete
        </button>
        <button onClick={props.cancelHandler} className='ModalCancelButton'>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
