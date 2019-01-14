import React, { Component } from "react";

export default class Table extends Component {
  render() {
    const { list, pattern, onDismiss, searching } = this.props;

    return (
      <div>
        {list.filter(searching(pattern)).map(item => (
          <div key={item.objectID}>
            {" "}
            <span>
              {" "}
              <a href={item.url}>{item.title}</a>{" "}
            </span>{" "}
            <span>{item.author}</span> <span>{item.num_comments}</span>{" "}
            <span>{item.points}</span>{" "}
            <span>
              {" "}
              <button onClick={() => onDismiss(item.objectID)} type="button">
                {" "}
                Dismiss{" "}
              </button>{" "}
            </span>{" "}
          </div>
        ))}{" "}
      </div>
    );
  }
}
