import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import '../../css/App.css';
import '../../css/Home.css';


class ConditionsBody extends React.Component{
  state = {
    conditions:[],
    count:1,
    selectorGroups:[],
    questions:[]
  }

  onPlusClick=()=>{
    let selectorGroup = (
      <div className="CNE-conditionDiv-selectors">
        <select name="key_select">
          {this.props.expert.questions.map((question, index) =>
            <option value={question.key} key={index}> {question.key} </option>)}
        </select>
        <p>=</p>
        <select name="my_select2">
          <option value="1">one</option>
          <option value="2">two</option>
          <option value="3">three</option>
        </select>
      </div>
    );
    let newSelectorGroups = [...this.state.selectorGroups, selectorGroup];

    this.setState({
      selectorGroups:newSelectorGroups,
    });
  }

  onAddClick=()=>{

  }

  onFinishClick=()=>{
  }

  componentDidMount=()=>{
    console.log('ConditionsBody - expert: ', this.props.expert);
  }

  render() {
    return (
      <div className="CNE-main">
      <div className="CNE-conditionDiv">

        <h2>3. Configuring conditions</h2>
        <label className="CNE-conditionDiv-labels">Condition #{this.state.count}</label>
        <label className="CNE-conditionDiv-labels">if</label>
        <div className="CNE-conditionDiv-selectorsBlock">
          <div className="CNE-conditionDiv-selectors">
            <select name="key_select">
              {this.props.expert.questions.map((question, index) =>
                <option value={question.key} key={index}> {question.key} </option>)}
            </select>
            <p>=</p>
            <select name="my_select2">
              <option value="1">one</option>
              <option value="2">two</option>
              <option value="3">three</option>
            </select>
          </div>
          {this.state.selectorGroups}
        </div>
        <button type="button" name="addBtn" id="CNE-conditionDiv-selectors-plusBtn" onClick={this.onPlusClick}>+</button>

        <label className="CNE-conditionDiv-labels">then</label>
        <div className="CNE-conditionDiv-resultSelector">
          <p className="CNE-conditionDiv-result">result</p>
          <p>=</p>
          <input type="text" name="question" placeholder="Enter result here" className="CNE-questionDiv-inputs"
            ref={(input)=>{this.questionInput = input}}
            onChange={this.handleInputChange}/>
        </div>

        <div id="CNE-questionDiv-btns">
          <button type="button" name="addBtn" id="CNE-questionDiv-addBtn" onClick={this.onAddClick}>Add</button>
          <button type="button" name="nextBtn" id="CNE-conditionDiv-finalBtn" onClick={this.onFinishClick}>Finish</button>
        </div>
      </div>

      <div className="CNE-conditionDiv-questionList">
        <ul className="CNE-conditionDiv-questionList-list">
          {this.props.expert.questions.map((question, index)=>
            <li key={index} className="CNE-conditionDiv-questionListDiv-listItem">
              <h3>Question #{index+1}:</h3>
              <p><mark>key</mark>: {question.key}</p>
              <p><mark>question</mark>: {question.question}</p>
              <p><mark>answers</mark>: {question.answers}</p>

            </li>)}
        </ul>
      </div>

      </div>
    )}
}

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({

  })
)(ConditionsBody));
