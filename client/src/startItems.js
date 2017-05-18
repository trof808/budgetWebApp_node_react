import React from 'react';

const StartItems = (props) => {

  let displayItems;

  if(props.items.length > 0) {
    displayItems = props.items.map((item) => {
      return (
        <li key={item.id}>
          <a className="remove-start-item">
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </a>
          {item.name} <span>{item.cash} {item.currency}</span>
        </li>
      )
    })
  } else {
    displayItems = <li>Пусто</li>
  }

  let list;
  if(props.showDetails) {
    list = (
      <ul>
        {displayItems}
      </ul>
    )
  }

  return (
    <div>
      {list}
    </div>
  )
}

export default StartItems;
