import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

class ConsultationResult extends React.Component{

  render(){
    return (
			<div className="jumbotron consultation-result mx-auto ">
				{/*<h3 className=""></h3>*/}
				<p className="lead">Result</p>
				<hr className="my-4"/>
				<p>{this.props.result}</p>
				<p className="lead btn-group">
					<a className="btn btn-outline-dark" href='/'>Finish</a>
					<button className="btn btn-outline-dark" onClick={()=>{this.props.onStartClick()}}>Try again</button>
				</p>

			</div>
    )
  }
}


export default withRouter(ConsultationResult);
