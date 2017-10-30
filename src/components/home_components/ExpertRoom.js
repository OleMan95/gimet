import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import '../../css/App.css';
import '../../css/Home.css';


const ExpertRoom=({store, dispatchNewExpert, name, getHomeBody, description})=>{

  const onCloseExpertClick=(id)=>{
    //Параметр null знатит то, что должно отобразится окно
    // активности (browseActivity)
    getHomeBody(null);
  }

  return (
    <div className="Home-content-body">
  		<div className="header-expertRoom">
        <div>
          <h3 className="header-expertRoom-expertName">{name}</h3>
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
        <p>{description}</p>
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
