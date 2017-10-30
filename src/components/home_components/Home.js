import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import '../../css/App.css';
import '../../css/ConfigNewExpert.css';
import ExpertRoom from './ExpertRoom';


const Home=({store, getHomeBody, newExpert})=>{
  let experts = store.accountReducer[0].experts;
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
    var expert = {
       name:'',
       description:'',
       questions:[],
    }

    newExpert(expert);
  }


  const onExpertClick=(expert)=>{
    //Передаем компонент ExpertRoom для отображения его
    // вместо browseActivity (по умолчанию) по нажатию на эксперта
    getHomeBody(<ExpertRoom name={expert.name} description={expert.description}/>);
  }


  return (
    <div>
      <header className="header" >
        <div className="header-left">
          <NavLink to="/" activeClassName="Start-header-logo-active" className="header-logo">
            <div className="header-logo-img"></div>
            <p className="header-logo-title">GIMET</p>
          </NavLink>
          <NavLink to="/home" className="header-userName" onClick={()=>this.onSignIn()}>
            <h2>{store.accountReducer[0].username}</h2>
          </NavLink>
        </div>
        <div className="header-right">
          <NavLink to="/home" className="signOutBtn" >Sign out</NavLink>
        </div>
      </header>
      <div className="Home">
        <div className="Home-content">
          {store.homeBodyHandler[0]?store.homeBodyHandler[0]:browseActivity}
          <div className="Home-content-experts">
            <div className="content-experts-header">
              <div className="experts-header-title">
                <h3>Your experts</h3>
                <NavLink to="/config_new_expert" className="addExpertBtn" onClick={onNewExpertClick}>NEW EXPERT</NavLink>
              </div>
              <div className="experts-header-find">
                <input type="search" name="findExpert" placeholder="Find an expert" />
              </div>

            </div>
            <div className="content-experts">
              <ul className="content-experts-list">
                {store.accountReducer[0].experts.map((expert,index)=>
                  <li key={index} id={expert.name} onClick={(li)=>{onExpertClick(expert)}} className="content-experts-listItems">{expert.name}</li>
                )}
              </ul>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}



export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({
    newExpert: (expert)=>{
      dispatch({type:'NEW_EXPERT',payload: expert});
    },
    getHomeBody: (id)=>{
      dispatch({type:'GET_HOME_BODY',payload: id});
    }
  })
)(Home));
