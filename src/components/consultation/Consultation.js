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
        answers:'',
        tempPair:'',
        result:'',
        choosenPairs:[],
    }


    componentDidMount(){
        let question = this.props.expert.questions[this.state.questionsCount].question;
  
        this.getAnswers(this.state.questionsCount);        

        this.setState({
            question:question,
        });
    }

    onNextClick=()=>{
        console.log('===============================================');
        
        let count=this.state.questionsCount;
        if(count+1 != this.props.expert.questions.length){
            count++;
        }
        
        
        let pair=this.state.tempPair;
        let choosenPairs = this.state.choosenPairs;
        choosenPairs.push(pair);
        let nextKey = '';

        let isСoincidence = 0;

        for(let i=0; i<this.props.expert.conditions.length; i++){

            for(let j=0; j<this.props.expert.conditions[i].pairs.length; j++){

                if(JSON.stringify(this.props.expert.conditions[i].pairs[j]) == JSON.stringify(pair) 
                    && this.props.expert.conditions[i].pairs[j+1]){
                    // если мы находим совпадение пары в условии и еще есть следущая

                        nextKey = this.props.expert.conditions[i].pairs[j+1].key;
                }
                if(JSON.stringify(this.props.expert.conditions[i].pairs) == JSON.stringify(choosenPairs) 
                    && !this.props.expert.conditions[i].pairs[j+1]){
                    //тут мы выводим результат, если все наши ответы совпадают с парами в условии
                    // !!!!!!!!!!!!!!!
                    // позже надо сделать проверку на существования нескольких условий, которые
                    //совпадают с нашими ответами
                    console.log('****** result', this.props.expert.conditions[i].result);
                    alert(this.props.expert.conditions[i].result);
                }
            }

        }

        let question;      
        for(let i=0; i<this.props.expert.questions.length; i++){
            if(this.props.expert.questions[i].key === nextKey){
                question = this.props.expert.questions[i].question; 
                this.getAnswers(i);
        
            }
        }      
        
        // let question = this.props.expert.questions[count].question; 
        // this.getAnswers(count);
        this.setState({
            questionsCount:count,
            question:question,
            choosenPairs:choosenPairs
        });
        this.clearAnswers();
    }

    clearAnswers=()=>{ // снимаем выделения с радиокнопок
        let elems = document.getElementsByClassName('consultation_answers_radio');
        
        for (let i=0; i<elems.length;i++){
            elems[i].checked = false;
        }
    }
        

    handleChange=(elem)=>{
        let count=this.state.questionsCount;

        let pair={
            answer: elem.target.value,
            key: elem.target.id,
        };

        this.setState({
            tempPair:pair,
        });

    }

    getAnswers=(count)=>{
        let answers = this.props.expert.questions[count].answers;
        let key = this.props.expert.questions[count].key;
        let answersDOMs=[];

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