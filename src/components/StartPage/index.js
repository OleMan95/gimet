import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Header from '../sections/Header/';
import Section3 from './BestExperts.js';
import {sendMail} from '../services/api-helper';
import technologies from '../../data/images/icons/artificial-intelligence(2).svg';
import createExpert from '../../data/images/icons/flask.svg';
import whatIsES from '../../data/images/icons/technology(4).svg';
import AlertHelper from '../sections/AlertHelper';
import Footer from "../sections/Footer";
import './index.scss';

class StartPage extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
			modalShow: '',
			mailModalShow: '',
			mailInputData: {},
			alert:{
				show: false,
				isDanger: true,
				message: ''
			},
      sectionTwo: [
        {
          icon: whatIsES,
          title: 'What is expert system?',
          description:
            <p className="card-text text-justify">
              In Gimet you can create a computer system that emulates the decision-making ability of a human expert.
              Such systems can help anyone to solve any troubles or to give some kind of advice.
              Pass a consultation of the one such experts <a href="/consultation/5ab823902271ee20b444b1bb">here</a>.
            </p>
        },
        {
          icon: createExpert,
          title: 'Create your own expert?',
          description:
            <p className="card-text text-justify">
              Are you good in a certain area? To create an expert, you do not need special skills.
              Learn how to create <a href="/help">here</a>.
              To find out where you can use them, read on.
            </p>
        },
        {
          icon: technologies,
          title: 'What technologies we use?',
          description:
            <p className="card-text text-justify">
              Are you interested in the technical details of our platform?
              You can use our experts base and our advantages in your own app.
              If you want to learn more about the knowledge model, Gimet API, etc. - read on.
            </p>
        }
      ]
	  };
	}

	handleClose = ()=>{
		this.setState({ modalShow: '' });
	};
	handleShow = ()=>{
		this.setState({ modalShow: 'show' });
	};

	handleMailClose = ()=>{
		this.setState({ mailModalShow: '' });
	};
	handleMailShow = ()=>{
		this.setState({ mailModalShow: 'show' });
	};
	handleMailInputChange = (event)=>{

		let mailInputData = this.state.mailInputData;

		switch (event.target.name) {
			case 'first-name':
				mailInputData.firstName = event.target.value;
				break;
			case 'last-name':
				mailInputData.lastName = event.target.value;
				break;
			case 'email':
				mailInputData.email = event.target.value;
				break;
			case 'message':
				mailInputData.message = event.target.value;
				break;
			default:
		}

		this.setState({
			mailInputData
		});
	};
	handleSubmit = async (event) => {
		event.preventDefault();

		await sendMail({
			email: this.state.mailInputData.email,
			subject: 'GIMET Feedback - '+this.state.mailInputData.firstName+' '+this.state.mailInputData.lastName,
			message: this.state.mailInputData.message
		}).then(res=>{

			this.setState({
				mailInputData: {},
				mailModalShow: ''
			});

			this.firstNameInput.value = '';
			this.lastNameInput.value = '';
			this.emailInput.value = '';
			this.messageInput.value = '';

			if(res.status === 200){
				this.setState({
					alert:{
						show: true,
						isDanger: false,
						message: 'Message has sent successfully.'
					}
				});

				setTimeout(()=>{
					this.setState({
						alert:{
							show: false,
							isDanger: true,
							message: ''
						}
					});
				}, 4000);
			}

			if(res.status === 500){
				this.setState({
					alert:{
						show: true,
						message: 'Unfortunately, some error has occurred.'
					}
				});

				setTimeout(()=>{
					this.setState({
						alert:{
							show: false,
							message: ''
						}
					});
				}, 4000);
			}

		}).catch(err=>{
			console.log(err);
		});

	};

  render(){
    return (
      <div className="StartPage">
        <Header />
				<div className="section-1 d-flex">

          <div className="container d-flex">
            <div className="logo col d-flex">
              <span className=""/>
              <h3 className="text-white">Expert systems for everybody.</h3>
            </div>
            <div className="col d-flex flex-column justify-content-between align-items-center">
              <div className="banner-text w-100 d-flex">
                <a href='/experts' type="button" className="btn w-100 mb-3 btn-primary btn-lg">Search for virtual expert</a>
                <a href='/signup' type="button" className="btn w-100 btn-primary btn-lg">Create my own expert system</a>
              </div>
            </div>
          </div>

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

				<div className='section-2 bg-light' id="section-2">
					<div className='container d-flex'>
						<h2 className="display-4">What is GIMET?</h2>

						<div className='row'>
              {this.state.sectionTwo.map(elem=>
                <div className="card" >
                  <div className="card-img-top d-flex">
										<div className="rounded-circle">
                      <img className="" src={elem.icon} alt="" width="78" height="78"/>
										</div>
                  </div>
									<div className="card-body">
										<h5 className="card-title text-center mb-2">{elem.title}</h5>
										<i className="ion-chevron-down align-self-center"/>
										{elem.description}
                    <NavLink className="btn btn-secondary align-self-end" to="/about" role="button">
                      <i className="ion-arrow-right-a"/>
										</NavLink>
									</div>
                </div>
              )}
						</div>
            <NavLink className="btn btn-link mt-4" to="/about" role="button">Read more about GIMET</NavLink>
					</div>
				</div>

				<Section3/>

        <div className='section-4 px-3' id="section-4">
					<div className='container'>
						<div className='blured d-flex flex-column'>

							<h2 className="display-6 mb-4 text-center">Contact us:</h2>

							<div className="input-group mb-3">
								<input type="text" className="form-control" placeholder="First name*"
											 aria-label="Username" aria-describedby="basic-addon1" name="first-name"
											 ref={elem=>this.firstNameInput = elem}
											 onChange={event=>this.handleMailInputChange(event)}/>
								<input type="text" className="form-control" placeholder="Last name*"
											 aria-label="Username" aria-describedby="basic-addon1" name="last-name"
											 ref={elem=>this.lastNameInput = elem}
											 onChange={event=>this.handleMailInputChange(event)}/>
								<input type="email" className="form-control" placeholder="Email*"
											 aria-label="Username" aria-describedby="basic-addon1" name="email"
											 ref={elem=>this.emailInput = elem}
											 onChange={event=>this.handleMailInputChange(event)}/>
								<div className="input-group-append" id="button-addon4">
									<button className="btn btn-outline-light" type="button"
													onClick={this.handleMailShow}>SEND <i className="ion-email"/></button>
								</div>
							</div>

							<div className={"modal fade "+this.state.mailModalShow} id="mailModal" tabIndex="-1" role="dialog"
									 aria-labelledby="mailModalTitle" aria-hidden="true" onClick={this.handleMailClose}>
								<div className="modal-dialog modal-dialog-centered" role="document" onClick={(event)=>event.stopPropagation()}>
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="mailModalTitle">Contact us:</h5>
											<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleMailClose}>
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">

											<p>{this.state.mailInputData.firstName} {this.state.mailInputData.lastName}</p>
											<p>{this.state.mailInputData.email}</p>

											<form className='contact-form' onSubmit={event=>this.handleSubmit(event)}>
												<div className="form-group">
													<label htmlFor="textarea">Message</label>
													<textarea className="form-control" id="textarea" rows="4" name="message"
																		ref={elem=>this.messageInput = elem}
																		onChange={event=>this.handleMailInputChange(event)}/>
												</div>
												<div className="d-flex justify-content-end">
													<button type="submit" className="btn btn-primary">Submit</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>

				<AlertHelper show={this.state.alert.show} isDanger={this.state.alert.isDanger}
										 message={this.state.alert.message}/>
				<Footer/>
			</div>
    );
  }
}


export default withRouter(StartPage);
