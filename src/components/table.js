import React, { Component } from "react";
import Button from '../widgets/button'; 

const Table = (props) => {
    const { list, pattern, onDismiss, searching } = props;

    return (
      <div>
        {list.filter(searching(pattern)).map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span> <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
            </span>
          </div>
        ))}
      </div>
    );
  }

export default Table; 
