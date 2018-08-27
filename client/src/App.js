import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

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

class App extends Component {
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
            {todos.map(todo => (
              <div key={todo.id}>
                {todo.text} {todo.complete.toString()}
              </div>
            ))}
          </Paper>
        </div>
      </Flex>
    );
  }
}

export default graphql(TodosQuery)(App);
