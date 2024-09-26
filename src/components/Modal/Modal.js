import React from "react";
import "./Modal.scss";

const Modal = (props) => {
  return (
    <div className='ModalWindow'>
      <div className='ModalTitleContainer'>
        <span className='ModalTitleStyle'>Delete this note?</span>
      </div>
      <div className='ModalButtons'>
        <button onClick={props.cancelHandler} className='ModalCancelButton'>
          Cancel
        </button>
        <button onClick={props.yesHandler} className='ModalYesButton'>
          Yes
        </button>
      </div>
    </div>
  );
};

export default Modal;
