import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect, Route} from 'react-router-dom';


import ConsultationInterview from './ConsultationInterview';

class ConsultationInit extends React.Component{

    state = {
        initContent:( // создаем обьект в переменную initContent
            <div className="consultation_frame" id="init_frame">
                <div id="consultation_question_number">
                    <h3>{this.props.expert.name}</h3>
                    <p>{this.props.expert.description}</p>
                </div>

                <button className="consultation_startBtn" onClick={this.onStartClick}>Start</button>
            </div>
        ),
    };

    onStartClick=()=>{ // при нажатии кнопки старт загружаем новую страницу ConsultationInterview и присваиваем переменной content ConsultationInterview
        this.props.setContent(<ConsultationInterview/>);  
        
        this.setState({
            content: <ConsultationInterview/>,
        });  
    };

    render(){
        return (
            <Route exact path="/consultation" render={() => (
                !this.props.expert.name ? (
                  <Redirect to="/home"/>
                ) : (
                    <div className="consultation_frame" id="init_frame">
                        <div id="init_frame_header">
                            <h3>{this.props.expert.name}</h3>
                        </div>
                    
                        <div id="init_frame_content">
                            <div>
                                <p>{this.props.expert.description}</p>
                            </div>
                            <button className="consultation_startBtn"
                                onClick={this.onStartClick}>Start</button>
                        </div>
                    </div>
                )
            )}/>
        )
    }
}


export default withRouter(connect(
    state=>({ // изменение данных в переменных
      expert: state.ConsultationReducer.expert,
      content: state.ConsultationReducer.content,
      store:state
    }),
    dispatch=>({ // сохранение контента в Redux
        setContent: (content)=>{
            dispatch({type:'SET_CONSULTATION_CONTENT',payload: content});
        }
    })
  )(ConsultationInit));
