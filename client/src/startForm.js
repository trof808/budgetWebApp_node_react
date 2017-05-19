import React, { Component } from 'react';
import StartCash from './startCash';
import StartCounts from './startCounts';
import StartBtns from './startBtns';

class StartForm extends Component {

  render() {

    return (
      <form id="start-form">
        <StartCash />
        <StartCounts title="Добавленные карты" type="card"/>
        <StartCounts title="Добавленные вклады" type="deposit"/>
        <StartCounts title="Добавленные счета" type="count" />
        <StartBtns />
        <div className="over-start">
          <button type="submit" className="pg-start-submit btn btn-default">Начать работу с сервисом</button>
        </div>
      </form>
    )
  }
}

export default StartForm;
