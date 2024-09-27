import React, { useContext, useEffect, useState } from "react";
import { Lines } from "react-preloaders";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import "./App.scss";
import CreateEdit from "./components/CreateEdit/CreateEdit";
import Header from "./components/Header/Header";
import NoteWrapper from "./components/NoteWrapper/NoteWrapper";
import SinglePage from "./components/SinglePage/SinglePage";
import { updateNotes } from "./db/updateNotes";
import { NotesLocalContext } from "./utils/Contexts";

export default function App() {
  const [allNotes, setAllNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || [],
  );
  const [notesLocal, setNotesLocal] = useState(
    JSON.parse(localStorage.getItem("notes")) || [],
  );
  const [renderedNotes, setRenderedNotes] = useState([]);
  const [action, setAction] = useState("");
  const [selectedNote, setSelectedNote] = useState(
    JSON.parse(localStorage.getItem("selectedItem")) || {},
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  //Get notes data and assign to state
  const fetchData = () => {
    fetch("https://note-taking-website-server.vercel.app/notes")
      .then((response) => response.json())
      .then((resultRaw) => {
        const result = resultRaw ? resultRaw : [];
        console.log(`Result: ${JSON.stringify(result)}`);
        localStorage.setItem("notes", JSON.stringify(result));
        setLoading(false);
        setAllNotes(result);
        renderActualNotes();
      });
  };

  //Filter notes that isArchived is false and set to actualNotes
  const renderActualNotes = () => {
    const allNotesData = [...allNotes];
    setRenderedNotes(allNotesData.filter((note) => note.isArchived === false));
  };

  //Filter notes that status is true and set to archivedNotes
  const renderArchivedNotes = () => {
    const allNotesData = [...allNotes];
    setRenderedNotes(allNotesData.filter((notes) => notes.isArchived === true));
  };

  //Write selected note to localStore
  const setSingleNote = (note) => {
    localStorage.setItem("selectedItem", JSON.stringify(note));
    setSelectedNote(note);
  };

  //Create post request and update json file
  const onFormSubmit = (e, noteToPost) => {
    e.preventDefault();
    switch (action) {
      case "create":
        fetch("https://note-taking-website-server.vercel.app/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteToPost),
        })
          .then((response) => response.json())
          .then((notes) => {
            localStorage.setItem("notes", JSON.stringify(notes));
            console.log("Created note: ", notes);
            setAllNotes(notes);
            renderActualNotes();
          })
          .catch((err) => console.log("Error creating note: ", err));

        break;
      case "edit":
        fetch(
          `https://note-taking-website-server.vercel.app/notes/${noteToPost._id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              ...noteToPost,
              title: noteToPost.title,
              context: noteToPost.context,
              color: noteToPost.color,
            }),
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          },
        )
          .then((result) => result.json())
          .then(() => fetchData())
          .catch((err) => {
            console.log(`Error updating note ${err}`);
          });
        break;
      default:
        return "there is error in status";
    }
  };

  //Handler for setting action to create
  const createHandler = () => {
    setAction("create");
  };

  //Handler for setting action to create
  const editHandler = () => {
    setAction("edit");
  };

  const saveLayout = () => {
    localStorage.setItem("notes", JSON.stringify(notesLocal));
    updateNotes();
  };

  return (
    <NotesLocalContext.Provider value={[notesLocal, setNotesLocal]}>
      <React.Fragment>
        <Header
          filterActual={renderActualNotes}
          filterArchive={renderArchivedNotes}
          createHandler={createHandler}
          saveLayout={saveLayout}
        />
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => (
              <NoteWrapper
                notes={renderedNotes}
                setSingleNote={setSingleNote}
              />
            )}
          />
          <Route
            path={"/create-edit"}
            render={() => {
              return (
                <CreateEdit
                  onFormSubmit={onFormSubmit}
                  action={action}
                  selectedNote={selectedNote}
                />
              );
            }}
          />
          <Route
            path={`/notes/:${selectedNote.id}`}
            render={() => (
              <SinglePage
                note={selectedNote}
                addCurrentNote={fetchData}
                editHandler={editHandler}
              />
            )}
          />
        </Switch>
        <Lines customLoading={loading} />
      </React.Fragment>
    </NotesLocalContext.Provider>
  );
}
