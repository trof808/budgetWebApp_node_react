import React from 'react';

const StartCounts = (props) => {
  return (
    <div className="counts-added added">
      <h4>{props.title} <span className="badge">0</span></h4>
      <ul>
        <li>
          <a className="remove-start-item">
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </a>
          Сбербанк <span>20 000 рублей</span>
        </li>
      </ul>
    </div>
  )
}

export default StartCounts;
