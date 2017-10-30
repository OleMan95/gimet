import React from 'react';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';

import '../../css/App.css';
import '../../css/Home.css';
import QuestionsBody from './QuestionsBody';

const InitBody=({store, questions, getConfigBody, newExpert, getQuestions})=>{
  let expertnameInput = '';
  let descriptionInput = '';
  let expertnameValue = '';
  let descriptionValue = '';

  const handleInputChange=(event)=>{
    switch (event.target.name) {
      case 'expertname':
        expertnameValue = event.target.value;
        break;
      case 'description':
        descriptionValue = event.target.value;
        break;
      default:
    }
  }

  const getQuestionsArray=()=>{
    let arr = new Array();
    for (var i = 0; i < questions.length; i++) {
      arr.push(<li key={i}>{questions[i].question}</li>);
    }
    console.log('arr: ',arr);
    getQuestions(arr);
  }

  const onNextClick=()=>{
    var expert = {
       name:expertnameValue,
       description: descriptionValue,
       questions:[],
    }
    newExpert(expert);
    getQuestionsArray();
    getConfigBody(<QuestionsBody expert={expert}/>);
  }

  // <NavLink to="/home" type="button" name="nextBtn" id="CNE-initDiv-nextBtn" onClick={onInitNextClick}>Next</NavLink>
  return (
    <div className="CNE-initDiv">
      <h2>1. Begin</h2>

      <label className="CNE-initDiv-labels">Expert name</label>
      <input type="text" name="expertname" placeholder="Pick an expert name" className="CNE-initDiv-input"
        ref={(input)=>{expertnameInput = input}}
        onChange={handleInputChange}/>

      <label className="CNE-initDiv-labels">Description</label>
      <textarea rows="4" className="CNE-initDiv-textarea" placeholder="Text..." name="description"
      ref={(input)=>{descriptionInput = input}}
      onChange={handleInputChange}/>

      <button type="button" name="nextBtn" id="CNE-initDiv-nextBtn" onClick={onNextClick}>Next</button>
    </div>
  );
}
// <input type="text" name="description" placeholder="Text..." className="CNE-initDiv-inputs"
//   ref={(input)=>{descriptionInput = input}}
//   onChange={handleInputChange}/>
export default withRouter(connect(
  state=>({
    store: state,
    questions: state.accountReducer[0].experts[0].questions,
    // questions: state.accountReducer[0].experts[state.accountReducer[0].experts.length-1].questions,
  }),
  dispatch=>({
    newExpert: (expert)=>{
      dispatch({type:'NEW_EXPERT',payload: expert});
    },
    getConfigBody: (component)=>{
      dispatch({type:'GET_CONFIG_BODY',payload: component});
    },
    getQuestions: (questions)=>{
      dispatch({type:'GET_CONFIG_BODY',payload: questions});
    }
  })
)(InitBody));
