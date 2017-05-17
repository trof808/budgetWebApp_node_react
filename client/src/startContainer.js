import React, { Component } from 'react';
import StartPage from './startPage';

class StartContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="container">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="ph-h2 text-center">Вы зарегистрировались впервые</h2>
          <h4 className="ph-h4 text-center">Заполните следующие поля, для дальнейшей работы</h4>
          <StartPage />
        </div>
      </div>
    )
  }
}

export default StartContainer;
