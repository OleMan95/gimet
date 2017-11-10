import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter, Prompt } from 'react-router-dom';
import '../../css/App.css';
import '../../css/Home.css';
import ConditionsBody from './ConditionsBody';
import * as firebase from 'firebase';


class QuestionsBody extends React.Component{
  state = {
    count: 1,
    questionValue:'',
    answersValue:'',
    keyValue:'',
    questions:[],
    answersString:'',
    answersList:[],
  }

  handleInputChange=(event)=>{
    switch (event.target.name) {
      case 'question':
        this.setState({
          questionValue:event.target.value,
        });
        break;
      case 'answers':
        this.setState({
          answersValue:event.target.value,
        });
        break;
      case 'key':
        this.setState({
          keyValue:event.target.value,
        });
        break;
      default:
    }
  }

  onAddClick=()=>{
    let a = this.state.answersString;
    let newAnswers = a.split(","); //разделяем все значения по комам
    console.log('newAnswers: ',newAnswers);

    for (var i = 0; i < newAnswers.length; i++) {
      let str = newAnswers[i];
      newAnswers[i] = str.trim();
    }//убираем пробелы по краям у каждого элемента массива

    // this.state.allAnswers.push(...newAnswers);
    // newAnswers = this.state.allAnswers;

    let question={
      key:this.state.keyValue,
      question:this.state.questionValue,
      answersString:this.state.answersString,
      answers:newAnswers,
    };

    let newQuestions = this.state.questions;
    newQuestions.push(question);

    let newCount = ++this.state.count;

    this.setState({
      questions:newQuestions,
      count:newCount,
      answersList:[],      
    });//обновляем массив с вопросами и счётик

    this.questionInput.value=''; //чистим поля для ввода текста
    this.answersInput.value='';
    this.keyInput.value='';
  }

  onNextClick=()=>{
    let newExpert = this.props.expert;
    newExpert.questions = this.state.questions; //обновляем эксперта
    this.props.getConfigBody(<ConditionsBody expert={newExpert} answers={this.state.answers}/>);
  }

  onDelTagClick=(elem)=>{
    
    let answersList = this.state.answersList;
    let newAnswersList = [];
    let newAnswers;

    for(let i=0;i<answersList.length;i++){
      if(i==elem.target.id){
        continue; 
      }

      if(!newAnswers){
        newAnswers = answersList[i].key;
      }else
        newAnswers = newAnswers+', '+answersList[i].key;
      
      newAnswersList.push(
        <span key={answersList[i].key}>
          <span id={i} onClick={(elem)=>this.onDelTagClick(elem)}></span>
          {answersList[i].key}</span>
      );
    }

    this.setState({
      answersList:newAnswersList,
      answers:[],
      answersString:newAnswers,      
    });
  }

  onAnswersKeyDown=(event)=>{
    if(event.keyCode === 13){
      let answersList = this.state.answersList;
      let answersValue = this.state.answersValue;

      if(!answersValue){
        return;
      }

      let newAnswersList = [
        ...answersList,
        (
          <span key={answersValue}>
            <span id={answersList.length} onClick={(elem)=>this.onDelTagClick(elem)}></span>
            {answersValue}</span>
        )
      ];

      let newAnswers;
      if(!this.state.answersString){
        newAnswers = answersValue;
      }else
        newAnswers = this.state.answersString+', '+answersValue;

      this.answersInput.value='';

      this.setState({
        answersList:newAnswersList,
        answersValue:'',
        answersString:newAnswers,
      });
    }
  }

  render() {
    return (
      <div>
      <div className="CNE-questionDiv">
        <h2>2. Configuring questions</h2>
        <label className="CNE-questionDiv-labels">Question #{this.state.count}</label>
        <input type="text" name="question" placeholder="What day tomorow?" className="CNE-questionDiv-inputs"
          ref={(input)=>{this.questionInput = input}}
          onChange={this.handleInputChange}/>

        <label className="CNE-questionDiv-labels">Possible answers</label>
        <div className="questionDiv-answersTags">
          
          {this.state.answersList}

          <input type="text" id="questionDiv-answersInput" name="answers" placeholder="Add new answer..." className="CNE-questionDiv-inputs"
            ref={(input)=>{this.answersInput = input}}
            onChange={this.handleInputChange}
            onKeyDown={(event)=>this.onAnswersKeyDown(event)}/>
          
        </div>

        <label className="CNE-questionDiv-labels">Key</label>
        <input type="text" name="key" placeholder="tomorow" className="CNE-questionDiv-inputs"
          ref={(input)=>{this.keyInput = input}}
          onChange={this.handleInputChange}/>

        <div id="CNE-questionDiv-btns">
          <button type="button" name="addBtn" id="CNE-questionDiv-addBtn" onClick={this.onAddClick}>Add</button>
          <button type="button" name="nextBtn" id="CNE-questionDiv-nextBtn" onClick={this.onNextClick}>Go to conditions</button>
        </div>

      </div>
      <div className="CNE-list">
        <hr className="CNE-listDiv-line"/>
        <div className="CNE-questionListDiv">
          <ul className="CNE-questionListDiv-list">
            {this.state.questions.map((question, index)=>
              <li key={index} className="CNE-questionListDiv-listItem">
                <h3>Question #{index+1}:</h3>
                <p><mark>key</mark>: {question.key}</p>
                <p><mark>question</mark>: {question.question}</p>
                <p><mark>answers</mark>: {question.answersString}</p>
              </li>)}
          </ul>
        </div>
      </div>
    </div>
    )}
}

export default withRouter(connect(
  state=>({
    store: state
  }),
  dispatch=>({
    getConfigBody: (component)=>{
      dispatch({type:'GET_CONFIG_BODY',payload: component});
    }
  })
)(QuestionsBody));
