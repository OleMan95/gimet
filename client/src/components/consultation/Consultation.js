import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import ConsultationInit from './ConsultationInit';


class Consultation extends React.Component{

    state = {
        content: (<ConsultationInit/>), // присваиваем перемненной content обьект ConsultationInit
    };


    componentDidMount(){ // .....
        window.onpopstate = this.onBackButtonEvent;
    };

    onBackButtonEvent=() => { // тут происходит загрузка обьекта ConsultationInit
        this.props.setContent(<ConsultationInit/>);
    };


    render(){
        return (
            <div>
                <header className="header" >
                    <div className="header-left">
                    <NavLink to="/home" activeClassName="Start-header-logo-active" className="header-logo">
                        <div className="header-logo-img"/>
                        <p className="header-logo-title">GIMET</p>
                    </NavLink>
                    <NavLink to="/home" className="header-userName">
                        <h2>{this.props.store.accountReducer.name}</h2>
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
    state=>({ // изменение данных в переменных
      expert: state.ConsultationReducer.expert,
      content: state.ConsultationReducer.content,
      store:state
    }),
    dispatch=>({ // сохранение контента в Redux
        setContent: (content)=>{
            dispatch({type:'SET_CONSULTATION_CONTENT',payload: content});
        }
    })
  )(Consultation));
