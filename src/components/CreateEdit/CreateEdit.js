import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "./CreateEdit.scss";

const CreateEdit = props => {
    const history = useHistory();
    let defaultNotes;

    if (props.action === "edit") {
        defaultNotes = props.selectedNote;
    } else {
        defaultNotes = {
            id: props.lastId + 1,
            title: "",
            context: "",
            status: false,
            color: ""
        };
    }

    const [currentNote, setCurrentNote] = useState(defaultNotes);
    const [selectedColor, setSelectedColor] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);

    //save input values
    const onFormChange = e => {
        const note = {...currentNote};

        note[e.target.name] = e.target.value;

        setCurrentNote(note);
    };

    useEffect( () => {
        console.log(currentNote);
        if (currentNote.title && currentNote.context && selectedColor){
            setBtnDisabled(false);
        }else{
            setBtnDisabled(true);
        }
    }, [currentNote],selectedColor);

    const setColor = color => {
        const note = {...currentNote};

        note.color = color;

        setCurrentNote(note);
        setSelectedColor(color);
    };

    const isActive = name => {
        return name === selectedColor ? {border: "3px solid cornflowerblue", width: "44px", height: "44px"} : {};
    };

    const formSubmitHandler = e => {
        props.onFormSubmit(e, currentNote);
        history.push("/");
    };

    return (
        <form
            className={"create-edit-form"}
            onSubmit={formSubmitHandler}
            onChange={onFormChange}
        >
            <h1 className={"form-title"}>Fill data</h1>

            <input
                name='title'
                type='text'
                defaultValue={currentNote.title}
                className={"title"}
            />

            <textarea
                name='context'
                id='1'
                cols='30'
                rows='10'
                defaultValue={currentNote.context}
                className={"context"}
            />

            <div className='color-buttons'>
                <p>Color:</p>

                <div
                    className={"button-green"}
                    style={isActive("rgb(213, 232, 212)")}
                    onClick={() => setColor("rgb(213, 232, 212)")}
                >
                </div>

                <div
                    className={"button-blue"}
                    style={isActive("rgb(218, 232, 252)")}
                    onClick={() => setColor("rgb(218, 232, 252)")}
                >
                </div>

                <div
                    className={"button-yellow"}
                    style={isActive("rgb(255, 242, 204)")}
                    onClick={() => setColor("rgb(255, 242, 204)")}
                >
                </div>

                <div
                    className={"button-red"}
                    style={isActive("rgb(248, 206, 204)")}
                    onClick={() => setColor("rgb(248, 206, 204)")}
                >
                </div>

            </div>

            <input
                disabled={btnDisabled}
                type='submit'
                value={props.action ? props.action.toUpperCase() : "CREATE"}
                className={'create-edit-button'}
            />
        </form>
    );
};
export default CreateEdit;
