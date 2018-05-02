import React from 'react';
import {withRouter, Redirect, Route} from 'react-router-dom';


// import ConsultationInterview from './ConsultationInterview';
// import {getToken} from "../services/tokenService";

class ConsultationInit extends React.Component{
  //
  // state = {
  //   expert: {},
  // };
  //
  // async componentDidMount() {
  //   const token = getToken();
  //   const response = await fetch(`/v1/expert/${this.props.match.params.id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization' : token
  //     }});
  //
  //   let data = await response.json();
  //
  //   console.log('data: ',data);
  //
  //   if(data._id){
  //     this.setState({
  //       expert: data
  //     });
  //   }else{
  //     this.props.history.push('/home');
  //   }
  //
  // };
  //
  // onStartClick=()=>{ // при нажатии кнопки старт загружаем новую страницу ConsultationInterview и присваиваем переменной content ConsultationInterview
  //   this.props.setContent(<ConsultationInterview expert={this.state.expert}/>);
  // };

  render(){
    return (
      <div className="consultation_frame" id="init_frame">
        {/*<div id="init_frame_header">*/}
          {/*<h3>{this.state.expert.name}</h3>*/}
        {/*</div>*/}

        {/*<div id="init_frame_content">*/}
          {/*<div>*/}
              {/*<p>{this.state.expert.description}</p>*/}
          {/*</div>*/}
          {/*<button className="consultation_startBtn"*/}
              {/*onClick={this.onStartClick}>Start</button>*/}
        {/*</div>*/}
      </div>
    )
  }
}


export default withRouter(ConsultationInit);
