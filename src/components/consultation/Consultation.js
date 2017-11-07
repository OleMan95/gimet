import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';

import '../../css/App.css';
import '../../css/ConfigNewExpert.css';

import '../../css/ConfigConsultation.css';


const Consultation = ({store, name}) => { 



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
                    <NavLink to="/home" className="signOutBtn" >Back to Home</NavLink>
                </div>
            </header>     
           

            <div className="consultation_question_frame">
                <div id="consultation_question_number">
                    <h3>Question #{name}</h3>
                </div>
                {/* <hr/> */}
                <div id="consultation_question_text">
                    <h3>Question description #{name}</h3>
                </div>
                
                
  		    </div>




            <h1>{name}</h1>

           



            
        </div>
    )

            
}

export default withRouter(connect(
    state=>({
      store: state,
    }),
    dispatch=>({
  
    })
  )(Consultation));