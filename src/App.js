import React, { Component } from "react";
import Search from "./components/search";
import Table from "./components/table";
import "./app.css";
import Button from "./widgets/button";

const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = "100";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      result: null
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}
    ${PATH_SEARCH}?
    ${PARAM_SEARCH}
    ${searchTerm}
    &${PARAM_PAGE}
    ${page}
    &${PARAM_HPP}
    ${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  setSearchTopStories = result => {
    const { hits, page } = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];

    this.setState({
      result: { hits: updatedHits, page }
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
    const page = (result && result.page) || 0;

    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <div className="interactions">
          {" "}
          <Search
            value={searchTerm}
            onSubmit={this.onSearchSubmit}
            onChange={this.onSearchChange}
          >
            {" "}
            Search{" "}
          </Search>{" "}
          <br />
          <span className="credit">Made By Umair Ahmed Bajwa</span>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}

        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
          >
            {" "}
            Load More{" "}
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
