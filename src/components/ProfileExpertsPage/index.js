import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import {deleteExpert} from '../services/api-helper';
import {connect} from 'react-redux'

import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
import AlertHelper from '../sections/AlertHelper/';
import {editExpert, setExpertToAccount} from '../../actions/index';
import DashboardSidebar from '../sections/DashboardSidebar/';
import ExpertsListView from './ExpertsListView';

import './index.scss';
import {alertHelperTimeoutError, alertHelperTimeoutSuccess} from "../services/aide";

class ProfileExpertsPage extends React.Component{
  constructor(){
    super();
    this.state={
      dashboardOptions: {
        isProfileExperts: true,
        editedExperts: []
      },
			isPublic: true,
			isLoading: true,
			experts: [],
      alertHelperOptions: {
        show: false,
        isDanger: true,
        message: ''
      }
    };
  };

  componentDidMount() {
    this.setState({
      dashboardOptions: {
        isProfileExperts: true,
        editedExperts: this.props.store.expertEdit
      },
			experts: this.changeDateFormat(),
			isLoading: false
    });
  };

  changeDateFormat = ()=>{
    let newExperts = this.props.store.account.experts;

    newExperts.forEach(item=>{
      item.updated = moment(item.updatedAt).fromNow();
    });

    return newExperts;
  };

  fireSuccessAlarm = (res) => {
    setExpertToAccount(res.data);
    alertHelperTimeoutSuccess(this, 'Saved');
  };
  fireErrorAlarm = (res) => {
    alertHelperTimeoutError(this, res.error.message);
  };

  render(){

    return (
      <div className="ProfileExperts">
				<Header />
        <DashboardSidebar user={this.props.store.account} dashboardOptions={this.state.dashboardOptions}/>

				<div className="container">
						<ExpertsListView experts={this.state.experts}
                             fireSuccessAlarm={this.fireSuccessAlarm}
                             fireErrorAlarm={this.fireErrorAlarm}
                             addExpertToEdit={this.props.addExpertToEdit}/>

				</div>

				<Footer/>

        <AlertHelper show={this.state.alertHelperOptions.show}
                     isDanger={this.state.alertHelperOptions.isDanger}
                     message={this.state.alertHelperOptions.message}/>

				<div className={this.state.isLoading ? "Loader show" : "Loader"}>
					<span/>
					<h1>Loading...</h1>
				</div>

			</div>
    )};
}

export default withRouter(
	connect(state => ({
		store: state,
		experts: state.account.experts
	}),
	dispatch => ({
    addExpertToEdit: expert => {
			dispatch(editExpert(expert))
		},
    setExpertToAccount: expert => {
			dispatch(editExpert(expert))
		}
	}))(ProfileExpertsPage));
