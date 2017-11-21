import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter,Prompt } from 'react-router-dom';

import '../../css/App.css';
import '../../css/ConfigConsultation.css';
import ConsultationInit from './ConsultationInit';

class Consultation extends React.Component{

    state = {
        content: (<ConsultationInit/>),
    }


    componentDidMount(){
        window.onpopstate = this.onBackButtonEvent;
    }

    onBackButtonEvent=() => {
        this.props.setContent(<ConsultationInit/>);
    }


    render(){
        return (
            <div>
                <header className="header" >
                    <div className="header-left">
                    <NavLink to="/home" activeClassName="Start-header-logo-active" className="header-logo">
                        <div className="header-logo-img"></div>
                        <p className="header-logo-title">GIMET</p>
                    </NavLink>
                    <NavLink to="/home" className="header-userName">
                        <h2>{this.props.store.accountReducer[0].username}</h2>
                    </NavLink>
                    </div>
                    <div className="header-right">
                        <NavLink to="/home" className="signOutBtn" >Back to Home</NavLink>
                    </div>
                </header>
                
                <div className="consultation-content">
                    {this.props.content ? this.props.content : this.state.content}
                </div>

            </div>
        )

    }
}


export default withRouter(connect(
    state=>({
      expert: state.ConsultationReducer.expert,
      content: state.ConsultationReducer.content,
      store:state
    }),
    dispatch=>({
        setContent: (content)=>{
            dispatch({type:'SET_CONSULTATON_CONTENT',payload: content});
        }
    })
  )(Consultation));
