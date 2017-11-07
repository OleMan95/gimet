import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';

import '../../css/App.css';
import '../../css/ConfigNewExpert.css';

import '../../css/ConfigConsultation.css';


class Consultation extends React.Component{

    state = {

        question:"",
        questionsCount:0,

    }


    componentDidMount(){
        let question = this.props.expert.questions[this.state.questionsCount].question;
        console.log(question);
       
        this.setState({
            question:question,
        });
    }

    onNextClick=()=>{
        let count=this.state.questionsCount;
        count++;
        this.setState({
            questionsCount:count,
        });
        let question = this.props.expert.questions[count].question;        
        this.setState({
            question:question,
        });
    };



    render(){

    
    console.log(this.props.expert);

        return (
            <div>
            
                <header className="header" >
                    <div className="header-left">
                    <NavLink to="/" activeClassName="Start-header-logo-active" className="header-logo">
                        <div className="header-logo-img"></div>
                        <p className="header-logo-title">GIMET</p>
                    </NavLink>
                    <NavLink to="/home" className="header-userName">
                        <h2>{this.props.store.accountReducer[0].username}</h2>
                    </NavLink>
                    </div>
                    <div className="header-right">
                        <NavLink to="/home" className="signOutBtn" >Back to Home</NavLink>
                    </div>
                </header>     
            
                <h1></h1>

                <div className="consultation_question_frame">
                    <div id="consultation_question_number">
                        <h3>Question # {this.state.questionsCount}</h3>
                    </div>
                    {/* <hr/> */}
                    <div id="consultation_question_text">
                        <h3>{this.state.question}</h3>
                    </div>
                    
                    
                </div>
                <button onClick={this.onNextClick}>Next</button>
                
            </div>
        )

    }      
}


export default withRouter(connect(
    state=>({
      expert: state.ConsultationReducer,
      store:state
    }),
    dispatch=>({
  
    })
  )(Consultation));