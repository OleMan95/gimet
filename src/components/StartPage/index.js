import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Header from '../sections/Header/';
import './index.scss';

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
				<div className="section-1 row">
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
										<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputPassword1">Password</label>
										<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
										<small id="emailHelp" className="form-text text-muted">Use at least one letter, one numeral, and seven characters.</small>
									</div>
									<button type="submit" className="btn btn-primary" onClick={()=>this.signUpClick(this)}>Submit</button>
								</form>
							</div>
						</div>

					</div>
				</div>

				<div className='section-2 bg-light py-5' id="about_block">
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
										<h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
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

        <div className='Start-contact' id="contact_block">
          <div>
            <h2>Contact Us:</h2>
            <form id="form">
              <div className="contact-inputsDiv">
                <div className="contact-inputs">
                  <label htmlFor="contact-name">Name: </label>
                  <input type="text" id="contact-name" placeholder="Enter your name"/>
                </div>
                <div className="contact-inputs">
                  <label htmlFor="contact-email">Email: </label>
                  <input type="email" id="contact-email" placeholder="enter@your.email"/>
                </div>
              </div>

              <div className="contact-inputs">
                <label htmlFor="contact-subject">Subject: </label>
                <input type="text" id="contact-subject" placeholder="Subject..."/>
              </div>

              <div className="contact-inputs">
                <label htmlFor="msgInp" >Message: </label>
                <textarea id="msgInp" placeholder="Message..."/>
              </div>

            </form>
            <button type="button">Send</button>
          </div>
        </div>
      </div>
    );
  }

}


export default withRouter(StartPage);
