import React, { useState } from "react";
import { useHistory } from "react-router";
import Modal from "../Modal/Modal";
import "./SinglePage.scss";

const SinglePage = (props) => {
  const noteStyle = {
    backgroundColor: `${props.note.color}`,
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
      `https://note-taking-website-server.vercel.app/notes/${props.note._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...props.note,
          isArchived: true,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    )
      .then((response) => response.json())
      .then((result) => {
        props.addCurrentNote();
        history.goBack();
      });
  };

  //request server for delete  note
  const deleteButtonHandler = () => {
    setModalActive(true);
  };

  // Modal window Yes Handler
  const deleteSingleNote = () => {
    console.log(`ID: ${props.note._id}`);
    fetch(
      `https://note-taking-website-server.vercel.app/notes/${props.note._id}`,
      {
        method: "DELETE",
      },
    )
      .then((res) => res.text()) // or res.json()
      .then(() => {
        props.addCurrentNote();
        history.goBack();
      })
      .catch((err) => {});
    setModalActive(false);
  };

  //Hide modal window on cancel
  const cancelButtonHandler = () => {
    setModalActive(false);
  };

  return (
    <div className='notesContainer'>
      <div className='notes' style={noteStyle}>
        <div>
          {/* <img
            src={pinImage}
            alt={"pin_img"}
            height={"67px"}
            width={"70px"}
            style={{ margin: "0px auto" }}
          /> */}
          <h1 className='notes-title'>{props.note.title}</h1>
        </div>
        <div className='singleContext'>
          <span>{props.note.context} </span>
        </div>
      </div>

      <div className='notesButtons'>
        <button className='buttonDesign' onClick={editButtonHandler}>
          Edit
        </button>
        <button className='buttonDesign' onClick={archiveButtonHandler}>
          Archive
        </button>
        <button className='buttonDesign' onClick={deleteButtonHandler}>
          Delete
        </button>
      </div>
      {modalActive ? (
        <Modal
          yesHandler={deleteSingleNote}
          cancelHandler={cancelButtonHandler}
        />
      ) : null}
    </div>
  );
};

export default SinglePage;
