import React, { Component } from "react";
import Search from "./components/search";
import Table from "./components/table";
import JSON from "./db.json";
import "./app.css";

const list = JSON;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      list: list
    };
  }

  onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  isSearched = searchTerm => {
    return function(item) {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
  };

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        {" "}
        <div className="interactions">
          {" "}
          <Search value={searchTerm} onChange={this.onSearchChange}>
            {" "}
            Search{" "}
          </Search>{" "}
        </div>
        <Table
          searching={this.isSearched}
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;
