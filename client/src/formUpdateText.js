import React from "react";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      id: this.props.id
    };
  }

  handleChange = e => {
    const newText = e.target.value;
    this.setState({
      text: newText
    });
  };

  handleKeyDown = e => {
    // console.log("formupdatetext: " + this.state.text);
    if (e.key === "Enter") {
      let test = {
        id: this.state.id,
        text: this.state.text,
        complete: this.state.complete,
        __typename: "Todo"
      };
      this.props.onSubmit(test);
    }
  };

  submitChange = e => {
    // console.log("formupdatetext: " + this.state.text);
    let test = {
      id: this.state.id,
      text: this.state.text,
      complete: this.state.complete,
      __typename: "Todo"
    };
    this.props.onSubmit(test);
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
        <ListItemText
          primary={
            <input
              defaultValue={this.props.text}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          }
        />
        <Button
          onClick={this.submitChange}
          variant="fab"
          color="secondary"
          aria-label="Edit"
        >
          <Icon style={{ content: "e625" }}>edit_icon</Icon>
        </Button>
      </div>
    );
  }
}
