import React, {Component} from "react";
import "./App.scss";
import {Route} from "react-router-dom";
import {Switch} from "react-router";
import {Lines} from 'react-preloaders'
import SinglePage from "./components/SinglePage/SinglePage";
import NoteWrapper from "./components/NoteWrapper/NoteWrapper";
import CreateEdit from "./components/CreateEdit/CreateEdit";
import Header from "./components/Header/Header";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            currentNotes: [],
            action: "",
            selectedNote: JSON.parse(localStorage.getItem("selectedItem")) || {},
            loading: true
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    //Get notes data and assign to state
    fetchData = () => {
        fetch("http://localhost:3001/notes")
            .then(response => response.json())
            .then(result => {
                localStorage.setItem('notes', JSON.stringify(result));
                this.setState({
                    loading: false
                });
                this.setState({
                    notes: result
                });
                this.filterActual();
            });
    };

    //Filter notes that status is false and set to currentNotes (Showed notes)
    filterActual = () => {
        const notesData = [...this.state.notes];

        this.setState({
            currentNotes: notesData.filter(note => note.status === false)
        });
    };

    //Filter notes that status is true and set to currentNotes (Showed notes)
    filterArchive = () => {
        const notesData = [...this.state.notes];

        this.setState({
            currentNotes: notesData.filter(notes => notes.status === true)
        });
    };

    //Write selected note to localStore
    setSingleNote = note => {
        localStorage.setItem("selectedItem", JSON.stringify(note));
        this.setState({
            selectedNote: note
        });
    };

    //Create post request and update json file
    onFormSubmit = (e, noteToPost) => {
        e.preventDefault();
        switch (this.state.action) {
            case "create":
                fetch("http://localhost:3001/notes", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(noteToPost)
                })
                    .then(response => response.json())
                    .then((data) => {
                        const newNotes = [...this.state.notes];
                        newNotes.push(data);
                        this.setState({notes: newNotes});
                        this.filterActual();
                    });

                break;
            case "edit":
                fetch(`http://localhost:3001/notes/${noteToPost.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        title: noteToPost.title,
                        context: noteToPost.context,
                        color: noteToPost.color
                    }),
                    headers: {"Content-type": "application/json"}
                })
                    .then(result => result.json())
                    .then(() => this.fetchData());
                break;
            default :
                return ("there is error in status");
        }
    };

    //Handler for setting action to create
    createHandler = () => {
        this.setState({action: "create"});
    };

    //Handler for setting action to create
    editHandler = () => {
        this.setState({action: "edit"});
    };

    //Get darker color of passed color
    createBorderColor = (color) => {
        let secondColor = color.slice(4, 15);
        let arr = secondColor.split(',');
        arr = arr.map(el => parseInt(el) - 70);
        secondColor = `rgb(${arr[0]},${arr[1]},${arr[2]})`;
        return secondColor;
    };

    render() {
        return (
            <React.Fragment>
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
                                createBorderColor={this.createBorderColor}
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
                                createBorderColor={this.createBorderColor}
                            />
                        )}
                    />
                </Switch>
                <Lines customLoading={this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default App;
