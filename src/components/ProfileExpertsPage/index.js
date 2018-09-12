import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import {deleteExpert} from '../services/api-helper';
import {connect} from 'react-redux'

import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
import {editExpert} from '../../actions/index';
import DashboardSidebar from '../sections/DashboardSidebar/';
import ExpertsListView from './ExpertsListView';

import './index.scss';

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
			experts: []
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

  render(){

    return (
      <div className="ProfileExperts">
				<Header />
        <DashboardSidebar user={this.props.store.account} dashboardOptions={this.state.dashboardOptions}/>

				<div className="container">
						<ExpertsListView experts={this.state.experts}
                             addExpertToEdit={this.props.addExpertToEdit}/>

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
		store: state,
		experts: state.account.experts
	}),
	dispatch => ({
    addExpertToEdit: expert => {
			dispatch(editExpert(expert))
		}
	}))(ProfileExpertsPage));
