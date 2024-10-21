import React, { useEffect, useState } from "react";
import { Sugar } from "react-preloaders";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Create from "./Routes/Create";
import Home from "./Routes/Home";
import Header from "./components/Header/Header";
import SinglePage from "./components/SinglePage/SinglePage";
import { fetchNotes } from "./db/fetchNotes";
import { updateNotes } from "./db/updateNotes";
import { IsModifiedContext, NotesContext } from "./utils/Contexts";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [action, setAction] = useState("");
  const [selectedNote, setSelectedNote] = useState(
    JSON.parse(localStorage.getItem("selectedItem")) || {},
  );
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("actual");

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = async () => {
    setLoading(true);
    const result = await fetchNotes();
    if (result.ok) {
      setNotes(result.notes);
    }
    setLoading(false);
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
        fetch(`${process.env.REACT_APP_API_URL}/notes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteToPost),
        })
          .then((response) => response.json())
          .then((result) => {
            getNotes();
            localStorage.setItem("notes", JSON.stringify(result.notes));
            toast.success("Note created");
          })
          .catch((err) => console.log("Error creating note: ", err));

        break;
      case "edit":
        fetch(`${process.env.REACT_APP_API_URL}/notes/${noteToPost._id}`, {
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
        })
          .then((res) => res.json())
          .then((result) => getNotes())
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
  const saveLayout = async () => {
    localStorage.setItem("notes", JSON.stringify(notes));
    const result = await updateNotes(notes);
    if (result.ok) toast.success("Layout saved");
    else toast.error("Error saving layout");
    setIsModified(false);
  };

  return (
    <NotesContext.Provider value={[notes, setNotes]}>
      <IsModifiedContext.Provider value={[isModified, setIsModified]}>
        <React.Fragment>
          <ToastContainer
            position='top-center'
            autoClose={2000}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme='colored'
          />
          <Header
            createHandler={createHandler}
            saveLayout={saveLayout}
            setFilter={setFilter}
          />
          <Switch>
            <Route
              exact
              path={"/"}
              render={() => (
                <Home
                  setSingleNote={setSingleNote}
                  loading={loading}
                  filter={filter}
                />
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
                  notes={notes}
                  setNotes={setNotes}
                  addCurrentNote={getNotes}
                  editHandler={editHandler}
                />
              )}
            />
          </Switch>
        </React.Fragment>
        {/* <Sugar background={"#fff0ee"} animation={"slide"} time={1000} /> */}
      </IsModifiedContext.Provider>
    </NotesContext.Provider>
  );
}
