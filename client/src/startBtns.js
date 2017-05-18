import React, { Component } from 'react';
import StartModal from './startModal'

// import { createStore } from 'redux';
// // import { addCount } from './service/startRedux';
//
// const addCount = (list, action) => {
//   return [...list, action.count];
// };
//
// try {
//   const store = createStore(addCount);
// } catch (e) {
//   console.log(e);
// }

class StartBtns extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Название'
    }

    this.cartModal = this.cartModal.bind(this);
    this.depositModal = this.depositModal.bind(this);
    this.countModal = this.countModal.bind(this);
  }

  cartModal() {
    this.setState({
      title: 'Добавить карту'
    })
  }
  depositModal() {
    this.setState({
      title: 'Добавить вклад'
    })
  }
  countModal() {
    this.setState({
      title: 'Добавить счет'
    })
  }

  render() {
    return (
      <div className="add-btns">
        <button type="button" className="pg-cart-btns pg-start-btns btn btn-primary btn-sm" data-toggle="modal" data-target="#start-modal" onClick={this.cartModal}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          Добавить карту
        </button>
        <button type="button" className="pg-deposit-btns pg-start-btns btn btn-primary btn-sm" data-toggle="modal" data-target="#start-modal" onClick={this.depositModal}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          Добавить вклад
        </button>
        <button type="button" className="pg-count-btns pg-start-btns btn btn-primary btn-sm" data-toggle="modal" data-target="#start-modal" onClick={this.countModal}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          Добавить счет
        </button>

        <StartModal title={this.state.title}/>
      </div>
    )
  }

}

export default StartBtns;
