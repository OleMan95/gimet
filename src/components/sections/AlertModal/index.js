import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import './index.scss';

class AlertModal extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  };
	}

  render(){

    return (
      <div className={"AlertModal modal fade show"} ref={(elem)=>this.modal=elem}
           tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLongTitle" aria-hidden="true"
           onClick={()=>this.props.onResult(false)}>

        <div className="modal-dialog" role="document" onClick={(event)=>event.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.props.onResult(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
							<p>{this.props.text}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>this.props.onResult(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>this.props.onResult(this.props.options)}>Apply</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

}


export default withRouter(AlertModal);
