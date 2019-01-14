import React, { Component } from "react";



const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 1
  },
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 3
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVal: "",
      list: list
    };
  }

  onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  };

  onSearchChange = event => {
    this.setState({ searchVal: event.target.value });
  };

  isSearched = searchVal => {
    return function(item) {
      return item.title.toLowerCase().includes(searchVal.toLowerCase());
    };
  };

  render() {
    return (
      <div className="App">
        <form>
          <label>Search </label>
          <input
            type="text"
            value={this.state.searchVal}
            onChange={this.onSearchChange}
          />
        </form>

        {this.state.list
          .filter(this.isSearched(this.state.searchVal))
          .map(item => (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>Title: {item.title} </a>
              </span>
              <br />
              <span>Author: {item.author}</span> <br />
              <span>Comments: {item.num_comments}</span>
              <br />
              <span>Upvotes: {item.points}</span> <br />
              <span>
              
                
                <br />
                <br />
              </span>
            </div>
          ))}
      </div>
    );
  }
}

export default App;
