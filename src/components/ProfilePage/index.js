import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';
import {deleteExpert, getUserById} from '../services/api-helper';
import {getToken} from '../services/tokenService';

import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
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

		await getUserById({id: this.props.match.params.id, populate: true, token: getToken()}, res=>{
			this.setUser(res.data, !res.isAuthorized);
		}, async err=>{});

  };

  setUser=(user, isPublic)=>{
		this.setState({
			user,
			experts: this.changeDateFormat({experts: user.experts}),
			isPublic
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
        <div className="section-1 d-flex">
          <div className="container d-flex">
						{this.state.user.profilePhoto ?
							<img src={this.state.user.profilePhoto} alt={this.state.user.name}/>
							:
							<div className='default-profile-photo d-flex'>
								<i className='ion-person'></i>
							</div>
						}
						<div className='title d-flex'>
							<h1>{this.state.user.name}</h1>
							<div className="row">
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

						<div className='btn-group d-flex'>
							<NavLink className={this.state.isPublic ? 'btn btn-outline-light d-none' : 'btn btn-outline-light'} to={'/edit/new'}>
								<i className="ion-plus-round"></i></NavLink>
							<NavLink className={this.state.isPublic ? 'btn btn-outline-light d-none' : 'btn btn-outline-light'} to={'/account'}>
								<i className="ion-gear-a"></i></NavLink>
						</div>


					</div>
        </div>
        <div className="section-2">
          <div className="container py-5">
            <ul className="list-group list-group-flush">
							{this.state.experts.map(expert =>
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
										{this.state.isPublic ? '' : <NavLink className='btn btn-light' to={'/edit/'+expert._id}>Edit</NavLink>}
										{this.state.isPublic ? '' :
											<button className='btn btn-outline-danger' onClick={()=>this.showAlertModal(expert)}>Delete</button>}
									</div>
                </li>
              )}
            </ul>
          </div>
        </div>
				<AlertHelper show={this.state.alert.show} isDanger={this.state.alert.isDanger}
										 message={this.state.alert.message}/>

				{this.state.alertModal.show ?
          <AlertModal title={'title'} text={`Are you sure you want to remove an expert "${this.state.alertModal.options.name}"?`}
                      options={this.state.alertModal.options}
                      onResult={this.onAlertResult}/>
					: ''
				}

				<Footer/>
			</div>
    )};
}




export default withRouter(Profile);
