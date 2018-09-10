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

class ProfileExperts extends React.Component{
  constructor(){
    super();
    this.state={
    };
  };

  render(){

    return (
      <div className="ProfileExperts">
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

				<div className="container">
					<ul className="list-group list-group-flush">
						{this.props.experts.map(expert =>
							<li key={expert._id} className='list-group-item d-flex'>
								<div className="d-flex align-items-center">
									<p className='title'><b>{expert.name}</b></p>
									<div className="ml-auto">
										<MenuMore key={expert._id} expert={expert}
															fireSuccessAlarm={this.fireSuccessAlarm}
															fireErrorAlarm={this.fireErrorAlarm} />
									</div>
								</div>
								<p className='date'>{expert.updatedAt} <span className="mx-2">|</span>
									<i className="ion-eye mr-1"/>{expert.consultationCount || 0} <span className="mx-2">|</span>
									<i className={expert.published ? "ion-android-cloud-done published-icon" : "ion-android-cloud published-icon"}
										 title={expert.published ? "Published" : "Unpublished"}/>
								</p>
								<p className='description'>{expert.description}</p>
								<div className='d-flex'>
									<NavLink className='consultation-btn btn btn-dark' to={'/consultation/'+expert._id}>Consultation</NavLink>
									<NavLink className='btn btn-light' to={'/edit/'+expert._id}>Edit</NavLink>
									<button className='btn btn-outline-danger' onClick={()=>this.showAlertModal(expert)}>Delete</button>
								</div>
							</li>
						)}
					</ul>
				</div>

				<Footer/>
			</div>
    )};
}




export default withRouter(ProfileExperts);
