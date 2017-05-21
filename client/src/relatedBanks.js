import React, { Component } from 'react';

class RelatedBanks extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {

    let banks;
    let banksClassName = 'relatedBanks'

    if(!this.props.visible) banksClassName += ' hidden';

    if(this.props.banks.length > 0 && this.props.type === 'banks') {
      banks = this.props.banks.map(bank => (
        <li key={bank.id} ><img src={bank.bank_picture} alt={bank.bank_name} /> <span>{bank.bank_name}</span></li>
      ))
    } else if (this.props.banks.length > 0 && this.props.type === 'cards') {
      banks = this.props.banks.map(bank => (
        <li key={bank.id} ><img src={bank.card_picture} alt={bank.card_name} /> <span>{bank.card_name}</span></li>
      ))
    } else {
      banks = <li>Нет базе</li>
    }

    return (
      <div className={banksClassName} >
        <ul>
          {banks}
        </ul>
      </div>
    )
  }
}

export default RelatedBanks;
