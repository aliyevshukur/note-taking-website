import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "./CreateEdit.scss";

const CreateEdit = props => {
    const history = useHistory();
    let defaultNote;

    if (props.action === "edit") {
        defaultNote = props.selectedNote;
    } else {
        defaultNote = {
            id: props.lastId + 1,
            title: "",
            context: "",
            status: false,
            color: ""
        };
    }

    const [currentNote, setCurrentNote] = useState(defaultNote);
    const [selectedColor, setSelectedColor] = useState(defaultNote.color);
    const [btnDisabled, setBtnDisabled] = useState(true);

    //save input values
    const onFormChange = e => {
        const note = {...currentNote};

        note[e.target.name] = e.target.value;

        setCurrentNote(note);
    };

    useEffect(() => {
        if (currentNote.title && currentNote.context && selectedColor) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [currentNote, selectedColor]);

    //Set note color
    const setColor = color => {
        const note = {...currentNote};

        note.color = color;

        setCurrentNote(note);
        setSelectedColor(color);
    };

    //Return border color if button is active
    const isActive = name => {
        return name === selectedColor ? {border: "4px solid #0A84FF", margin: "6px"} : {};
    };

    //Trigger parents form handler and redirect to home page
    const formSubmitHandler = e => {
        props.onFormSubmit(e, currentNote);
        history.push("/");
    };

    return (
        <div className="form-wrapper">
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
                        style={isActive("rgb(213,232,212)")}
                        onClick={() => setColor("rgb(213,232,212)")}
                    >
                    </div>

                    <div
                        className={"button-blue"}
                        style={isActive("rgb(218,232,252)")}
                        onClick={() => setColor("rgb(218,232,252)")}
                    >
                    </div>

                    <div
                        className={"button-yellow"}
                        style={isActive("rgb(255,242,204)")}
                        onClick={() => setColor("rgb(255,242,204)")}
                    >
                    </div>

                    <div
                        className={"button-red"}
                        style={isActive("rgb(248,206,204)")}
                        onClick={() => setColor("rgb(248,206,204)")}
                    >
                    </div>

                </div>

                <input
                    disabled={btnDisabled}
                    type='submit'
                    value={props.action === 'edit' ? "SAVE" : "CREATE"}
                    className={'create-edit-button'}
                />
            </form>
        </div>
    );
};
export default CreateEdit;
