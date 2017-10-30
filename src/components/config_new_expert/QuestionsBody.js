import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter, Prompt } from 'react-router-dom';
import '../../css/App.css';
import '../../css/Home.css';
import ConditionsBody from './ConditionsBody';


class QuestionsBody extends React.Component{
  state = {
    count: 1,
    questionValue:'',
    answersValue:'',
    keyValue:'',
    questions:[],
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
    let question={
      key:this.state.keyValue,
      question:this.state.questionValue,
      answers:this.state.answersValue,
    };
    let newQuestions = this.state.questions;
    newQuestions.push(question);

    let newCount = ++this.state.count;

    this.setState({
      questions:newQuestions,
      count:newCount,
    });//обновляем массив с вопросами и счётик

    this.questionInput.value=''; //чистим поля для ввода текста
    this.answersInput.value='';
    this.keyInput.value='';
  }

  onNextClick=()=>{
    let newExpert = this.props.expert;
    newExpert.questions = this.state.questions; //обновляем эксперта
    console.log('QuestionsBody: ',this.props.expert);
    this.props.getConfigBody(<ConditionsBody expert={newExpert}/>);
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
        <input type="text" name="answers" placeholder="Monday, Wednesday, Friday" className="CNE-questionDiv-inputs"
          ref={(input)=>{this.answersInput = input}}
          onChange={this.handleInputChange}/>

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
                <p><mark>answers</mark>: {question.answers}</p>
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
    newExpert: (expert)=>{
      dispatch({type:'NEW_EXPERT',payload: expert});
    },
    getConfigBody: (component)=>{
      dispatch({type:'GET_CONFIG_BODY',payload: component});
    }
  })
)(QuestionsBody));
