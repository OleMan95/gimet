import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

// import ConsultationInit from './ConsultationInit';

class ConsultationResult extends React.Component{
  // onStartClick=()=>{
  //   this.props.setContent(<ConsultationInit/>);
  // };

  render(){
    return (
      <div className="consultation_frame" id="result_frame">
        {/*<div id="result_frame_header">*/}
          {/*<h3>Result: </h3>*/}
        {/*</div>*/}
        {/*<p>{this.props.result}</p>*/}

        {/*<div className="result_frame_btns">*/}
          {/*<button className="result_frame_repeat" */}
            {/*onClick={this.onStartClick}>Repeat</button>*/}
          {/*<NavLink to="/home" className="result_frame_finishBtn">Finish</NavLink>*/}
        {/*</div>*/}
      </div>
    )
  }
}


export default withRouter(ConsultationResult);
