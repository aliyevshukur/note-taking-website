import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { shiftZIndex } from "../../utils/shiftZIndex";
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
    fetch(`${process.env.REACT_APP_API_URL}/notes/${props.note._id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...props.note,
        isArchived: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        props.addCurrentNote();
        console.log(`resutl ${JSON.stringify(result.notes)}`);
        const notes = shiftZIndex(props.note._id, result.notes, "actual");
        props.setNotes(notes);
        localStorage.setItem("notes", JSON.stringify(notes));
        history.goBack();
      });
  };

  //request server for delete  note
  const deleteButtonHandler = () => {
    setModalActive(true);
  };

  // Modal window Yes Handler
  const deleteSingleNote = () => {
    fetch(`${process.env.REACT_APP_API_URL}/notes/${props.note._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        props.addCurrentNote();
        toast.success("Note deleted");
        history.goBack();
      })
      .catch((err) => {
        toast.error("Error deleting note");
      });
    setModalActive(false);
  };

  //Hide modal window on cancel
  const cancelButtonHandler = () => {
    setModalActive(false);
  };

  return (
    <div className='notesContainer'>
      <button onClick={() => history.goBack()} className='back-button'>
        {" "}
        &lt; Back
      </button>

      <div className='notes' style={noteStyle}>
        <div>
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
