import React, { useState } from "react";
import { useHistory } from "react-router";
import "./SinglePage.scss";
import Modal from "../Modal/Modal";
import pinImage from "../../img/pin_PNG100.png";

const SinglePage = (props) => {
  const noteStyle = {
    backgroundColor: `${props.noteDetails.color}`,
    border: `1.5px solid ${props.createBorderColor(props.noteDetails.color)}`,
  };

  const noteTitleStyle = {
    borderBottom: `1.5px solid ${props.createBorderColor(
      props.noteDetails.color
    )}`,
  };

  const history = useHistory(),
    [modalActive, setModalActive] = useState(false);

  //redirect to CreateEdit page
  const editButtonHandler = () => {
    history.replace("/create-edit");
    props.editHandler();
  };
  //request server for update status of note
  const archiveButtonHandler = () => {
    fetch(
      "https://fake-server-app-note.herokuapp.com/notes/" +
        props.noteDetails.id,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        props.addCurrentNote();
        history.push("/");
      });
  };

  //request server for delete  note
  const deleteButtonHandler = () => {
    setModalActive(true);
  };

  // Modal window Yes Handler
  const yesButtonHandler = () => {
    fetch(
      "https://fake-server-app-note.herokuapp.com/notes/" +
        props.noteDetails.id,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.text()) // or res.json()
      .then(() => {
        props.addCurrentNote();
        history.push("/");
      });
    setModalActive(false);
  };

  //Hide modal window on cancel
  const cancelButtonHandler = () => {
    setModalActive(false);
  };

  return (
    <div className="notesContainer">
      <div className="notes" style={noteStyle}>
        <div style={noteTitleStyle}>
          <img
            src={pinImage}
            alt={"pin_img"}
            height={"67px"}
            width={"70px"}
            style={{ margin: "0px auto" }}
          />
          <h1 className="notes-title">{props.noteDetails.title}</h1>
        </div>
        <div className="singleContext">
          <span>{props.noteDetails.context}</span>
        </div>
      </div>

      <div className="notesButtons">
        <button className="buttonDesign" onClick={editButtonHandler}>
          Edit
        </button>
        <button className="buttonDesign" onClick={archiveButtonHandler}>
          Archive
        </button>
        <button className="buttonDesign" onClick={deleteButtonHandler}>
          Delete
        </button>
      </div>
      {modalActive ? (
        <Modal
          yesHandler={yesButtonHandler}
          cancelHandler={cancelButtonHandler}
        />
      ) : null}
    </div>
  );
};

export default SinglePage;
