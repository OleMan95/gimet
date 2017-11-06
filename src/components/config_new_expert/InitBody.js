import React from 'react';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import * as firebase from 'firebase';

import '../../css/App.css';
import '../../css/Home.css';
import QuestionsBody from './QuestionsBody';

const InitBody=({store, questions, getConfigBody, newExpert, getQuestions, updateExpert})=>{
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

  const writeExpert=(expertId, expert)=> {
    firebase.database().ref('experts/' + expertId).set({
      name: expert.name,
      description: expert.description,
      questions: expert.questions,
      conditions: expert.conditions
    });
  }



  const onNextClick=()=>{
    var expert = {
       name:expertnameValue,
       description: descriptionValue,
       questions:{},
       conditions:{
         pairs:[],
         result:''
       }
    }
    // writeExpert(expert.name, expert);
    getConfigBody(<QuestionsBody expert={expert}/>);
  }

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


export default withRouter(connect(
  state=>({
    store: state,
    questions: state.accountReducer[0].experts[0].questions,
  }),
  dispatch=>({
    getConfigBody: (component)=>{
      dispatch({type:'GET_CONFIG_BODY',payload: component});
    }
  })
)(InitBody));
