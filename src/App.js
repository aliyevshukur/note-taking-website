import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import SinglePage from "./components/SinglePage/SinglePage";
// import NoteWrapper from 'components/NoteWrapper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      actualNotes: [],
      archiveNotes: [],
      selectedId: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/notes")
      .then(response => response.json())
      .then(result => {
        this.setState({
          notes: result
        });
      });
    this.FilterActual();
    this.FilterArchive();
  }

  FilterActual = () => {
    const actual = this.state.notes;
    this.setState({
      actualNotes: actual.filter(item => item.status !== false)
    });
  };

  FilterArchive = () => {
    const actual = this.state.notes;
    this.setState({
      actualNotes: actual.filter(item => item.status !== true)
    });
  };

  render() {
    return (
      <>
        <Switch>
          <Route exact path={"/"} notes={this.state.actualNotes} />
          <Route path={"/archive"} notes={this.state.archiveNotes} />
          <Route path={"/create"} />
          <Route path={"/edit"} />
          <Route
            path={`/notes/${this.state.selectedId}`}
            component={SinglePage}
          />
        </Switch>
      </>
    );
  }
}

export default App;
