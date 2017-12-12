import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';

import '../../css/App.css';
import '../../css/ConfigConsultation.css';
import ConsultationResult from './ConsultationResult';


class ConsultationInterview extends React.Component{

    state = {

        question:'',
        questionsCount:0,
        answers:'',
        tempPair:'',
        result:'',
        choosenPairs:[],
        coinciedence:0,
        currentQuestion:0,
    }


    componentDidMount(){
        let question = this.props.expert.questions[this.state.questionsCount].question;
        this.getAnswers(this.state.questionsCount);

        this.setState({
            question:question,
        });
    }

    onNextClick=()=>{
        let result = this.state.result;
        if(!result.value){
            console.log("qqqqqqqqqqqq");
            return;
        }
        this.setState({
            answers:[],
        });
        let key = null;
        let count=this.state.questionsCount;
        let questions = this.props.expert.questions;
        let question = null;
        count++;


        console.log(result);
      
        if(result.type == 'key'){
            console.log("type",result.type);
            console.log("value",result.value);
            key = result.value;
            for(let i=0; i<questions.length; i++){
                if(questions[i].key == key){
                    question = questions[i].question;
                    this.getAnswers(i);
                    this.setState({currentQuestion:i});
                }
            }
        }
        else if(result.type == 'text'){
            console.log("type",result.type);
            console.log("value",result.value);
            this.props.setContent(<ConsultationResult result={result.value}/>);
        }



        
        this.setState({
            questionsCount:count,
            question:question,
            result:'',
        });
        this.clearAnswers();
    }

    getResult=(choosenPairs)=>{
        let coinciedence=0;

        for(let i=0; i<this.props.expert.conditions.length; i++){

            if(JSON.stringify(this.props.expert.conditions[i].pairs) == JSON.stringify(choosenPairs)) {
                //тут мы выводим результат, если все наши ответы совпадают с парами в условии
                console.log('****** result ', this.props.expert.conditions[i].result);
                coinciedence++;
                this.setState({
                    result:this.props.expert.conditions[i].result,
                    coinciedence:coinciedence,
                });
                return this.props.expert.conditions[i].result;
            }
        }
        return null;
    }

    clearAnswers=()=>{ // снимаем выделения с радиокнопок
        let elems = document.getElementsByClassName('question_frame_radio');

        for (let i=0; i<elems.length;i++){
            elems[i].checked = false;
        }
    }

    handleChange=(elem)=>{
        let count=this.state.questionsCount;
        let id = elem.target.id;
        let key = id.split("#@key-");
        let index = null;
        
        console.log('count ',this.state.questionsCount);
        let answers = this.props.expert.questions[this.state.currentQuestion].answers;
        
        for(let i=0; i<answers.length; i++){
            console.log('ответ ',answers[i]);
            if(answers[i]==elem.target.value){
                console.log('нашло ответ ',elem.target.value);
                index=i;
                break;
            }
        }
        
        
        let result = this.props.expert.questions[this.state.currentQuestion].results[index];
        console.log('result',result);
        this.setState({
            result:result,
        });

    }

    getAnswers=(count)=>{
        let answers = this.props.expert.questions[count].answers;
        let key = this.props.expert.questions[count].key;
        let answersDOMs=[];

        for(let i=0;i<answers.length;i++){
            answersDOMs.push(
                <div className='question_frame_list' key={i}>
                    <div>
                        <input type="radio" name="rb" id={i+'#@key-'+key} className='question_frame_radio' 
                            onChange={(input)=>this.handleChange(input)} value={answers[i]}/>
                    </div>
                    <label htmlFor={i+'#@key-'+key}>{answers[i]}</label>
                    <div className="answers_list_check"></div>
                </div>
            )
        }

        this.setState({
            answers:answersDOMs,
        });
    }

    render(){
        return (
            <div className="consultation_frame" id="question_frame">
                <div id="question_frame_header">
                    <div>
                        <h3>Question # {this.state.questionsCount+1}</h3>
                    </div>
                </div>
                <div id="question_frame_question">
                    <div>
                        <h3>{this.state.question}</h3>
                    </div>
                </div>
                <div id="question_frame_answers">
                    {this.state.answers}
                </div>

                <button className="consultation_nextBtn" onClick={this.onNextClick}>Next</button>

            </div>
        )

    }
}


export default withRouter(connect(
    state=>({
      expert: state.ConsultationReducer.expert,
      content: state.ConsultationReducer.content,
      store:state
    }),
    dispatch=>({
        setContent: (content)=>{
            dispatch({type:'SET_CONSULTATON_CONTENT',payload: content});
        }
    })
  )(ConsultationInterview));
