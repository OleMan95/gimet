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
    }


    componentDidMount(){
        let question = this.props.expert.questions[this.state.questionsCount].question;
        this.getAnswers(this.state.questionsCount);

        this.setState({
            question:question,
        });
    }

    onNextClick=()=>{
        this.setState({
            answers:[],
        });

        let count=this.state.questionsCount;
        // if(count+1 != this.props.expert.questions.length){
        // }
        count++;


        let pair=this.state.tempPair;
        let choosenPairs = this.state.choosenPairs;
        choosenPairs.push(pair);
        let nextKey;

        for(let i=0; i<this.props.expert.conditions.length; i++){

            for(let j=0; j<this.props.expert.conditions[i].pairs.length; j++){
                if(JSON.stringify(this.props.expert.conditions[i].pairs[j]) == JSON.stringify(pair)
                && this.props.expert.conditions[i].pairs[j+1]){
                    // если мы находим совпадение пары в условии и еще есть следущая
                    nextKey = this.props.expert.conditions[i].pairs[j+1].key;
                }
            }
        }

        let result = this.getResult(choosenPairs);

        if(!nextKey){

            if(result && !this.state.result){
                // alert(result);
                this.props.setContent(<ConsultationResult result={result}/>);
    
            }else if(result && this.state.result){
                // alert(result);
                this.props.setContent(<ConsultationResult result={result}/>);
    
            }else{
                // alert('No result!');
                this.props.setContent(
                    <ConsultationResult result={'For this case, the result is not provided!'}/>
                );
                
            }
        }

        let question;
        for(let i=0; i<this.props.expert.questions.length; i++){
            if(this.props.expert.questions[i].key === nextKey){
                question = this.props.expert.questions[i].question;
                this.getAnswers(i);
            }
        }
        
        this.setState({
            questionsCount:count,
            question:question,
            choosenPairs:choosenPairs
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

        let pair={
            answer: elem.target.value,
            key: key[1],
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
                <div className='question_frame_list' key={i}>
                    <input type="radio" name="rb" id={i+'#@key-'+key} className='question_frame_radio' 
                        onChange={(input)=>this.handleChange(input)} value={answers[i]}/>
                    <label htmlFor={i+'#@key-'+key}>{answers[i]}</label>
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
