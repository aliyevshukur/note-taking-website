import React, { Component } from "react";
import { Lines } from "react-preloaders";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import "./App.scss";
import CreateEdit from "./components/CreateEdit/CreateEdit";
import Header from "./components/Header/Header";
import NoteWrapper from "./components/NoteWrapper/NoteWrapper";
import SinglePage from "./components/SinglePage/SinglePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotes: JSON.parse(localStorage.getItem("notes")) || [],
      renderedNotes: [],
      action: "",
      selectedNote: JSON.parse(localStorage.getItem("selectedItem")) || {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  //Get notes data and assign to state
  fetchData = () => {
    fetch("https://note-taking-website-server.vercel.app/notes")
      .then((response) => response.json())
      .then((result) => {
        console.log(`Result: ${JSON.stringify(result)}`);
        localStorage.setItem("notes", JSON.stringify(result));
        this.setState({
          loading: false,
        });
        this.setState({
          allNotes: result,
        });
        this.renderActualNotes();
      });
  };

  //Filter notes that isArchived is false and set to actualNotes
  renderActualNotes = () => {
    const allNotesData = [...this.state.allNotes];

    this.setState({
      renderedNotes: allNotesData.filter((note) => note.isArchived === false),
    });
  };

  //Filter notes that status is true and set to archivedNotes
  renderArchivedNotes = () => {
    const allNotesData = [...this.state.allNotes];

    this.setState({
      renderedNotes: allNotesData.filter((notes) => notes.isArchived === true),
    });
  };

  //Write selected note to localStore
  setSingleNote = (note) => {
    localStorage.setItem("selectedItem", JSON.stringify(note));
    this.setState({
      selectedNote: note,
    });
  };

  //Create post request and update json file
  onFormSubmit = (e, noteToPost) => {
    e.preventDefault();
    switch (this.state.action) {
      case "create":
        fetch("https://note-taking-website-server.vercel.app/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteToPost),
        })
          .then((response) => response.json())
          .then((note) => {
            this.fetchData();
            this.renderActualNotes();
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
          .then(() => this.fetchData())
          .catch((err) => {
            console.log(`Error updating note ${err}`);
          });
        break;
      default:
        return "there is error in status";
    }
  };

  //Handler for setting action to create
  createHandler = () => {
    this.setState({ action: "create" });
  };

  //Handler for setting action to create
  editHandler = () => {
    this.setState({ action: "edit" });
  };
  render() {
    return (
      <React.Fragment>
        <Header
          filterActual={this.renderActualNotes}
          filterArchive={this.renderArchivedNotes}
          createHandler={this.createHandler}
        />
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => (
              <NoteWrapper
                notes={this.state.renderedNotes}
                setSingleNote={this.setSingleNote}
              />
            )}
          />
          <Route
            path={"/create-edit"}
            render={() => {
              return (
                <CreateEdit
                  onFormSubmit={this.onFormSubmit}
                  action={this.state.action}
                  selectedNote={this.state.selectedNote}
                  lastId={
                    this.state.allNotes[this.state.allNotes.length - 1].id
                  }
                />
              );
            }}
          />
          <Route
            path={`/notes/:${this.state.selectedNote.id}`}
            render={() => (
              <SinglePage
                note={this.state.selectedNote}
                addCurrentNote={this.fetchData}
                editHandler={this.editHandler}
              />
            )}
          />
        </Switch>
        {/* <Lines customLoading={this.state.loading} /> */}
      </React.Fragment>
    );
  }
}

export default App;
