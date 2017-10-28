import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, NavLink, withRouter } from 'react-router-dom';
import '../css/App.css';
import '../css/Home.css';
import ExpertRoom from './ExpertRoom';


var count = 0;
const Home=({store, dispatchNewExpert, getHomeBody})=>{
  // console.log('store: ',store);
  const browseActivity=(
	  <div className="Home-content-body">
  		<div className="content-body-header">
  		  <button className="content-body-header-text1">
  			<h3>Browse activity</h3>
  		  </button>
  		  <button className="content-body-header-text2">
  			<h3>Find an expert</h3>
  		  </button>
  		</div>
  		<div className="content-body">
  		</div>
	  </div>
  );

  let onNewExpertClick=()=>{
    console.log(count);
    count=count+1;
    dispatchNewExpert('Expert '+count);
  }


  const onExpertClick=(id)=>{
    //Передаем компонент ExpertRoom для отображения его
    // вместо browseActivity (по умолчанию) по нажатию на эксперта
    getHomeBody(<ExpertRoom id={id}/>);
  }


  return (
    <div>
      {Header}
      <div className="Home">
        <div className="Home-content">
        {store.homeBodyHandler[0]?store.homeBodyHandler[0]:browseActivity}
          <div className="Home-content-experts">
            <div className="content-experts-header">
              <div className="experts-header-title">
                <h3>Your experts</h3>
                <button className="addExpertBtn" onClick={onNewExpertClick}>NEW EXPERT</button>
              </div>
              <div className="experts-header-find">
                <input type="text" name="findExpert" placeholder="Find an expert" />
              </div>

            </div>
            <div className="content-experts">
              <ul className="content-experts-list">
                {store.expertsReducer.map((expert,index)=>
                  <li key={index} id={expert} onClick={(li)=>{onExpertClick(li.target.id)}} className="content-experts-listItems">{expert}</li>
                )}
              </ul>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

const Header = (
  <header className="header" >
    <div className="header-left">
      <NavLink to="/" activeClassName="Start-header-logo-active" className="header-logo">
        <div className="header-logo-img"></div>
        <p className="header-logo-title">GIMET</p>
      </NavLink>
      <NavLink to="/home" className="header-userName" onClick={()=>this.onSignIn()}>
        <h2>Manachynskyi Oleksii</h2>
      </NavLink>


    </div>
    <div className="header-right">
      <NavLink to="/home" className="signOutBtn" >Sign out</NavLink>
    </div>

  </header>
);

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
)(Home));
