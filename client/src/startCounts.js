'use stirct';

import React, { Component } from 'react';
import StartItems from './startItems';

import { store } from './service/startRedux';

class StartCounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      items: []
    }
  }

  componentDidMount() {
    store.subscribe(() => this.setNewItems())
  }

  setNewItems() {
    this.setState({
      items: store.getState().addCount
    })
  }

  render() {
    let items = [];

    if(this.state.items.length > 0) {
      items = this.state.items.filter(count => count.type === this.props.type)
    }

    // console.log(items);
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
