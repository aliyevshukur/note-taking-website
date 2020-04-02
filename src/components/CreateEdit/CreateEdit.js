import React from "react";
import "./CreateEdit.scss";

class CreateEdit extends React.Component {
  constructor(props) {
    super(props);

    this.titleDefaultValue = "";
    this.contextDefaultValue = "";

    if (props.action === "edit") {
      this.state = {
        currentNote: { ...props.selectedNote }
      };
    } else {
      this.state = {
        currentNote: {
          id: props.lastId + 1,
          title: "",
          context: "",
          status: false,
          color: ""
        }
      };
    }
  }
  //save input values
  onFormChange = e => {
    const currentNote = { ...this.state.currentNote };

    currentNote[e.target.name] = e.target.value;

    this.setState({ currentNote });
  };

  setColor = color => {
    const currentNote = { ...this.state.currentNote };

    currentNote.color = color;

    this.setState({ currentNote });
  };

  render() {
    return (
      <form
        className={"create-edit-form"}
        onSubmit={e => {
          this.props.onFormSubmit(e, this.state.currentNote);
          console.log(this.state.currentNote);
        }}
        onChange={this.onFormChange}
      >
        <h1 className={"form-title"}>Fill data</h1>

        <input
          name="title"
          type="text"
          defaultValue={this.state.currentNote.title}
          className={"title"}
        />

        <textarea
          name="context"
          id="1"
          cols="30"
          rows="10"
          defaultValue={this.state.currentNote.context}
          className={"context"}
        />

        <div className="color-buttons">
          <p>Color:</p>

          <div
            className="button-green"
            onClick={() => this.setColor("rgb(213,232,212)")}
          ></div>
          <div
            className="button-blue"
            onClick={() => this.setColor("rgb(218,232,252)")}
          ></div>
          <div
            className="button-yellow"
            onClick={() => this.setColor("rgb(255,242,204)")}
          ></div>
          <div
            className="button-red"
            onClick={() => this.setColor("rgb(248,206,204)")}
          ></div>
        </div>

        <input
          type="submit"
          value={this.props.action ? this.props.action.toUpperCase() : "CREATE"}
          className="create-edit-button"
        />
      </form>
    );
  }
}

export default CreateEdit;
