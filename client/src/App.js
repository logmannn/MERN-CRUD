import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { log } from "util";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Form from "./form";
import FormUpdateText from "./formUpdateText";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";

const TodosQuery = gql`
  {
    todos {
      complete
      id
      text
    }
  }
`;

const Flex = styled.div`
  display: flex;
`;

const UpdateMutation = gql`
  mutation($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete)
  }
`;

const RemoveMutation = gql`
  mutation($id: ID!) {
    removeTodo(id: $id)
  }
`;

const CreateTodoMutation = gql`
  mutation($text: String!) {
    createTodo(text: $text) {
      id
      text
      complete
    }
  }
`;

const UpdateTextMutation = gql`
  mutation($id: ID!, $text: String!) {
    updateTodoText(id: $id, text: $text)
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.updateTodoText = this.updateTodoText.bind(this);
  }

  updateTodo = async todo => {
    await this.props.updateTodo({
      variables: {
        id: todo.id,
        complete: !todo.complete
      },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos = data.todos.map(
          x =>
            x.id === todo.id
              ? {
                  ...todo,
                  complete: !todo.complete
                }
              : x
        );
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  updateTodoText = async todo => {
    // console.log(todo);
    await this.props.updateTodoText({
      variables: {
        id: todo.id,
        text: todo.text,
        complete: todo.complete
      },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.

        data.todos = data.todos.map(
          x =>
            x.id === todo.id
              ? {
                  ...todo,
                  text: todo.text,
                  complete: todo.complete
                }
              : x
        );
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  removeTodo = async todo => {
    await this.props.removeTodo({
      variables: {
        id: todo.id
      },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos = data.todos.filter(x => x.id !== todo.id);
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  createTodo = async text => {
    await this.props.createTodo({
      variables: {
        text
      },
      update: (store, { data: { createTodo } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos.unshift(createTodo);
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  render() {
    const {
      data: { loading, todos }
    } = this.props;
    if (loading) {
      return null;
    }
    return (
      <Flex>
        <div style={{ margin: "auto", width: 400 }}>
          <Paper elevation={1}>
            <Form submit={this.createTodo} />
            <List>
              {todos.map(todo => (
                <ListItem key={todo.id} role={undefined} dense button>
                  <Checkbox
                    checked={todo.complete}
                    tabIndex={-1}
                    disableRipple
                    onClick={() => this.updateTodo(todo)}
                  />
                  <FormUpdateText
                    text={todo.text}
                    id={todo.id}
                    complete={todo.complete}
                    onSubmit={todo => this.updateTodoText(todo)}
                  />
                  <IconButton onClick={() => this.removeTodo(todo)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
      </Flex>
    );
  }
}

export default compose(
  graphql(CreateTodoMutation, { name: "createTodo" }),
  graphql(RemoveMutation, { name: "removeTodo" }),
  graphql(UpdateMutation, { name: "updateTodo" }),
  graphql(UpdateTextMutation, { name: "updateTodoText" }),
  graphql(TodosQuery)
)(App);
