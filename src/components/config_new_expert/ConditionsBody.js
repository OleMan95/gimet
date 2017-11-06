import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import * as firebase from 'firebase';

import '../../css/App.css';
import '../../css/Home.css';
import InitBody from './InitBody';

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
    conditionsDOMList: true,
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
    
    let pair = {
      key: this.state.keyTargetValue,
      answer: this.state.answerTargetValue
    };

    
    let tempCondition = this.state.tempCondition;
    tempCondition.pairs.push(pair);
    
    this.setState({
      tempCondition: tempCondition,
    });
    
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

  setToFirebase=()=> {
    let expert = this.props.expert;
    expert.conditions = this.state.conditions;

    this.props.newExpert(expert);    

    firebase.database().ref('experts/' + expert.name).set({
      name: expert.name,
      description: expert.description,
      questions: expert.questions,
      conditions: expert.conditions
    });
  }

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

    this.addInConditionsList();
  }

  onFinishClick=()=>{
    this.setToFirebase();  
    this.props.getConfigBody(<InitBody/>);    
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

  addInConditionsList=()=>{
    let conditions = this.state.conditions;
    let conDOMList = []; // :P

    for (let i=0; i<conditions.length; i++){

      conDOMList.push(
        <div className="CNE-conditionsList-listItem" key={'condition'+i}>
          <h3>Condition #{i+1}</h3> 
          <h4>if</h4>
          {this.state.conditions[i].pairs.map((pair,index)=>
            <p key={index}><mark>{pair.key}</mark> = {pair.answer}</p>
          )}
          <h4>then</h4>
          <p><mark>result</mark> = {this.state.conditions[i].result}</p>
          <hr/>
        </div>
      );

    }

    console.log('addInConditionsList: ', this.state.conditions);

    this.setState({
      conditionsDOMList: conDOMList,
    });
  }

  componentDidMount=()=>{
    console.log('ConditionsBody - expert: ', this.props.expert);
  }

  render() {
    return (
      <div className="CNE">
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
              <NavLink to="/home" name="nextBtn" id="CNE-conditionDiv-finishBtn" onClick={this.onFinishClick}>Finish</NavLink>
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

        <div className="CNE-conditionsList">
          <div className="CNE-conditionsList-list">
            {this.state.conditionsDOMList}
          </div>
        </div>
      </div>
    )}
}

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({
    newExpert: (expert)=>{
      dispatch({type:'NEW_EXPERT',payload: expert});
    },
    getConfigBody: (component)=>{
      dispatch({type:'GET_CONFIG_BODY',payload: component});
    }
  })
)(ConditionsBody));
