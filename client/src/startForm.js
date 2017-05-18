import React, { Component } from 'react';
import StartCash from './startCash';
import StartCounts from './startCounts';
import StartBtns from './startBtns';

import { store } from './service/startRedux';

class StartForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      countsAdded: [
        {
          id: 1,
          name: 'Сбербанк',
          cash: 10000,
          currency: 'RUB',
          type: 'card'
        },
        {
          id: 2,
          name: 'Сбербанк',
          cash: 35000,
          currency: 'RUB',
          type: 'deposit'
        },
        {
          id: 3,
          name: 'ВТБ24',
          cash: 100,
          currency: 'EUR',
          type: 'count'
        },
        {
          id: 4,
          name: 'ВТБ24',
          cash: 12400,
          currency: 'RUB',
          type: 'deposit'
        }
      ]
    }
  }

  render() {

    let counts = store.getState();

    return (
      <form id="start-form">
        <StartCash />
        <StartCounts title="Добавленные карты" type="card" counts={counts}/>
        <StartCounts title="Добавленные вклады" type="deposit" counts={counts}/>
        <StartCounts title="Добавленные счета" type="count" counts={counts}/>
        <StartBtns />
        <div className="over-start">
          <button type="submit" className="pg-start-submit btn btn-default">Начать работу с сервисом</button>
        </div>
      </form>
    )
  }
}

export default StartForm;
