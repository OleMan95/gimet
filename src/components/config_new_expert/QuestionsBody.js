import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter, Prompt } from 'react-router-dom';
import '../../css/App.css';
import '../../css/Home.css';
import InitBody from './InitBody';


// const QuestionsBody=({store, getConfigBody})=>{
class QuestionsBody extends React.Component{
  state = {
    isBlocking: true,
    textInput:'',
    questionValue:'',
    answersValue:'',
    keyValue:'',
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
    this.props.addQuestion(question);
  }

  render() {
    return (
      <div className="CNE-questionDiv">
      <Prompt
        when={true}
        message={location => (
          `Are you sure you want to go?`
        )}
      />

        <h2>2. Configuring questions</h2>
        <label className="CNE-questionDiv-labels">Question #1</label>
        <input type="text" name="question" placeholder="What day tomorow?" className="CNE-questionDiv-inputs"
          ref={(input)=>{this.state.textInput = input}}
          onChange={this.handleInputChange}/>

        <label className="CNE-questionDiv-labels">Possible answers</label>
        <input type="text" name="answers" placeholder="Monday, Wednesday, Friday" className="CNE-questionDiv-inputs"
          ref={(input)=>{this.state.textInput = input}}
          onChange={this.handleInputChange}/>

        <label className="CNE-questionDiv-labels">Key</label>
        <input type="text" name="key" placeholder="tomorow" className="CNE-questionDiv-inputs"
          ref={(input)=>{this.state.textInput = input}}
          onChange={this.handleInputChange}/>

        <button type="button" name="nextBtn" id="CNE-questionDiv-addBtn" onClick={this.onAddClick}>Add</button>

      </div>
    )
  }
}

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({
    addQuestion: (question)=>{
      dispatch({type:'ADD_QUESTION',payload: question});
    }
  })
)(QuestionsBody));
