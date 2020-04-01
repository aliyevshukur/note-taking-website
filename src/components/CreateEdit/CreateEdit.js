import React from "react";
import "./CreateEdit.scss";

class CreateEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.lastId + 1,
      title: "",
      context: "",
      status: false,
      color: ""
    };

    this.title = React.createRef();
    // this.context = React.createRef();
  }

  componentDidMount() {
    // fill the form if action type is edit
    if (this.props.action === "edit" && this.props.note) {
      this.title.current.value = this.props.note.title;
      this.context.current.value = this.props.note.context;
    }
  }
  //save input values
  onFormChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setColor = color => {
    this.setState({ color: color });
  };

  render() {
    return (
      <form
        className={"create-edit-form"}
        onSubmit={e => this.props.onFormSubmit(e, this.state)}
        onChange={this.onFormChange}
      >
        <h1 className={"form-title"}>Fill data</h1>

        <input name="title" type="text" ref={this.title} className={"title"} />

        <textarea
          name="context"
          id="1"
          cols="30"
          rows="10"
          // ref={this.context}
          className={"context"}
        ></textarea>

        <div className="color-buttons">
          <p>Color:</p>

          <div
            className="button-green"
            onClick={() => this.setColor("green")}
          ></div>
          <div
            className="button-blue"
            onClick={() => this.setColor("blue")}
          ></div>
          <div
            className="button-yellow"
            onClick={() => this.setColor("yellow")}
          ></div>
          <div
            className="button-red"
            onClick={() => this.setColor("red")}
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
