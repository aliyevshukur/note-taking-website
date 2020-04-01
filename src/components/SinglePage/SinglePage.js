import React, {useState} from "react";
import {useHistory} from "react-router";
import "./SinglePage.scss";
import Modal from "../Modal/Modal";

const SinglePage = props => {
    const noteStyle = {
        backgroundColor: `${props.noteDetails.color}`,
        border: `1px solid ${props.noteDetails.color}`
    };

    const noteTitleStyle = {
        borderBottom: `1px solid ${props.noteDetails.color}`
    };

    const history = useHistory(),
        [modalActive, setModalActive] = useState(false);

    //redirect to CreateEdit page
    const editButtonHandler = () => {
        history.replace("/create-edit");
    };
    console.log(props.noteDetails)
    //request server for update status of note
    const archiveButtonHandler = () => {
        fetch("http://localhost:3001/notes/" + props.noteDetails.id, {
            method: "PATCH",
            body: JSON.stringify({
                status: true
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
        <div className="notesContainer">
            <div className="notes"
                    style={noteStyle}
                >
                    <h1 style={noteTitleStyle} className="notes-title">
                        {props.noteDetails.title}
                    </h1>
                    <span className="singleContext">{props.noteDetails.context}</span>
                </div>

            <div
                className="notesButtons"
            >
                <button  className="buttonDesign" onClick={editButtonHandler}>Edit</button>
                <button  className="buttonDesign" onClick={archiveButtonHandler}>Archive</button>
                <button  className="buttonDesign" onClick={deleteButtonHandler}>Delete</button>
            </div>
            {modalActive ? <Modal yesHandler={yesButtonHandler} cancelHandler={cancelButtonHandler}/> : null}
        </div>
    );
};

export default SinglePage;
