import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import * as firebase from 'firebase';

import '../../css/App.css';
import '../../css/ConfigNewExpert.css';
import ExpertRoom from './ExpertRoom';


// const Home=({store, getHomeBody, newExpert})=>{
class Home extends React.Component{
  constructor(){
    super();
    this.state={
      browseActivity:(
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
      ),
      expertNames:[]
    };
  }


  onNewExpertClick=()=>{
    var expert = {
       name:'',
       description:'',
       questions:[],
    }

  }

  componentDidMount(){
    const rootRef = firebase.database().ref().child('experts');
    rootRef.on('value', snap=>{
      let expertNames
      if(snap.val()) expertNames = Object.keys(snap.val());

      let expertListElems=[];

      if(!expertNames) {
        expertListElems = (
          <p className="content-experts-emptyList">No experts</p>
        );
      }else{
        for(let i=0; i<expertNames.length; i++){
          expertListElems.push(
            <li key={i} id={expertNames[i]} onClick={(li)=>{this.onExpertClick(expertNames[i])}} 
            className="content-experts-listItems">{expertNames[i]}</li>
          );
        }
      }

      console.log('isExpertContains: ',expertNames);
      this.setState({
        expertNames:expertListElems,
      });
      
      console.log('componentDidMount-firebase: ', expertNames);
    });
  }

  onExpertClick=(name)=>{
    let expert;

    const expertRef = firebase.database().ref().child('experts').child(name);
    expertRef.on('value', snap=>{
      expert = snap.val();

    });

    //Передаем компонент ExpertRoom для отображения его
    // вместо browseActivity (по умолчанию) по нажатию на эксперта
    this.props.getHomeBody(<ExpertRoom expert={expert}/>);
  }

  render(){
    return (
      <div>
        <header className="header" >
          <div className="header-left">
            <NavLink to="/" activeClassName="Start-header-logo-active" className="header-logo">
              <div className="header-logo-img"></div>
              <p className="header-logo-title">GIMET</p>
            </NavLink>
            <NavLink to="/home" className="header-userName">
              <h2>{this.props.store.accountReducer[0].username}</h2>
            </NavLink>
          </div>
          <div className="header-right">
            <NavLink to="/home" className="signOutBtn" >Sign out</NavLink>
          </div>
        </header>
        <div className="Home">
          <div className="Home-content">
            {this.props.store.homeBodyHandler[0]?this.props.store.homeBodyHandler[0]:this.state.browseActivity}
            <div className="Home-content-experts">
              <div className="content-experts-header">
                <div className="experts-header-title">
                  <h3>Your experts</h3>
                  <NavLink to="/config_new_expert" className="addExpertBtn" onClick={this.onNewExpertClick}>NEW EXPERT</NavLink>
                </div>
                <div className="experts-header-find">
                  <input type="search" name="findExpert" placeholder="Find an expert" />
                </div>
  
              </div>
              <div className="content-experts">
                <ul className="content-experts-list">
                  {this.state.expertNames}
                </ul>
              </div>
  
            </div>
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
    getHomeBody: (id)=>{
      dispatch({type:'GET_HOME_BODY',payload: id});
    }
  })
)(Home));
