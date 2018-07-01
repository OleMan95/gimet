import React from 'react';
import {withRouter} from 'react-router-dom';

class ConsultationInit extends React.Component{


  render(){
		return (
      <div className={"jumbotron consultation-init mx-auto "+this.props.class}>
        <h3 className="">{this.props.expert.name}</h3>
        {/*<p className="lead">content or information.</p>*/}
        <hr className="my-4"/>
        <p>{this.props.expert.description}</p>
        <p className="lead">
          <button className="btn btn-primary" onClick={()=>{this.props.onStartClick()}}>START</button>
        </p>
      </div>
    )
  }
}


export default withRouter(ConsultationInit);
