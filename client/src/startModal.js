import React, { Component } from 'react';
import RelatedBanks from './relatedBanks';

import { store } from './service/startRedux';
import { actionAddCount, parseCardsFromDb, parseBanksFromDb } from './service/actions'
import { getAllCards } from './service/cardsService';
import { getAllBanks } from './service/banksService';

class StartModal extends Component {
  constructor(props) {
    super(props);

    this.addNewCount = this.addNewCount.bind(this);
    this.handleFindBanks = this.handleFindBanks.bind(this);
    this.handleFindCards = this.handleFindCards.bind(this);
    this.changeCountImg = this.changeCountImg.bind(this);

    this.state = {
      countId: 0,
      relatedBanks: [],
      visibleBanks: false,
      visibleCards: false,
      imagesArr: []
    }
  }

  componentDidMount() {
    store.subscribe(() => { this.setState({ countId: store.getState().addCount.length }) });
    store.subscribe(() => { console.log(store.getState().addCount) });
    getAllCards().then(response => store.dispatch(parseCardsFromDb(response))).catch(error => {console.log(error)});
    getAllBanks().then(response => store.dispatch(parseBanksFromDb(response))).catch(error => {console.log(error)});
  }

  addNewCount() {

    store.dispatch(actionAddCount({
      id: this.state.countId,
      bank_name: this.refs.bankName.value,
      cash: this.refs.cash.value || 0,
      count_num: this.refs.countNumber.value,
      currency: this.refs.currency.value || 'RUB',
      card_name: this.refs.cardName.value || '',
      description: this.refs.description.value || '',
      card_type: this.refs.cardType.value || '',
      type: this.refs.type.value
    }))

    this.refs.bankName.value = '';
    this.refs.cash.value = '';
    this.refs.countNumber.value = '';
    this.refs.cardName.value = '';
    this.refs.description.value = '';
  }

  changeCountImg(e) {

      this.setState({ visibleBanks: false });
      this.setState({ visibleCards: false });

      if(e.target.value === this.refs.bankName.value && this.refs.cardName.value === '') {
        this.setState({ imagesArr: store.getState().banksStore[0].filter(bank => {
          let match = bank.bank_name.toLowerCase().indexOf(e.target.value.toLowerCase());
          return (match !== -1);
        }) });

      } else if (e.target.value === this.refs.cardName.value && e.target.value !== '') {
        this.setState({ imagesArr: store.getState().cardsStore[0].filter(card => {
          let match = card.card_name.toLowerCase().indexOf(e.target.value.toLowerCase());
          return (match !== -1);
        }) });
      } else if (e.target.value === this.refs.cardName.value && e.target.value === '' && this.refs.bankName.value !== '') {
        this.setState({ imagesArr: store.getState().banksStore[0].filter(bank => {
          let match = bank.bank_name.toLowerCase().indexOf(this.refs.bankName.value.toLowerCase());
          return (match !== -1);
        }) });
      } else if (e.target.value === this.refs.cardName.value && e.target.value === '' && this.refs.bankName.value === '') {
        this.setState({ imagesArr: ''});
      }
      console.log(this.state.imagesArr);

  }

  handleFindBanks(e) {
    let inputValue = e.target.value;
    this.setState({ visibleBanks: true });
    this.setState({ relatedBanks: store.getState().banksStore[0].filter(bank => {
      let match = bank.bank_name.toLowerCase().indexOf(inputValue.toLowerCase())

      return (match !== -1);
    }) });
  }

  handleFindCards(e) {
    let inputValue = e.target.value;
    this.setState({ visibleCards: true });
    this.setState({ relatedBanks: store.getState().cardsStore[0].filter(card => {
      let match = card.card_name.toLowerCase().indexOf(inputValue.toLowerCase());
      let match2 = card.bank_name.toLowerCase().indexOf(this.refs.bankName.value.toLowerCase());

      return (match !== -1 && match2 !== -1);
    }) });
  }

  render() {

    let sumTitle;
    let cardClassName = 'form-group hidden';
    let bankCardImg = '';

    if(this.state.imagesArr.length === 1) bankCardImg = this.state.imagesArr[0].bank_picture || this.state.imagesArr[0].card_picture;

    if(this.props.typeCount === 'card') {
      sumTitle = 'Сумма на карте' ;
      cardClassName = 'form-group';
    };
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
                <div className="col-md-4">
                  <img className="bank_img" src={bankCardImg} alt=""/>
                </div>
                <div className="col-md-8">

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="pg-bank-name">Наименование банка</label>
                        <input type="text" ref="bankName" id="pg-bank-name" className="bank-name form-control" placeholder="Наименование банка" autoComplete="off" onChange={this.handleFindBanks} onBlur={ this.changeCountImg } />
                        <span id="helpBlock" className="help-block">Введите название банка</span>
                        <RelatedBanks type="banks" visible={this.state.visibleBanks} banks={this.state.relatedBanks} />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className={cardClassName}>
                        <label htmlFor="pg-card-name">Название карты</label>
                        <input type="text" ref="cardName" id="pg-card-name" className="form-control" placeholder="Название карты" autoComplete="off" onChange={this.handleFindCards} onBlur={ this.changeCountImg } />
                        <span id="helpBlock" className="help-block">Название карты вашего банка</span>
                        <RelatedBanks type="cards" visible={this.state.visibleCards} banks={this.state.relatedBanks} />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="pg-count-number">Номер счета/карты</label>
                        <input type="text" ref="countNumber" id="pg-count-number" className="form-control" placeholder="Номер карты/счета" autoComplete="off" />
                        <span id="helpBlock" className="help-block">Введите номер карты/счета</span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group">
                        <label htmlFor="pg-cash-count">{sumTitle}</label>
                        <input type="text" ref="cash" id="pg-cash-count" className="cash-card form-control" placeholder="Сумма" />
                        {/* <span id="helpBlock" className="help-block">{sumTitle}</span> */}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="pg-count-currency">Валюта</label>
                        <select ref="currency" id="pg-count-currency" className="form-control">
                          <option>RUB</option>
                          <option>EUR</option>
                          <option>USD</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className={cardClassName}>
                        <label htmlFor="pg-card-type">Тип</label>
                        <select ref="cardType" id="pg-card-type" className="form-control">
                          <option>VISA</option>
                          <option>MasterCard</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="pg-count-desc">Описание</label>
                        <textarea ref="description" id="pg-count-desc" className="form-control" />
                      </div>
                    </div>
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
