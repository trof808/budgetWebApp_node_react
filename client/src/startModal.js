import React, { Component } from 'react';

class StartModal extends Component {


  render() {
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
                <div className="col-md-6">
                  <div className="form-group count-name">
                    <label htmlFor="pg-bank-name">Наименование банка</label>
                    <input type="text" id="pg-bank-name" className="bank-name form-control" placeholder="Наименование банка" />
                    <span id="helpBlock" className="help-block">Введите название банка</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group cash-count">
                    <label htmlFor="pg-cash-count-name">Сумма</label>
                    <input type="text" id="pg-cash-count-name" className="cash-card form-control" placeholder="Сумма на карте" />
                    <span id="helpBlock" className="help-block">Сумма на карте</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
     )
  }
}

export default StartModal;
