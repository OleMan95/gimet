import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';

import '../../css/App.css';
import '../../css/ConfigNewExpert.css';

import '../../css/ConfigConsultation.css';


class Consultation extends React.Component{

    state = {
        question:'',
        questionsCount:0,
        answers:''
    }


    componentDidMount(){
        let question = this.props.expert.questions[this.state.questionsCount].question;
  
        this.getAnswers(this.state.questionsCount);        

        this.setState({
            question:question,
        });
    }

    onNextClick=()=>{
        let count=this.state.questionsCount;
        if(count+1 != this.props.expert.questions.length){
            count++;
        }

        let question = this.props.expert.questions[count].question;        

        this.getAnswers(count);

        this.setState({
            questionsCount:count,
            question:question,
        });
    }

    handleChange=(elem)=>{
        console.log('key: ',elem.target.id, '; answer',elem.target.value);
        let count=this.state.questionsCount;

        let pair={
            key: elem.target.id,
            answer: elem.target.value
        };

        console.log(this.props.expert);
        for(let i=0; i<this.props.expert.conditions.length; i++){
            
            for(let j=0;j<this.props.expert.conditions[i].pairs.length;j++){
                if(this.props.expert.conditions[i].pairs[j].key === pair.key &&
                    this.props.expert.conditions[i].pairs[j].answer === pair.answer){
                    console.log('question: ',this.props.expert.conditions[i]);
                    this.getAnswers(i);
                }
            }
        }
        

    }

    getAnswers=(count)=>{
        let answers = this.props.expert.questions[count].answers;
        let key = this.props.expert.questions[count].key;
        let answersDOMs=[];
        console.log('answers: ',key);

        for(let i=0;i<answers.length;i++){
            answersDOMs.push(
                <div className='consultation_answers_list' key={i}>
                    <input type="radio" name="rb" id={key} className='consultation_answers_radio' onChange={(input)=>this.handleChange(input)} value={answers[i]}/>
                    <label htmlFor={'answer'+i}>{answers[i]}</label>
                    <div className="answers_list_check"></div>
                </div>
            );
        }

        this.setState({
            answers:answersDOMs,
        });
    }



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
                        <div>
                            <h3>Question # {this.state.questionsCount+1}</h3>
                        </div>
                    </div>
                    <div id="consultation_question_text">
                        <div>
                        <h3>{this.state.question}</h3>
                        </div>
                    </div>
                    <div id="consultation_answers">
                        {this.state.answers}
                    </div>

                    <button className="consultation_nextBtn" onClick={this.onNextClick}>Next</button>
                    
                </div>
                
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