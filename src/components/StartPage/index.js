import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Header from '../sections/Header/';
import './index.scss';
import teamMember1 from '../../data/images/team/manachynskyi.jpg';
import teamMember2 from '../../data/images/team/suprun.jpg';

class StartPage extends React.Component { //все this.props мы получем как аргументы функции
	constructor(props) {
	  super(props);
	  this.state = {
			modalShow: '',
	  };
	}

	handleClose=()=>{
		this.setState({ modalShow: '' });
	};

	handleShow=()=>{
		this.setState({ modalShow: 'show' });
	};
  // handleInputChange=(event)=>{ // занесение данных с формы в локальные переменные
  //     switch (event.target.name) {
  //         case 'username':
  //             this.setState({
  //                 usernameValue:event.target.value,
  //             });
  //             break;
  //         case 'email':
  //             this.setState({
  //               emailValue:event.target.value,
  //             });
  //             break;
  //         case 'password':
  //             this.setState({
  //               passwordValue:event.target.value,
  //             });
  //             break;
  //         default:
  //     }
  // };
  // signUpClick=(context)=>{
  //   fetch('/v1/auth/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ // занесение данных в JSON
  //       name: this.state.usernameValue,
  //       email: this.state.emailValue,
  //       password: this.state.passwordValue,
  //     })
  //   }).then((response) => {
  //     response.json().then(function(data) {
  //         if(data.data){
  //           alert('User has registered.');
  //         }
  //     });
  //     return response;
  //   }).catch(function(error) {
  //     console.log('There was a problem with fetch operation: ' + error.message);
  //   });
  // };

  render(){
    return (
      <div className="StartPage">
        <Header />
				<div className="section-1 d-flex">
					<div className="col d-flex">
						<span className="logo"/>
						<h3 className="text-white">Expert systems for everybody.</h3>
					</div>

					<div className="col signup d-flex">

						<div className="card text-white bg-dark">
							<div className="card-body">
								<form className="col d-flex">
									<div className="form-group">
										<label htmlFor="exampleInputEmail1">Name</label>
										<input type="name" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter your full name"/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputEmail1">Email address</label>
										<input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputPassword1">Password</label>
										<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
										<small id="emailHelp" className="form-text text-muted">Use at least one letter, one numeral, and seven characters.</small>
									</div>
									<button type="submit" className="btn btn-primary" onClick={()=>this.signUpClick(this)}>Sign up</button>
								</form>
							</div>
						</div>

					</div>
				</div>

				<div className='section-2 bg-light py-5 px-3' id="section-2">
					<div className='container pt-5 d-flex'>
						<h2 className="display-4 mb-4">What is GIMET?</h2>

						<p>GIMET is a platform for creating expert systems.
							The expert system is an intelligent computer program
							that contains the knowledge and analytical capabilities
							of one or more experts in a particular field of application,
							and is able to draw logical conclusions based on this knowledge,
							thus providing specific tasks (counseling, training, diagnosis,
							testing, designing etc.) without the participation of an expert
							(specialist in a specific problem area). It is also defined
							as a system that uses a knowledge base for solving problems
							(issuing recommendations) in a particular subject area.</p>
						<p>You can use GIMET platform to develop your own expert systems and further exploit it.</p>

						<button type="button" className="btn openModal btn-link" data-toggle="modal"
										data-target="#exampleModalCenter" onClick={this.handleShow}>
							v-1.0.1a
						</button>

						<div className={"modal fade "+this.state.modalShow} id="exampleModalCenter" tabIndex="-1" role="dialog"
								 aria-labelledby="exampleModalCenterTitle" aria-hidden="true" onClick={this.handleClose}>
							<div className="modal-dialog modal-dialog-centered" role="document" onClick={(event)=>event.stopPropagation()}>
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLongTitle">Changelog v-1.0.1a:</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<ul className="list-group list-group-flush">
											<li className="list-group-item">New design of the site</li>
											<li className="list-group-item">The main algorithms were optimized (creation of experts and logical output)</li>
											<li className="list-group-item">The work of the site was optimized</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div className='section-3 bg-light py-5 px-3' id="section-3">
					<div className='container py-5'>
						<h2 className="mb-4">Our team</h2>
						<div className="row cards-block">

							<div className="d-flex" >
								<img className="team-img" src={teamMember1} alt="team-member1"/>
								<div className="col-6 team-body d-flex">
									<div>
										<h5 className="">Oleksii Manachynskyi</h5>
										<p className="">Software developer, solution architect</p>
									</div>
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
							</div>
							<div className="d-flex">
								<img className="team-img" src={teamMember2} alt="team-member2"/>
								<div className="col-6 team-body d-flex">
									<div>
										<h5 className="">Roman Suprun</h5>
										<p className="">Software developer</p>
									</div>
									<div className="row">
										<a href="#" className="btn btn-link">
											<i className="ion ion-social-facebook"></i></a>
										<a href="#" className="btn btn-link">
											<i className="ion ion-social-instagram"></i></a>
										<a href="#" className="btn btn-link">
											<i className="ion ion-social-github"></i></a>
										<a href="#" className="btn btn-link">
											<i className="ion ion-social-linkedin"></i></a>
									</div>
								</div>
							</div>

						</div>

					</div>
				</div>

        <div className='section-4 py-5 px-3' id="section-4">
					<div className='container py-5'>

						<div className='row'>
							<div className='col d-flex'>
								<h2 className="display-6 mb-4">Contact us:</h2>
								<form className='contact-form'>
									<div className="form-row">
										<div className="col-md-6">
											<label htmlFor="inputFName">First name</label>
											<input type="text" className="form-control" id="inputFName" placeholder="First name"/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputLName">Last name</label>
											<input type="text" className="form-control" id="inputLName" placeholder="Last name"/>
										</div>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputEmail1">Email address</label>
										<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleFormControlTextarea1">Message</label>
										<textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
									</div>
									<div className="d-flex justify-content-end">
										<button type="submit" className="btn btn-primary">Submit</button>
									</div>
								</form>
							</div>
							<div className='col d-flex'>
							</div>
						</div>
					</div>

				</div>

			</div>
    );
  }

}


export default withRouter(StartPage);
