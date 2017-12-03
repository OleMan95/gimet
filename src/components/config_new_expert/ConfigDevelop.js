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
    keyValue:'',
    questionValue:'',
    answerValue:'',
    resultValue:'',
    answers:[],
    results:[],
    answersList:[],
    resultsList:[],
    answersCount:1, 
    answersString:'',    
  }

  handleInputChange=(event)=>{
    switch (event.target.name) {
      case 'question':
        this.setState({
          questionValue:event.target.value,
        });
        break;
      case 'answer':
        this.setState({
          answerValue:event.target.value,
        });
        break;
      case 'key':
        this.setState({
          keyValue:event.target.value,
        });
        break;
      case 'result':
        this.setState({
          resultValue:event.target.value,
        });
        break;
      default:
    }
  }

  // заполнить массив this.state.results
  // добавить запись всего эксперта в Firebase по нажатию на кнопку Finish

  onKeyDown=(event)=>{
    if(event.keyCode === 13){
      let answersList = this.state.answersList;
      let answersValue = this.state.answerValue;
      let newAnswersCount = this.state.answersCount;
      let answers = this.state.answers;
      
      let resultsList = this.state.resultsList;
      let resultValue = this.state.resultValue;
      
      if(!answersValue) return;
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
        ...answersList,
        (
          <li className="CD-answerItem" key={answerValue} id={newAnswersCount}>
            <mark>{newAnswersCount}.</mark>
            <p>{answerValue}</p>
            <div id={answersList.length} 
              onClick={(elem)=>this.onDelTagClick(elem)}></div>
          </li>
        )
      ];
      let newResultsList = [
        // <mark>Result {newAnswersCount}:</mark>
        ...resultsList,
        (
          <li className="CD-resultItem" key={answerValue}>
            <select defaultValue="key">
              <option value="key">key</option>
              <option value="text">text</option>
            </select>
            <input type="text" className="CD-resultInput" 
              name="result"
              placeholder={"Result for answer №"+newAnswersCount}
              onChange={(elem)=>this.handleInputChange(elem)}/>
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

  onAddClick=()=>{
    let expert = this.state.expert;
    let newQuestions = expert.questions;
    newQuestions.push({
      key:this.state.keyValue,
      question:this.state.questionValue,
      answers:this.state.answers,
      results:this.state.results
    }); 
    expert.questions = newQuestions;


    console.log(expert);
    
    this.setState({
      expert: expert,
    });
    // очистить поля и массивы.
  }

  render() {
    return (
      <div className="CD-questionBody">
        <div className="CD-header">
          <div>
            <h3>Question #{this.state.questionCount}</h3>
          </div>
        </div>

        <div className="CD-content">
          <textarea type="text" rows="5" name="question" 
            placeholder="Write here your question" 
            onChange={(elem)=>this.handleInputChange(elem)}/>

          <input type="text" id="CD-content-answersInput" name="answer" 
            placeholder="Add new answer"
            ref={(input)=>{this.answersInput = input}}            
            onChange={(elem)=>this.handleInputChange(elem)}
            onKeyDown={(event)=>this.onKeyDown(event)}/>
          
          <input type="text" id="CD-content-keyInput" name="key" 
            placeholder="Enter the key for this question"
            onChange={(elem)=>this.handleInputChange(elem)}/>

          <div>

            <div className="CD-answersDiv">
              <h3>Answers:</h3>
              <ul className="CD-answersList">
                {this.state.answersList}
              </ul>
            </div>

            <div className="CD-resultsDiv">
              <h3>Results:</h3>
              <ul className="CD-resultsList">
                {this.state.resultsList}
              </ul>
            </div>

          </div>

          <div className="CD-buttons">
            <button type="button" name="addBtn" id="CD-buttons-addBtn" 
              onClick={this.onAddClick}>Add</button>
            <button type="button" name="finishBtn" id="CD-buttons-finishBtn" 
              onClick={this.onNextClick}>Finish</button>
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
)(ConfigDevelop));
