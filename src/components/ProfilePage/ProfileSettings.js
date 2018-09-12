import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';

import Breadcrumb from '../sections/Breadcrumb/';

import './index.scss';
import connect from "react-redux/es/connect/connect";

class ProfileSettings extends React.Component{
  constructor(){
    super();
    this.state={
      user: {}
    };
  };

  handleChange = (e) => {
    let user = this.props.store.account;

    switch(e.target.name){
      case 'username':
        user.name = e.target.value;
        this.setState({user});
        break;
      case 'email':
        user.email = e.target.value;
        this.setState({user});
        break;
      case 'password':
        user.password = e.target.value;
        this.setState({user});
        break;
      case 'password-repeat':
        user.passwordRepeat = e.target.value;
        this.setState({user});
        break;
    }
  };

  render(){

    return (
      <div className="ProfileSettings">
				<Breadcrumb view={'Profile'}/>

        <div className="container d-flex flex-column">

          {this.props.user.profilePhoto ?
            <img src={this.props.user.profilePhoto} alt={this.props.store.account.name}
                 className='default-profile-photo d-flex'/>
            :
            <div className='default-profile-photo d-flex align-self-center m-3'>
              <i className='ion-person'></i>
            </div>
          }

          <form className="card form-horizontal form-material mb-5 py-4">
            <div className="form-group">
              <label className="col-md-12">Full Name</label>
              <div className="col-md-12">
                <input type="text" name="username" value={this.props.store.account.name} disabled={true}
                       className="form-control form-control-line"
                       onChange={event=>this.handleChange(event)}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="example-email" className="col-md-12">Email</label>
              <div className="col-md-12">
                <input type="email" name="email" value={this.props.store.account.email}
                       className="form-control form-control-line"
                       onChange={event=>this.handleChange(event)}/></div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Password</label>
              <div className="col-md-12">
                <input type="password" name="password" className="form-control form-control-line"
                       onChange={event=>this.handleChange(event)}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Password repeat</label>
              <div className="col-md-12">
                <input type="password" name="password-repeat" className="form-control form-control-line"
                       onChange={event=>this.handleChange(event)}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Facebook</label>
              <div className="col-md-12">
                <input type="text" value={this.props.store.account.facebookLink} className="form-control form-control-line"
                       onChange={event=>this.handleChange(event)}/></div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Instagram</label>
              <div className="col-md-12">
                <input type="text" value={this.props.store.account.instagramLink} className="form-control form-control-line"
                       onChange={event=>this.handleChange(event)}/></div>
            </div>
            <div className="form-group">
              <label className="col-md-12">GitHub</label>
              <div className="col-md-12">
                <input type="text" value={this.props.store.account.githubLink} className="form-control form-control-line"
                       onChange={event=>this.handleChange(event)}/></div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Linkedin</label>
              <div className="col-md-12">
                <input type="text" value={this.props.store.account.linkedinLink} className="form-control form-control-line"
                       onChange={event=>this.handleChange(event)}/></div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <button className="btn btn-success">Update Profile</button>
              </div>
            </div>
          </form>

				</div>
			</div>
    )};
}

export default withRouter(
  connect(state => ({
      store: state
    }),
    dispatch => ({
      addTodo: name => {
        dispatch({type: 'ADD_TODO', payload: name})
      }
    }))(ProfileSettings));
