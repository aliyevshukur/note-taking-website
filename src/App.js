import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
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
      selectedNote: {}
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/notes")
      .then(response => response.json())
      .then(result => {
        this.setState({
          notes: result
        });
        this.filterActual();
        console.log(this.state.currentNotes);
      });
  }

  filterActual = () => {
    const notesData = [...this.state.notes];

    const actualNotes = notesData.filter(note => {
      console.log(note.status);
      return note.status === false;
    });

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

  render() {
    return (
      <>
        <Header
          filterActual={this.filterActual}
          filterArchive={this.filterArchive}
        />
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => <NoteWrapper notes={this.state.currentNotes} />}
          />
          <Route path={"/create"} render={CreateEdit} />
          <Route path={"/edit"} render={CreateEdit} />
          <Route
            path={`/notes/:${this.state.selectedId}`}
            render={() => <SinglePage noteDetails={this.state.selectedNote} />}
          />
        </Switch>
      </>
    );
  }
}

export default App;
