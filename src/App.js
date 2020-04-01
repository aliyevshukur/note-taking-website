import React, {Component} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router';
import SinglePage from "./components/SinglePage/SinglePage";
import NoteWrapper from './components/NoteWrapper/NoteWrapper'
import CreateEdit from "./components/CreateEdit/CreateEdit";
import Header from "./components/Header/Header";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            currentNotes: [],
            selectedNote: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/notes')
            .then(response => response.json())
            .then(result => {
                this.setState({
                    notes: result
                });
                this.filterActual();
            });
    }

    filterActual = () =>  {
        const actual = this.state.notes;
        this.setState({
            currentNotes: actual.filter((item)=> item.status === "false")
        }
    )
    };

    filterArchive = () =>  {
        const actual = this.state.notes;
        this.setState({
                currentNotes: actual.filter((item)=> item.status === "true")
            }
        )
    };

    render() {
        return (
            <>
                <Header/>
                <Switch>
                    <Route exact path={'/'} render={()=><NoteWrapper selectHandler={this.NoteSelectHandler} notes={this.state.currentNotes}/>}/>
                    <Route path={'/create'} render={CreateEdit}/>
                    <Route path={'/edit'} render={CreateEdit}/>
                    <Route path={`/notes/${this.state.selectedNote.id}`} render={()=><SinglePage noteDetails={this.state.selectedNote}/>}/>
                </Switch>
            </>
        );
    }
}

export default App;
