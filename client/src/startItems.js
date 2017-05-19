import React, { Component } from 'react';

import { store } from './service/startRedux';
import { actionDeleteItem } from './service/actions'


class StartItems extends Component {

  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(event) {
    let id = event.target.dataset['count'];
    store.dispatch(actionDeleteItem(parseInt(id, 10)));
    console.log(store.getState().addCount);
  }

  render() {
    let displayItems;

    if(this.props.items.length > 0) {
      displayItems = this.props.items.map((item) => {
        return (
          <li key={item.id}>
            <a className="remove-start-item">
              <span className="glyphicon glyphicon-remove" aria-hidden="true" data-count={item.id} onClick={this.deleteItem}></span>
            </a>
            {item.name} <span>{item.cash} {item.currency}</span>
          </li>
        )
      })
    } else {
      displayItems = <li>Пусто</li>
    }

    let list;
    if(this.props.showDetails) {
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

}

export default StartItems;
