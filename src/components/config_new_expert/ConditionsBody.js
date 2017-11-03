import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import * as firebase from 'firebase';

import '../../css/App.css';
import '../../css/Home.css';

class ConditionsBody extends React.Component{
  state = {
    conditions:[],
    tempCondition:{
      pairs:[],
      result:''
    },
    count:1,
    selectGroups: [
      <div className="CNE-conditionDiv-pair" key='-1'>
        <p className="CNE-conditionDiv-conditionHint">The condition list is empty, create a new condition.</p>
      </div> 
    ],
    selectGroupsHelper: true,
    questions:[],
    pairsCount:0,
    keyTargetId:'',
    answerTargetId:'',
    keyTargetValue:'',
    answerTargetValue:'',
    resultValue:'',
  }

  setPair=()=>{
    if (this.state.keyTargetValue==="" && this.state.answerTargetValue==="") {
      return;
    }

    console.log('setPair: ',this.state.keyTargetValue);
    console.log('setPair: ',this.state.answerTargetValue);
    
    let pair = {
      key: this.state.keyTargetValue,
      answer: this.state.answerTargetValue
    };

    
    let tempCondition = this.state.tempCondition;
    tempCondition.pairs.push(pair);
    
    this.setState({
      tempCondition: tempCondition,
    });
    
    console.log('setPair conditions: ',this.state.tempCondition);

    document.getElementById(this.state.keyTargetId).style.borderColor = '#2ecc71';
    document.getElementById(this.state.answerTargetId).style.borderColor = '#2ecc71';
    document.getElementById(this.state.answerTargetId).nextElementSibling.style.display = 'block';

  }

  onPlusClick=()=>{


    this.setPair();

    let pairsCount = this.state.pairsCount;
    
    let keyTargetId = 'key'+pairsCount;
    let answerTargetId = 'answer'+pairsCount;

    this.setState({
      keyTargetId:keyTargetId,
      answerTargetId:answerTargetId,
    });


    let selectGroup = (
      <div className="CNE-conditionDiv-pair" key={pairsCount}>
        <input type="text" placeholder="Enter key" id={keyTargetId} onChange={(input)=>{this.handleChange(input)}} />
        <p>=</p>
        <input type="text" placeholder="Enter answer" id={answerTargetId} onChange={(input)=>{this.handleChange(input)}} />
        <button type="button" name="deleteBtn" id="CNE-conditionDiv-deleteBtn" onClick={this.onDeleteClick}>x</button>
      </div>
    );
    let newSelectGroups;
    if(this.state.selectGroupsHelper === true){
      newSelectGroups = [selectGroup];
            
      this.setState({
        selectGroupsHelper:false
      });
    }else{
      newSelectGroups = [...this.state.selectGroups, selectGroup];
    }

    pairsCount++;
    
    this.setState({
      selectGroups:newSelectGroups,
      pairsCount: pairsCount,
    });

  }
  onDeleteClick=()=>{}

  onAddClick=()=>{

   
    let tempCondition = this.state.tempCondition;
    tempCondition.result = this.state.resultValue;
    
    let newConditions = this.state.conditions;
    newConditions.push(tempCondition);

    this.setState({
      conditions: newConditions,
      tempCondition:{
        pairs:[],
        result:''
      },
      selectGroups: [
        <div className="CNE-conditionDiv-pair" key='-1'>
          <p className="CNE-conditionDiv-conditionHint">The condition list is empty, create a new condition.</p>
        </div> 
      ],
      selectGroupsHelper: true,
      pairsCount:0,
      keyTargetId:'',
      answerTargetId:'',
      keyTargetValue:'',
      answerTargetValue:'',
    });

    document.getElementById('resultInput').value = '';

    console.log('onAddClick: ', this.state.conditions);

  }

  onFinishClick=()=>{
  }

  handleChange=(input)=>{
    
    if (input.target.id === this.state.keyTargetId) {
      this.setState({
        keyTargetValue:input.target.value,
      });
    }

    if (input.target.id === this.state.answerTargetId) {
      this.setState({
        answerTargetValue:input.target.value,
      });
    }

    if (input.target.id === 'resultInput') {
      this.setState({
        resultValue:input.target.value,
      });
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
        <button type="button" name="addBtn" id="CNE-conditionDiv-plusBtn" onClick={this.onPlusClick}>New condition</button>

        <label className="CNE-conditionDiv-labels">then</label>
        <div className="CNE-conditionDiv-resultSelector">
          <p className="CNE-conditionDiv-result">result</p>
          <p>=</p>
          <input type="text" name="question" id="resultInput" placeholder="Enter result here" className="CNE-questionDiv-inputs"
            onChange={(input)=>{this.handleChange(input)}}/>
        </div>

        <div id="CNE-questionDiv-btns">
          <button type="button" name="addBtn" id="CNE-questionDiv-addBtn" onClick={this.onAddClick}>Add</button>
          <button type="button" name="nextBtn" id="CNE-conditionDiv-finishBtn" onClick={this.onFinishClick}>Finish</button>
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
