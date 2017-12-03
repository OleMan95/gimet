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
    answersValue:'',
    resultValue:'',
    answers:[],
    results:[],
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
          answersValue:event.target.value,
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

  // выводить список с ответами и результатами при нажатии на Enter
  // добавить ввод типа результата
  // заполнить массив this.state.answers
  // заполнить массив this.state.results
  // добавить запись всего эксперта в Firebase по нажатию на кнопку Finish

  onAddClick=()=>{
    let expert = this.state.expert;
    expert.question = {
      key:this.state.keyValue,
      question:this.state.keyValue,
      answers:this.state.answers,
      results:this.state.results
    };

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
            onChange={(elem)=>this.handleInputChange(elem)}
            onKeyDown={(event)=>this.onAnswersKeyDown(event)}/>
          
          <input type="text" id="CD-content-keyInput" name="key" 
            placeholder="Enter the key for this question"
            onChange={(elem)=>this.handleInputChange(elem)}/>

          <div>

            <ul className="CD-answersList">
              <li className="CD-answerItem">
                <mark>1.</mark>
                <p>Answer value 1</p>
                <div></div>
              </li>
              <li className="CD-answerItem">
                <mark>2.</mark>
                <p>Answer value 2</p>
                <div></div>
              </li>
            </ul>


            <ul className="CD-resultsList">
              <li className="CD-resultItem">
                <mark>Result 1:</mark>
                <input type="text" className="CD-resultInput" 
                  name="result" 
                  placeholder="Enter the result for answer #1"
                  ref={(input)=>{this.answersInput = input}}                  
                  onChange={(elem)=>this.handleInputChange(elem)}/>
              </li>
              <li className="CD-resultItem">
                <mark>Result 2:</mark>
                <input type="text" className="CD-resultInput" 
                  name="result" 
                  placeholder="Enter the result for answer #2"
                  ref={(input)=>{this.answersInput = input}}
                  onChange={(elem)=>this.handleInputChange(elem)}/>
              </li>
            </ul>

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
