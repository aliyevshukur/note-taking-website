import React from 'react';

const Modal = (props) => {
    return (
        <div className="ModalWindow">
            <p>Delete this note?</p>
            <div className="ModalButtons">
            <button onClick={props.cancelButtonHandler} className="ModalCancelButton">Cancel</button>
            <button onClick={props.yesButtonHandler} className="ModalYesButton">Yes</button>
            </div>
        </div>
    );
};

export default Modal;