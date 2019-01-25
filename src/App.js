import React, { Component } from "react";
import Search from "./components/search";
import Table from "./components/table";
import "./app.css";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      result: null
    };
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories = result => {
    this.setState({
      result
    });
  };

  onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
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
    const { searchTerm, result } = this.state;
    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <div className="interactions">
          {" "}
          <Search value={searchTerm} onChange={this.onSearchChange}>
            {" "}
            Search{" "}
          </Search>{" "}
          <br />
          <span className="credit">Made By Umair Ahmed Bajwa</span>
        </div>
        {result ? <Table
          searching={this.isSearched}
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        /> : null }
      </div>
    );
  }
}

export default App;
