import React from "react";
import "./CreateEdit.scss";

class CreateEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: {
        id: props.lastId + 1,
        title: "",
        context: "",
        status: false,
        color: ""
      },
      titleDefaultValue: "",
      contextDefaultValue: ""
    };
  }

  componentDidMount() {
    // fill the form if action type is edit
    console.log(this.props.selectedNote);
    if (this.props.action === "edit") {
      this.setState({
        titleDefaultValue: this.props.selectedNote.title,
        contextDefaultValue: this.props.selectedNote.context
      });
      console.log("yup");
    }
  }
  //save input values
  onFormChange = e => {
    const currentNote = { ...this.state.currentNote };
    console.log("before", currentNote);

    // Object.keys(currentNote).forEach(k => {
    //   if (k === e.target.name) {
    //     currentNote[k] = e.target.value;
    //     console.log("sdsdsdadasdasdawewedw");
    //   }
    // });

    currentNote[e.target.name] = e.target.value;

    console.log(currentNote);

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
          this.props.onFormSubmit(e, this.state.currentNote, this.props.action);
          console.log(this.state.currentNote);
        }}
        onChange={this.onFormChange}
      >
        <h1 className={"form-title"}>Fill data</h1>

        <input
          name="title"
          type="text"
          defaultValue={this.state.titleDefaultValue}
          className={"title"}
        />

        <textarea
          name="context"
          id="1"
          cols="30"
          rows="10"
          defaultValue={this.state.contextDefaultValue}
          className={"context"}
        />

        <div className="color-buttons">
          <p>Color:</p>

          <div
            className="button-green"
            onClick={() => this.setColor("#D5E8D4")}
          ></div>
          <div
            className="button-blue"
            onClick={() => this.setColor("#DAE8FC")}
          ></div>
          <div
            className="button-yellow"
            onClick={() => this.setColor("#FFF2CC")}
          ></div>
          <div
            className="button-red"
            onClick={() => this.setColor("#F8CECC")}
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
