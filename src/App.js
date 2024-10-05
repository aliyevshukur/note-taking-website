import React, { useEffect, useState } from "react";
import { Sugar } from "react-preloaders";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import "./App.scss";
import Create from "./Routes/Create";
import Home from "./Routes/Home";
import Header from "./components/Header/Header";
import SinglePage from "./components/SinglePage/SinglePage";
import { updateNotes } from "./db/updateNotes";
import { IsModifiedContext, NotesLocalContext } from "./utils/Contexts";

export default function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [notesLocal, setNotesLocal] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [renderedNotes, setRenderedNotes] = useState([]);
  const [action, setAction] = useState("");
  const [selectedNote, setSelectedNote] = useState(
    JSON.parse(localStorage.getItem("selectedItem")) || {},
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    renderActualNotes();
  }, [allNotes]);

  //Get notes data and assign to state
  const fetchData = () => {
    setLoading(true);
    fetch("https://note-taking-website-server.vercel.app/notes")
      .then((response) => response.json())
      .then((resultRaw) => {
        let result = [];
        if (resultRaw.length >= 0) {
          result = [...resultRaw];
        }
        localStorage.setItem("notes", JSON.stringify(result));
        setAllNotes(result);
        renderActualNotes();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  //Filter notes that isArchived is false and set to actualNotes
  const renderActualNotes = () => {
    const actualNotes = allNotes.filter((note) => note.isArchived === false);
    setRenderedNotes(actualNotes);
  };

  //Filter notes that status is true and set to archivedNotes
  const renderArchivedNotes = () => {
    const archivedNotes = allNotes.filter((note) => note.isArchived === true);
    setRenderedNotes(archivedNotes);
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

  /**
   * Saves the current layout to local storage and to the server.
   * The save action is also used to mark the layout as not modified.
   */
  const saveLayout = () => {
    localStorage.setItem("notes", JSON.stringify(notesLocal));
    updateNotes(notesLocal);
    setIsModified(false);
  };
  return (
    <NotesLocalContext.Provider value={[notesLocal, setNotesLocal]}>
      <IsModifiedContext.Provider value={[isModified, setIsModified]}>
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
                <Home notes={renderedNotes} setSingleNote={setSingleNote} />
              )}
            />
            <Route
              path={"/create-edit"}
              render={() => {
                return (
                  <Create
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
        </React.Fragment>
        {/* <Sugar background={"#fff0ee"} animation={"slide"} time={1000} /> */}
      </IsModifiedContext.Provider>
    </NotesLocalContext.Provider>
  );
}
