import React, {Component} from "react";
import "./App.css";
import {Route} from "react-router-dom";
import {Switch} from "react-router";
import SinglePage from "./components/SinglePage/SinglePage";
import NoteWrapper from "./components/NoteWrapper/NoteWrapper";
import CreateEdit from "./components/CreateEdit/CreateEdit";
import Header from "./components/Header/Header";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            currentNotes: [],
            action: "",
            selectedNote: JSON.parse(localStorage.getItem('selectedItem')) || {}
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch("http://localhost:3001/notes")
            .then(response => response.json())
            .then(result => {
                this.setState({
                    notes: result
                });
                this.filterActual();
            });
    }

    filterActual = () => {
        const notesData = [...this.state.notes];

        const actualNotes = notesData.filter(note => note.status === false);

        this.setState({
            currentNotes: actualNotes
        });
    };

    filterArchive = () => {
        const notesData = [...this.state.notes];
        this.setState({
            currentNotes: notesData.filter(notes => notes.status === true)
        });
    };

    setSingleNote = note => {
        localStorage.setItem('selectedItem', JSON.stringify(note));
        this.setState({
            selectedNote: note
        });
    };

  //Create post request and update json file (not working)
  onFormSubmit = (e, noteToPost) => {
    e.preventDefault();

    switch (this.state.action) {
      case "create":
        fetch("http://localhost:3001/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteToPost)
        })
          .then(response => response.json())
          .then(() => this.fetchData());
        console.log("create");

        break;
      case "edit":
        fetch(`http://localhost:3001/notes/${noteToPost.id}`, {
          method: "PATCH",
          headers: { "Content-type": "appliaction/json" },
          body: JSON.stringify(noteToPost)
        })
          .then(result => result.json())
          .then(data => console.log(data, "success"));
        break;
    }
  };

    //Handler for setting action to create (handler for edit button needs to be created like this)
    createHandler = () => {
        this.setState({
            action: "create"
        });
    };

    editHandler = () => {
        this.setState({
            action: "edit"
        })
    };

  render() {
    return (
      <>
        <Header
          filterActual={this.filterActual}
          filterArchive={this.filterArchive}
          createHandler={this.createHandler}
        />
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => (
              <NoteWrapper
                notes={this.state.currentNotes}
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
                  lastId={this.state.notes[this.state.notes.length - 1].id}
                />
              );
            }}
          />
          <Route
            path={`/notes/:${this.state.selectedNote.id}`}
            render={() => (
              <SinglePage
                noteDetails={this.state.selectedNote}
                addCurrentNote={this.fetchData}
                editHandler={this.editHandler}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default App;
