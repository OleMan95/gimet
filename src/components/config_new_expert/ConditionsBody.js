import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import * as firebase from 'firebase';

import '../../css/App.css';
import '../../css/Home.css';

class ConditionsBody extends React.Component{
  state = {
    conditions:{
      pairs:[],
      result:''
    },
    count:1,
    selectGroups:[
      (
        <div className="CNE-conditionDiv-pair" key="0">
          <input type="text" id="key0" onChange={(input)=>{this.handleChange(input)}}/>
          <p>=</p>
          <input type="text" id="answer0" onChange={(input)=>{this.handleChange(input)}}/>
          <button type="button" name="deleteBtn" id="CNE-conditionDiv-deleteBtn" onClick={this.onDeleteClick}>x</button>
        </div>
      )
    ],
    questions:[],
    pairsCount:0,
    keyTargetId:'key0',
    answerTargetId:'answer0',
    keyTargetValue:'',
    answerTargetValue:'',
  }

  setPair=()=>{
    if (this.state.keyTargetValue==="" && this.state.answerTargetValue==="") {
      return;
    }
    let pair = [this.keyTargetValue, this.answerTargetValue];
    let newConditions = this.state.conditions;
    newConditions.pairs.push(pair);
    
    this.setState({
      conditions:newConditions,
    });
    console.log('setPair: ',newConditions);

  }

  onPlusClick=()=>{
    this.setPair();

    let pairsCount = this.state.pairsCount;
    pairsCount++;
    
    let keyTargetId = 'key'+pairsCount;
    let answerTargetId = 'answer'+pairsCount;

    this.setState({
      keyTargetId:keyTargetId,
      answerTargetId:answerTargetId,
    });


    let selectGroup = (
      <div className="CNE-conditionDiv-pair" key={pairsCount}>
        <input type="text" id={keyTargetId} onChange={(input)=>{this.handleChange(input)}} />
        <p>=</p>
        <input type="text" id={answerTargetId} onChange={(input)=>{this.handleChange(input)}} />
        <button type="button" name="deleteBtn" id="CNE-conditionDiv-deleteBtn" onClick={this.onDeleteClick}>x</button>
        
      </div>
    );
    
    let newSelectGroups = [...this.state.selectGroups, selectGroup];

    this.setState({
      selectGroups:newSelectGroups,
      pairsCount: pairsCount,
    });

  }
  onDeleteClick=()=>{}

  onAddClick=()=>{
  }

  onFinishClick=()=>{
  }

  handleChange=(input)=>{
    
    if (input.target.id === this.state.keyTargetId) {
      this.setState({
        keyTargetValue:input.target.value,
      });
      console.log('handleSelectChange: ',input.target.value);
    }

    if (input.target.id === this.state.answerTargetId) {
      this.setState({
        answerTargetValue:input.target.value,
      });
      console.log('handleSelectChange: ',input.target.value);
    }

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

        <div className="CNE-conditionDiv-pairs">
            {this.state.selectGroups}
        </div>
        <button type="button" name="addBtn" id="CNE-conditionDiv-plusBtn" onClick={this.onPlusClick}>+</button>

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
              <p><mark>answers</mark>: {question.answersString}</p>
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
