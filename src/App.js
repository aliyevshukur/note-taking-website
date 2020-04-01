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
            selectedId: null,
            selectedNote: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/notes')
            .then(response => response.json())
            .then(result => {
                this.setState({
                    notes: result
                })
            });
        this.FilterActual();
        this.FilterArchive();
    }

    FilterActual = () =>  {
        const actual = this.state.notes;
        this.setState({
            currentNotes: actual.filter((item)=> item.status !== false)
        }
    )
    };

    FilterArchive = () =>  {
        const actual = this.state.notes;
        this.setState({
                currentNotes: actual.filter((item)=> item.status !== true)
            }
        )
    };

    NoteSelectHandler = (e) => {

    };

    render() {
        return (
            <>
                <Header/>
                <Switch>
                    <Route exact path={'/'} render={()=><NoteWrapper selectHandler={this.NoteSelectHandler} notes={this.state.currentNotes}/>}/>
                    <Route path={'/create'} render={CreateEdit}/>
                    <Route path={'/edit'} render={CreateEdit}/>
                    <Route path={`/notes/${this.state.selectedId}`} render={()=><SinglePage noteDetails={this.state.selectedNote}/>}/>
                </Switch>
            </>
        );
    }
}

export default App;
