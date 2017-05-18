'use stirct';

import React, { Component } from 'react';
import StartItems from './startItems';

class StartCounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    }
  }

  render() {

    let items = this.props.counts.filter(count => count.type === this.props.type)

    let chevronClass = this.state.showDetails ? 'glyphicon glyphicon-chevron-down' : 'glyphicon glyphicon-chevron-right';

    return (
      <div className="counts-added added">
        <h4 onClick={() => this.setState({ showDetails: !this.state.showDetails })}>
          <span className={chevronClass}></span>
          {this.props.title}
          <span className="badge">{items.length}</span>
        </h4>
        <StartItems showDetails={this.state.showDetails} items={items}/>
      </div>
    )
  }

}

export default StartCounts;
