import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, NavLink, withRouter } from 'react-router-dom';
import '../css/App.css';
import '../css/Home.css';


var count = 0;
const ExpertRoom=({store, dispatchNewExpert, id, getHomeBody})=>{
  console.log('store: ',store);

  const onCloseExpertClick=(id)=>{
    //Параметр null знатит то, что должно отобразится окно
    // активности (browseActivity)
    getHomeBody(null);
  }

  return (
    <div className="Home-content-body">
  		<div className="header-expertRoom">
        <div>
          <h3 className="header-expertRoom-expertName">{id}</h3>
        </div>
        <div className="header-expertRoom-btns">
          <button className="header-expertRoom-configureExpert">
            <h3>Configure</h3>
          </button>
          <button onClick={onCloseExpertClick}>
            <h3>X</h3>
          </button>
        </div>
  		</div>
  		<div className="expertRoom-body">
  		</div>
    </div>
  );
}

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({
    dispatchNewExpert: (expert)=>{
      dispatch({type:'NEW_EXPERT',payload: expert});
    },
    getHomeBody: (id)=>{
      dispatch({type:'GET_HOME_BODY',payload: id});
    }
  })
)(ExpertRoom));
