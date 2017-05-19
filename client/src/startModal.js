import React, { Component } from 'react';
import RelatedBanks from './relatedBanks';

import { store } from './service/startRedux';
import { actionAddCount, parseBanksFromDb } from './service/actions'
import { getAllBanks } from './service/banksService';

class StartModal extends Component {
  constructor(props) {
    super(props);

    this.addNewCount = this.addNewCount.bind(this);
    this.handleFindBanks = this.handleFindBanks.bind(this);

    this.state = {
      countId: 0,
      value: '',
      relatedBanks: [],
      visibleBanks: false
    }
  }

  componentDidMount() {
    store.subscribe(() => { this.setState({ countId: store.getState().addCount.length }) });
    store.subscribe(() => { this.setState({ relatedBanks: store.getState().banksStore[0] }); })
    getAllBanks().then(response => store.dispatch(parseBanksFromDb(response))).catch(error => {console.log(error)})
  }

  addNewCount() {

    store.dispatch(actionAddCount({
      id: this.state.countId,
      name: this.refs.bankName.value,
      cash: this.refs.cash.value,
      currency: 'RUB',
      type: this.refs.type.value
    }))
  }

  handleFindBanks(e) {
    let inputValue = e.target.value;
    this.setState({ visibleBanks: true });
    this.setState({ relatedBanks: store.getState().banksStore[0].filter(bank => {
      let match = bank.name.toLowerCase().indexOf(inputValue.toLowerCase())

      return (match !== -1);
    }) })
    console.log(this.state.relatedBanks);
  }

  render() {

    let sumTitle;

    if(this.props.typeCount === 'card') sumTitle = 'Сумма на карте';
    if(this.props.typeCount === 'deposit') sumTitle = 'Сумма на вкладе';
    if(this.props.typeCount === 'count') sumTitle = 'Сумма на счету';

     return (
       <div className="modal fade" tabIndex="-1" id="start-modal" role="dialog" aria-labelledby="gridSystemModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="gridSystemModalLabel">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <input type="text" className="hidden" value={this.props.typeCount || ''} ref="type" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group count-name">
                    <label htmlFor="pg-bank-name">Наименование банка</label>
                    <input type="text" ref="bankName" id="pg-bank-name" className="bank-name form-control" placeholder="Наименование банка" autoComplete="off" onChange={this.handleFindBanks} />
                    <span id="helpBlock" className="help-block">Введите название банка</span>
                    <RelatedBanks visible={this.state.visibleBanks} banks={this.state.relatedBanks} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group cash-count">
                    <label htmlFor="pg-cash-count-name">Сумма</label>
                    <input type="text" ref="cash" id="pg-cash-count-name" className="cash-card form-control" placeholder={sumTitle} />
                    <span id="helpBlock" className="help-block">{sumTitle}</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Закрыть</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNewCount}>Добавить</button>
            </div>
          </div>
        </div>
      </div>
     )
  }
}

export default StartModal;
