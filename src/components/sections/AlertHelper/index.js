import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import './index.scss';

class AlertHelper extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  };
	}

  render(){
    return (
      <div className={this.props.show ? "AlertHelper" : "AlertHelper d-none"}>

				<div className="alert-group w-100 d-flex">
					<div className={this.props.isDanger ? "alert alert-danger alert-opacity" : "alert alert-info alert-opacity"} role="alert">
						{this.props.message}
					</div>
				</div>

      </div>
    );
  }
}


export default withRouter(AlertHelper);
