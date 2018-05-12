import React from 'react';
import isodate from 'isodate';
import {NavLink, withRouter} from 'react-router-dom';
import {getToken} from '../services/tokenService';
import {getUserById} from '../services/api-helper';
import Header from '../sections/Header/';

import './index.scss';

class Profile extends React.Component{
  constructor(){
    super();
    this.state={
      user: {},
      experts:[]
    };
  };

  async componentDidMount() {
    if(getToken()){
			console.log(this.props.match.params.id);
			const user = await getUserById(this.props.match.params.id, true);
			const experts = user.experts.filter(expert=>expert._id!=null);

			experts.forEach((expert)=>{
				let date = isodate(expert.updatedAt.toString());
				expert.updatedAt = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      });

			this.setState({user,experts});
    }else{
      this.props.history.push('/');
    }
  };

  // handleFilterChange=(event)=>{ // производится поиск експертов по имени, которое введет пользователь
  //   switch (event.target.name) {
  //     case 'findExpert':
  //       const newExperts = this.state.experts.filter(expert => {
  //           const name = expert.name.toLowerCase();
  //           return name.includes(event.target.value.toLowerCase());
  //       });
  //
  //       this.displayExperts(newExperts);
  //
  //       break;
  //     default:
  //   }
  // };

  // onDeleteExpertClick= async (expert) => { // процес удаления експерта при нажатии кнопки удаления в списке експертов.
  //     const userId = this.state.user._id;
  //     console.log(userId);
  //     const url = '/v1/expert/' + expert._id;
  //     console.log('expert: ', expert._id);
  //
  //     const response = await fetch(url, {
  //         method: 'DELETE',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': getToken()
  //         }
  //     });
  //
  //     if (response.status === 200) {
  //         alert("Expert has deleted");
  //     }else {
  //         console.log('There was a problem with fetch operation: ' + response);
  //         alert("Expert not found");
  //     }
  //
  //     await this.fetchUser();
  // };

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

						<div className='btns-bar d-flex'>
							<NavLink className='btn btn-outline-light' to={'/edit/new'}><i className="ion-plus-round"></i></NavLink>
							<NavLink className='btn btn-outline-light' to={'/account'}><i className="ion-gear-a"></i></NavLink>
						</div>


					</div>
        </div>
        <div className="section-2">
          <div className="container py-5">
            <ul className="list-group list-group-flush">
							{this.state.experts.map(expert =>
                <li key={expert._id} className='list-group-item d-flex'>
                  <p className='title'><b>{expert.name}</b></p>
                  <p className='date'>updated at: {expert.updatedAt}</p>
                  <p className='description'>{expert.description}</p>
									<div className='d-flex'>
										<NavLink className='consultation-btn btn btn-dark' to={'/consultation/'+expert._id}>Consultation</NavLink>
										<NavLink className='btn btn-light' to={'/edit/'+expert._id}>Edit</NavLink>
										<button className='btn btn-outline-danger'>Delete</button>
									</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )};
}




export default withRouter(Profile);
