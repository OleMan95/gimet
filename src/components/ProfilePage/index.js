import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';
import {deleteExpert, getUserById} from '../services/api-helper';
import { connect } from 'react-redux'

import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
import DashboardSidebar from '../sections/DashboardSidebar/';
import ProfileSettings from './ProfileSettings';
import AlertHelper from '../sections/AlertHelper/';
import AlertModal from '../sections/AlertModal/';

import './index.scss';
import expertEdit from "../../reducers/expert-edit";

class Profile extends React.Component{
  constructor(){
    super();
    this.state={
      user: {},
			isPublic: true,
			isLoading: true,
      dashboardOptions: {
      	isProfile: true,
				editedExperts: []
			},
    };
  };

  async componentDidMount() {
    this.setState({
      dashboardOptions: {
        isProfile: true,
        editedExperts: this.props.store.expertEdit
      },
    });

    this.setUser(this.props.store.account, this.props.store.account.isAuthorized);
  };

  setUser=(user, isPublic)=>{
		this.setState({
			user,
			isPublic,
			isLoading: false
		});
	};

  render(){

    return (
      <div className="Profile">
				<Header />
        <DashboardSidebar user={this.props.store.account} dashboardOptions={this.state.dashboardOptions}/>

				<div className="container">
					<ProfileSettings user={this.props.store.account}/>
				</div>

				<Footer/>

				<div className={this.state.isLoading ? "Loader show" : "Loader"}>
					<span/>
					<h1>Loading...</h1>
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
	}))(Profile));
