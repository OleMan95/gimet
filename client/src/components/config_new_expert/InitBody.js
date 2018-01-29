import React from 'react';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import ConfigDevelop from './ConfigDevelop';

const InitBody=({getConfigBody})=>{
  let expertNameValue = '';
  let descriptionValue = '';

  const handleInputChange=(event)=>{
    switch (event.target.name) {
      case 'expertname':
        expertNameValue = event.target.value;
        if(expertNameValue.length > 5){
          document.getElementsByClassName('CNE-initDiv-input')[0].style.borderColor = '#2ecc71';
          return;
        }else{
          document.getElementsByClassName('CNE-initDiv-input')[0].style.borderColor = '#989898';          
        }
        break;
      case 'description':
        descriptionValue = event.target.value;
        break;
      default:
    }
  };

  const onNextClick=()=>{
    if(!expertNameValue || expertNameValue.length < 6){
      document.getElementsByClassName('CNE-initDiv-input')[0].style.borderColor = '#e74c3c';
      alert('The expert name must be at least 6 characters!');
      return;
    }else{
      document.getElementsByClassName('CNE-initDiv-input')[0].style.borderColor = '#2ecc71';      
    }

    const expert = {
       name: expertNameValue,
       description: descriptionValue,
       questions:[],
    };
    getConfigBody(<ConfigDevelop expert={expert}/>);
  };

  return (
    <div className="CNE-initDiv">
      <h2>1. Begin</h2>

      <label className="CNE-initDiv-labels">Expert name</label>
      <input type="text" name="expertname" placeholder="Pick an expert name" className="CNE-initDiv-input"
        onChange={handleInputChange}/>

      <label className="CNE-initDiv-labels">Description</label>
      <textarea rows="4" className="CNE-initDiv-textarea" placeholder="Text..." name="description"
        onChange={handleInputChange}/>

      <button type="button" name="nextBtn" id="CNE-initDiv-nextBtn" onClick={onNextClick}>Next</button>
    </div>
  );
};


export default withRouter(connect(
  state=>({
    store: state,
    // questions: state.accountReducer[0].experts[0].questions,
  }),
  dispatch=>({
    getConfigBody: (component)=>{
      dispatch({type:'GET_CONFIG_BODY',payload: component});
    }
  })
)(InitBody));
