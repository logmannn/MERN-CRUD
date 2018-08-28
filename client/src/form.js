import React from "react";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

export default class Form extends React.Component {
  state = {
    text: ""
  };

  handleChange = e => {
    const newText = e.target.value;
    this.setState({
      text: newText
    });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.submit(this.state.text);
      this.setState({ text: "" });
    }
  };

  submitChange = e => {
    this.props.submit(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "1rem"
        }}
      >
        <TextField
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          label="todo..."
          margin="normal"
          value={text}
        />
        <Button
          variant="fab"
          color="primary"
          onClick={this.submitChange}
          style={{
            background: "#2196f3",
            marginLeft: "2rem"
          }}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}
