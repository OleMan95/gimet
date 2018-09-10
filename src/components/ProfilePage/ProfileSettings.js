import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';

import Breadcrumb from '../sections/Breadcrumb/';

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
				<Breadcrumb view={'Profile'}/>

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
			</div>
    )};
}




export default withRouter(ProfileSettings);
