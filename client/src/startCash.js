import React from 'react';

const StartCash = (props) => {

  return (
    <div className="form-group start-cash">
      <label htmlFor="pg-nal"> <span className="glyphicon glyphicon-ruble" aria-hidden="true"></span>Наличные деньги</label>
      <input type="text" id="pg-nal" className="nal-mony form-control" placeholder="Наличные деньги" />
      <span id="helpBlock" className="help-block">Введите сумму, которая у вас есть наличными</span>
    </div>
  )
}

export default StartCash;
