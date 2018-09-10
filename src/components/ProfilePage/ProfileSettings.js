import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';
import {deleteExpert, getUserById} from '../services/api-helper';
import {getToken} from '../services/tokenService';

import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
import ProfileSidebar from '../sections/ProfileSidebar/';
import AlertHelper from '../sections/AlertHelper/';
import AlertModal from '../sections/AlertModal/';
import MenuMore from './MenuMore';

import './index.scss';

class ProfileSettings extends React.Component{
  constructor(){
    super();
    this.state={
    };
  };

  render(){

    return (
      <div className="ProfileSettings">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container d-flex">
            <div className='title d-flex'>
              <h1>{this.props.user.name}</h1>
              <div className="d-flex align-items-center">
                <a href="https://www.facebook.com/iamoleman" className="btn btn-link">
                  <i className="ion ion-social-facebook"></i></a>
                <a href="https://www.instagram.com/lmanachinskiy/" className="btn btn-link">
                  <i className="ion ion-social-instagram"></i></a>
                <a href="https://github.com/OleMan95" className="btn btn-link">
                  <i className="ion ion-social-github"></i></a>
                <a href="https://www.linkedin.com/in/oleksii-manachynskyi-078b17137/" className="btn btn-link">
                  <i className="ion ion-social-linkedin"></i></a>
              </div>
            </div>
            {/*<div className='btn-group d-flex ml-auto'>*/}
              {/*<NavLink className={this.state.isPublic ? 'btn btn-outline-light d-none' : 'btn btn-outline-light'} to={'/edit/new'}>*/}
                {/*<i className="ion-plus-round"></i></NavLink>*/}
              {/*<NavLink className={this.state.isPublic ? 'btn btn-outline-light d-none' : 'btn btn-outline-light'} to={'/account'}>*/}
                {/*<i className="ion-gear-a"></i></NavLink>*/}
            {/*</div>*/}
          </div>
        </nav>

        <div className="container d-flex flex-column">

          {this.props.user.profilePhoto ?
            <img src={this.props.user.profilePhoto} alt={this.props.user.name}
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
                <input type="text" value={this.props.user.name} disabled={true} className="form-control form-control-line"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="example-email" className="col-md-12">Email</label>
              <div className="col-md-12">
                <input type="email" value={this.props.user.email} className="form-control form-control-line"
                       name="example-email"/></div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Password</label>
              <div className="col-md-12">
                <input type="password" className="form-control form-control-line"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Password repeat</label>
              <div className="col-md-12">
                <input type="password" className="form-control form-control-line"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Facebook Link</label>
              <div className="col-md-12">
                <input type="text" value="https://www.facebook.com/iamoleman" className="form-control form-control-line"/></div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Instagram Link</label>
              <div className="col-md-12">
                <input type="text" value="https://www.instagram.com/lmanachinskiy/" className="form-control form-control-line"/></div>
            </div>
            <div className="form-group">
              <label className="col-md-12">GitHub Link</label>
              <div className="col-md-12">
                <input type="text" value="https://github.com/OleMan95" className="form-control form-control-line"/></div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Linkedin No</label>
              <div className="col-md-12">
                <input type="text" value="https://www.linkedin.com/in/oleksii-manachynskyi-078b17137/" className="form-control form-control-line"/></div>
            </div>
            <div className="form-group">
              <label className="col-md-12">Message</label>
              <div className="col-md-12">
                <textarea rows="5" className="form-control form-control-line"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <button className="btn btn-success">Update Profile</button>
              </div>
            </div>
          </form>

				</div>

				<Footer/>
			</div>
    )};
}




export default withRouter(ProfileSettings);
