import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter, Prompt } from 'react-router-dom';
import * as firebase from 'firebase';

import '../../css/App.css';
import '../../css/Home.css';
import ConditionsBody from './ConditionsBody';

/*
  expert:{
    name:'',
    description:'',
    questions:[
      {
        key:'q1',
        question:'question 1',
        answersString:'value 1, value 2',
        answers:['value 1' , 'value 2'],
        results:[
          {type:'key',value:'q2'},
          {type:'text',value:'result 2'}
        ]
      }
    ]
  }
*/

class ConfigDevelop extends React.Component{
  state = {
    questionCount:1,
    expert:{
      name:this.props.expert.name,
      description:this.props.expert.description,
      questions:[]
    },
    unsolvedQuestions:[],
    keyValue:'',
    questionValue:'',
    answerValue:'',
    answers:[],
    answersList:[],
    resultsList:[],
    answersCount:1, 
    answersString:'',
    finishMassage:'Are you sure you want to go?' 
  }

  handleInputChange=(event)=>{
    let value = event.target.value.trim();
    switch (event.target.name) {
      case 'question':
        this.setState({
          questionValue:value.trim(),
        });
        break;
      case 'answer':
        this.setState({
          answerValue:value.trim(),
        });
        break;
      case 'key':
        this.setState({
          keyValue:value.trim(),
        });
        break;
      // case 'result':
      //   this.setState({
      //     resultValue:event.target.value,
      //   });
        break;
      default:
    }
  }

  onKeyDown=(event)=>{
    if(event.keyCode === 13){
      let answersList = this.state.answersList;
      let answersValue = this.state.answerValue;
      let newAnswersCount = this.state.answersCount;
      let answers = this.state.answers;

      if(!this.answersInput.value || 
        this.answersInput.value.trim() === ''){
          return;
      }
      
      let resultsList = this.state.resultsList;
      // let resultValue = this.state.resultValue;
      
      if(!answersValue){
        alert('No answer value found!');
        return;
      }
      let str = answersValue;
      let answerValue = str.trim();
      //убираем пробелы по краям ответа

      for(let i=0; i<this.state.answersList.length; i++){
        if(this.state.answers[i] == answerValue || !answerValue){
          return;          
        }
      }

      let newAnswers = [
        ...answers,
        answerValue
      ];
      let newAnswersList = [
        // <mark>{newAnswersCount}.</mark>
        ...answersList,
        (
          <li key={answerValue}>
            <div className="CD-answerItem">
              <div>
                <p>{answerValue}</p>
              </div>
              <div onClick={()=>this.onDelTagClick(answerValue)}></div>
            </div>            
          </li>
        )
      ];
      let newResultsList = [
        // <mark>Result {newAnswersCount}:</mark>
        ...resultsList,
        (
          <li key={answerValue}>
            <div className="CD-resultItem">
              <select defaultValue="key" className="CD-resultSelect">
                <option value="key">key</option>
                <option value="text">text</option>
              </select>
              <input type="text" className="CD-resultInput"
                name="result"
                placeholder={"Result for an answer with the same number"}
                onChange={(elem)=>this.handleInputChange(elem)}/>
            </div>
              
          </li>
        )
      ];

      let newAnswersString;
      if(!this.state.answersString) newAnswersString = answerValue;
      else newAnswersString = this.state.answersString+', '+answerValue;

      this.answersInput.value='';

      newAnswersCount++;
      this.setState({
        answersList:newAnswersList,
        resultsList:newResultsList,
        answersValue:'',
        answersString:newAnswersString,
        answersCount:newAnswersCount,
        answers:newAnswers,        
      });
    }
  }
  onDelTagClick=(value)=>{
    let index;
    let answers = this.state.answers;
    let answersList = this.state.answersList;
    let resultsList = this.state.resultsList;

    for(let i=0; i<answers.length; i++){
      if(answers[i] == value){
        console.log(answers[i], ' = ',value);
        answers.splice(i, 1);
        answersList.splice(i, 1);
        resultsList.splice(i, 1);
      }
    }

    this.setState({
      answersList: answersList,
    });      
  }
  onAddClick=()=>{
    if(this.state.answers.length <=0){
      alert('No answers found! ');
      return;
    }else if(!this.questionInput.value || 
      this.questionInput.value.trim() === ''){
        alert('Question field is empty.');
        return;
    }else if(!this.keyInput.value || 
      this.keyInput.value.trim() === ''){
        alert('Enter the question key.');
        return;
    }

    let questionCount = this.state.questionCount;
    let expert = this.state.expert;
    let newQuestions = expert.questions;
    let resultValues = document.getElementsByClassName("CD-resultInput");
    let resultTypes = document.getElementsByClassName("CD-resultSelect");
    let newResults = [];
    let unsolvedQuestions = this.state.unsolvedQuestions;
    let value = '';
    let type = '';

    for(let j=0; j<expert.questions.length; j++){
      if(expert.questions[j].key === this.state.keyValue){
        alert('Question "'+ this.state.keyValue +'" already exist.');
        return;        
      }
    }      

    for(let i=0; i<resultValues.length; i++){
      if(resultValues[i].value == '') {
        alert('Error! Result №'+(i+1)+' is empty.');
        return;
        // Проверка полей ввода результата на пустое значение. 
        // Если поле "Result" пустое, то выводится сообщение.  
      }else{
        value = resultValues[i].value;
        type = resultTypes[i].value;
        newResults.push({
          type:type,
          value:value
        });

        if(type === 'key'){
          unsolvedQuestions.push(value);
        }
      }
    }
    
    newQuestions.push({
      key:this.state.keyValue,
      question:this.state.questionValue,
      answers:this.state.answers,
      results:newResults
    }); 
    expert.questions = newQuestions;
    
    let unsolvedQuestionsIndex = this.state.unsolvedQuestions.indexOf(this.state.keyValue);

    if(unsolvedQuestionsIndex >= 0){
      unsolvedQuestions.splice(unsolvedQuestionsIndex, 1);
    }else if(unsolvedQuestionsIndex < 0){
    }

    console.log('unusedKey: ',unsolvedQuestions);

    questionCount++;
    this.setState({
      expert: expert,
      keyValue:'',
      questionValue:'',
      answers:[],
      answersList:[],
      resultsList:[],
      answersCount:1,
      questionCount:questionCount,
    });

    this.questionInput.value = '';
    this.keyInput.value = '';
    this.answersInput.value = '';
    // document.getElementById('CD-keyinput').value = '';
  }
  onFinish=()=>{
    let unsolvedQuestions = this.state.unsolvedQuestions;

    this.setToFirebase();
    if(unsolvedQuestions.length > 0){
      let msg = 'You have unsolved questions: '
        +unsolvedQuestions+". Are you sure you want to go?";
      return msg;
    }else {
      return "Are you sure you want to go?";
    }
  }
  setToFirebase=()=> {
    let expert = this.state.expert;

    firebase.database().ref('experts/' + expert.name).set({
      name: expert.name,
      description: expert.description,
      questions: expert.questions
    });
  }

  render() {
    return (
      <div className="CD-questionBody">
        <div className="CD-header">
          <div>
            <h3>Question #{this.state.questionCount}</h3>
          </div>
        </div>

        <Prompt when={true} message={(location) => {return this.onFinish();}}/>

        <div className="CD-content">
          <textarea type="text" rows="5" name="question" id='CD-questioninput'
            ref={(input)=>{this.questionInput = input}}           
            placeholder="Write here your question" 
            onChange={(elem)=>this.handleInputChange(elem)}/>

          <input type="text" id="CD-content-keyInput" name="key" 
            id='CD-keyinput'
            ref={(input)=>{this.keyInput = input}}           
            placeholder="Enter the key for this question"
            onChange={(elem)=>this.handleInputChange(elem)}/>

          <input type="text" id="CD-content-answersInput" name="answer" 
            id='CD-answerinput'
            placeholder="Add new answer"
            ref={(input)=>{this.answersInput = input}}            
            onChange={(elem)=>this.handleInputChange(elem)}
            onKeyDown={(event)=>this.onKeyDown(event)}/>
          
          <div>

            <div className="CD-answersDiv">
              <h3>Answers:</h3>
              <ol className="CD-answersList">
                {this.state.answersList}
              </ol>
            </div>

            <div className="CD-resultsDiv">
              <h3>Results:</h3>
              <ol className="CD-resultsList">
                {this.state.resultsList}
              </ol>
            </div>

          </div>

          <div className="CD-buttons">
            <button type="button" name="addBtn" id="CD-buttons-addBtn" 
              onClick={this.onAddClick}>Add</button>
            <NavLink to="/home" type="button" name="finishBtn" 
              id="CD-buttons-finishBtn">Finish</NavLink>
          </div>


        </div>
      </div>
    )}
  }

export default withRouter(connect(
  state=>({
    store: state
  }),
  dispatch=>({})
)(ConfigDevelop));
