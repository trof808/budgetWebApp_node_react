import React from 'react';

const StartBtns = (props) => {
  return (
    <div className="add-btns">
      <button type="button" className="pg-cart-btns pg-start-btns btn btn-primary btn-sm">
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        Добавить карту
      </button>
      <button type="button" className="pg-deposit-btns pg-start-btns btn btn-primary btn-sm">
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        Добавить вклад
      </button>
      <button type="button" className="pg-count-btns pg-start-btns btn btn-primary btn-sm">
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        Добавить счет
      </button>
    </div>
  )
}

export default StartBtns;
