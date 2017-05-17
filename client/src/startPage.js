import React, { Component } from 'react';
import StartForm from './startForm';

class StartPage extends Component {

  render() {
    return (
      <div className="start-page">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <StartForm />
          </div>
        </div>
      </div>
    )
  }
}

export default StartPage;
