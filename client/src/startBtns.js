import React, { Component } from 'react';
import StartModal from './startModal'

import { store } from './service/startRedux';
import { actionChangeModal } from './service/actions'

class StartBtns extends Component {

  constructor(props) {
    super(props);

    this.state = {
      types: {}
    }

    this.cartModal = this.cartModal.bind(this);
    this.depositModal = this.depositModal.bind(this);
    this.countModal = this.countModal.bind(this);
    this.typesShowModel = this.typesShowModel.bind(this);
  }
  componentDidMount() {
    store.subscribe(() => this.typesShowModel())
  }

  typesShowModel() {
    const modalContent = store.getState();
    this.setState({
      types: modalContent.changeModalContent
    })
  }

  cartModal() {
    store.dispatch(actionChangeModal({
      title: 'Добавить карту',
      typeCount: 'card'
    }))
  }
  depositModal() {
    store.dispatch(actionChangeModal({
      title: 'Добавить вклад',
      typeCount: 'deposit'
    }))
  }
  countModal() {
    store.dispatch(actionChangeModal({
      title: 'Добавить счет',
      typeCount: 'count'
    }))
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

        <StartModal title={this.state.types.title} typeCount={this.state.types.typeCount}/>
      </div>
    )
  }

}

export default StartBtns;
