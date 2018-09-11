import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';
import {deleteExpert, getUserById} from '../services/api-helper';
import {getToken} from '../services/tokenService';
import { connect } from 'react-redux'

import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
import ProfileSidebar from '../sections/ProfileSidebar/';
import ProfileSettings from './ProfileSettings';
import ProfileExperts from './ProfileExperts';
import AlertHelper from '../sections/AlertHelper/';
import AlertModal from '../sections/AlertModal/';
import MenuMore from './MenuMore';

import './index.scss';

class Profile extends React.Component{
  constructor(){
    super();
    this.state={
      user: {},
      experts:[],
			isPublic: true,
			isLoading: true,
			activeView: 'my_experts',
      alertModal: {
      	show: false,
				name: ''
			},
			alert: {
      	show: false,
				isDanger: true,
				message: ''
			}
    };
  };

  async componentDidMount() {
    this.setUser(this.props.store.account, this.props.store.account.isAuthorized);
  };

  setUser=(user, isPublic)=>{
		this.setState({
			user,
			experts: this.changeDateFormat({experts: user.experts}),
			isPublic,
			isLoading: false
		});
	};
	fireSuccessAlarm = (data)=>{
		this.showAlarm({
			show: true,
			isDanger: false,
			message: 'Expert has updated successfully'
		});
		this.setState({
			experts: this.changeDateFormat({expert: data})
		});
	};
	fireErrorAlarm = (err)=>{
		this.showAlarm({
			show: true,
			isDanger: true,
			message: err.error.message
		});
	};
	showAlarm = (alert)=>{
		this.setState({alert});

		setTimeout(()=>{
			this.setState({
				alert:{
					show: false,
					isDanger: true,
					message: ''
				}
			});
		}, 4000);
	};

	toggleView = (view, edit)=>{

		switch(view){
			case 'profile':
				this.props.history.push(this.props.location.pathname+'#profile');
				break;
			case 'my_experts':
				this.props.history.push(this.props.location.pathname+'#my_experts');
				break;
			case 'expert_edit':
				if(edit && edit.id)
					this.props.history.push(/edit/+edit.id+'#expert_edit');
				break;
		}

    this.setState({
      activeView: view
    });
    console.log(this.props.location);
  };

  onDeleteExpertClick = async (id) => {
		await deleteExpert(id, res=>{
			this.setState({
				experts: this.changeDateFormat({experts: res.data.experts})
			});

			this.showAlarm({
				show: true,
				isDanger: false,
				message: res.data.message
			});
		}, err=>{
			this.showAlarm({
				show: true,
				isDanger: true,
				message: err.error.message
			});
		});
  };

  showAlertModal = (expert)=>{
  	this.setState({
      alertModal: {
      	show: true,
				options: expert,
			}
		});
	};
  onAlertResult = async (expert) => {
  	if(expert)
    	await this.onDeleteExpertClick(expert._id);

		this.setState({
			alertModal: {
				show: false,
				options: {}
			}
		});
  };

  changeDateFormat = ({expert, experts})=>{
		let newExperts = this.state.experts;

		if(expert){
			newExperts.map(item=>{
				if(item._id === expert._id){
					item.updatedAt = moment(expert.updatedAt).fromNow();
				}
			});
		}else{
			experts.forEach(item=>{
				item.updatedAt = moment(item.updatedAt).fromNow();
			});

			newExperts = experts;
		}
		return newExperts;
	};

  render(){

    return (
      <div className="Profile">
				<Header />

        <ProfileSidebar toggleView={this.toggleView} activeView={this.state.activeView}/>

				<div className="container">
					{this.state.activeView === 'profile' ?
						<ProfileSettings user={this.state.user}/>
						: ''}

					{this.state.activeView === 'my_experts' ?
						<ProfileExperts experts={this.state.experts}
														showAlertModal={this.showAlertModal}
														fireSuccessAlarm={this.fireSuccessAlarm}
														fireErrorAlarm={this.fireErrorAlarm}/>
						: ''}

				</div>

				<Footer/>

				<AlertHelper show={this.state.alert.show} isDanger={this.state.alert.isDanger}
										 message={this.state.alert.message}/>

				{this.state.alertModal.show ? <AlertModal title={'title'}
											text={`Are you sure you want to remove an expert "${this.state.alertModal.options.name}"?`}
                      options={this.state.alertModal.options}
                      onResult={this.onAlertResult}/> : ''}

					<div className={this.state.isLoading ? "Loader show" : "Loader"}>
						<span/>
						<h1>Loading...</h1>
					</div>

			</div>
    )};
}

const mapStateToProps = (state) => {
	return {
    todos: state.todos
  }
};

const mapDispatchToProps = dispatch => {
	return {
  	toggleTodo: id => dispatch(toggleTodo(id))
	}
};

export default withRouter(
	connect(state => ({
		store: state
	}),
	dispatch => ({
		addTodo: name => {
			dispatch({type: 'ADD_TODO', payload: name})
		}
	}))(Profile));
