import React from "react";
import Button from "../widgets/button";

const Table = props => {
  const { list, pattern, onDismiss, searching } = props;

  return (
    <div className="table">
      {list.filter(searching(pattern)).map(item => (
        <div key={item.objectID} className="table-row">
          <span style={{ width: "100vh" }}>
            {" "}
            <a href={item.url}>Title: {item.title}</a>{" "}
          </span>{" "}
          <span style={{ width: "100vh" }}>Author: {item.author} </span>{" "}
          <span style={{ width: "100vh" }}>Comments: {item.num_comments} </span>{" "}
          <span style={{ width: "100vh" }}>Upvotes: {item.points} </span>{" "}
          <span style={{ width: "100vh" }}>
            {" "}
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              {" "}
              Dismiss{" "}
            </Button>{" "}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Table;
