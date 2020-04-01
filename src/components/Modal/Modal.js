import React from 'react';

const Modal = (props) => {
    return (
        <div className="ModalWindow">
            <p>Delete this note?</p>
            <div className="ModalButtons">
            <button onClick={props.cancelHandler} className="ModalCancelButton">Cancel</button>
            <button onClick={props.yesHandler} className="ModalYesButton">Yes</button>
            </div>
        </div>
    );
};

export default Modal;