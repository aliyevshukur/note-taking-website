import React, {useState} from "react";
import {useHistory} from "react-router";
import "./SinglePage.scss";
import Modal from "../Modal/Modal";
import Note from '../Note/Note'

const SinglePage = props => {
    const history = useHistory(),
        [modalActive, setModalActive] = useState(false);

    //redirect to CreateEdit page
    const editButtonHandler = () => {
        history.replace("/edit");
    };

    //request server for update status of note
    const archiveButtonHandler = () => {
        fetch("http://localhost:3001/notes/" + props.noteDetails.id, {
            method: "PATCH",
            body: JSON.stringify({
                status: false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(result => console.log(result));
    };

    //request server for delete  note
    const deleteButtonHandler = () => {
        setModalActive(true);
    };

    // Modal window Yes Handler
    const yesButtonHandler = () => {
        fetch('http://localhost:3001/notes/' + props.noteDetails.id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res));
        setModalActive(false);
    };
    const cancelButtonHandler = () => {
        setModalActive(false);
    };

    return (
        <div className="noteContainer">
            {
                props.notes.length > 0 ? <Note note={props.notes[0]}/> : null
            }
            <div className="noteButtons">
                <button  className="buttonDesign" onClick={editButtonHandler}>Edit</button>
                <button  className="buttonDesign" onClick={archiveButtonHandler}>Archive</button>
                <button  className="buttonDesign" onClick={deleteButtonHandler}>Delete</button>
            </div>
            {modalActive ? <Modal yesHandler={yesButtonHandler} cancelHandler={cancelButtonHandler}/> : null}
        </div>
    );
};

export default SinglePage;
