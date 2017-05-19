import React, { Component } from 'react';

class RelatedBanks extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {

    let banks;
    let banksClassName = 'relatedBanks'

    if(!this.props.visible) banksClassName += ' hidden';

    if(this.props.banks.length > 0) {
      banks = this.props.banks.map(bank => (
        <li key={bank.id} >{bank.name}</li>
      ))
    } else {
      banks = <li>Нет банка в базе</li>
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
