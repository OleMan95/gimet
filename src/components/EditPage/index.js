import React from 'react';
import {NavLink, withRouter } from 'react-router-dom';
import {getToken} from '../services/tokenService';
import {getExpertById} from '../services/api-helper';
import Header from '../sections/Header/';

import './index.scss';


class Edit extends React.Component{
  constructor(){
    super();
    this.state={
      expert: {},
			questions: []
    };
  };

  async componentDidMount() {

    const expert = await getExpertById(this.props.match.params.id);
    console.log('expert: ', expert);
    if(expert._id){
			this.setState({
				expert,
				questions: expert.questions
			});
		}


  };

	// fetchUser = async () => {
   //    const user = await getUser('experts name', 'true');
   //    if (!user) {
   //      this.props.history.push('/signin');
   //    }
  // };
  //
	// fetchExpert = async () => {
	// 	const token = getToken();
	// 	const response = await fetch(`/v1/expert/${this.props.match.params.id}`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Authorization' : token
	// 		}});
  //
	// 	let data = await response.json();
	// 	console.log('data: ', data);
  //
	// 	if(data._id){
	// 	  this.setState({
	// 			expert: data
   //    });
	// 		this.displayExpert();
   //  }else{
	// 		this.props.history.push('/home');
	// 	}
  //
  // };
  //
	// displayExpert = (filteredQuestions)=>{
	// 	let questions = filteredQuestions ? filteredQuestions : this.state.expert.questions;
	// 	this.setState({
	// 		questionsDOMs:(
	// 			<ul className="edit-list">
	// 				{questions.map((question, index)=>
	// 					<li key={index} className="edit-listItem">
	// 						<h3>Question #{index+1}:</h3>
	// 						<button onClick={()=>{this.editClick(question)}} className="edit-Condition-Btn">Edit</button>
	// 						<hr/>
	// 						<div className="edit-li-content">
	// 							<p><mark><b>key</b></mark>: {question.key}</p>
	// 							<p><mark><b>question</b></mark>: {question.question}</p>
	// 						</div>
	// 					</li>
	// 				)}
	// 			</ul>
	// 		),
	// 	});
  // };
  //
	// handleFilterChange=(event)=>{
  //
	// 	switch (event.target.name) {
	// 		case 'findQuestion':
	// 			let newQuestions = [];
  //
	// 			this.state.expert.questions.forEach((elem, index)=>{
  //
	// 				if(elem.key.toLowerCase().includes(event.target.value.toLowerCase())){
	// 					newQuestions.push(elem);
	// 				}
  //
	// 			});
  //
	// 			this.displayExpert(newQuestions);
  //
	// 			break;
	// 		default:
	// 	}
	// };
  //
	// consultationClick=(context)=>{
   //  console.log('consultationClick: ',this.state.expert);
   //  context.props.history.push('/ConsultationPage/'+this.state.expert._id);
	// };
  //
	// editClick=(question)=>{
	// 	/*<EditConditionBox/>*/
	// 	console.log(question);
	// };
  //
	// addNewConditionClick =(context)=>{
  //
	// 	this.setState({
	// 		editBlock: (
	// 			<ConfigDevelop expert={this.state.expert}/>
	// 		)
	// 	});
  //
	// };

  render(){
    return (
      <div className="Edit">
				<Header />
				<div className="section-1 d-flex">
					<div className="container d-flex">
						<div className='title d-flex'>
							<h1>{this.state.expert ? this.state.expert.name : 'No expert found'}</h1>
						</div>

						<div className='btn-group'>
							<button className='btn btn-outline-light'><i className="ion-plus-round"></i></button>
							<button className='btn btn-outline-light'><i className="ion-gear-a"></i></button>
						</div>

					</div>
				</div>

				<div className="section-2 py-5 bg-light">
					<div className="container">
						<div className="row">

							{this.state.expert ?
								this.state.questions.map((question, index)=>
									<div className="col-md-4" key={question.key}>
										<div className="card mb-4 box-shadow">
											<div className="card-header d-flex justify-content-between align-items-center">
												<h5 className="">Question #{index}</h5>
												<p className="text-muted text-truncate">{question.key}</p>
											</div>
											<div className="card-body">
												<p className="card-text text-truncate">{question.question}</p>
												<div className="d-flex justify-content-between align-items-center">
													<div className="btn-group">
														<button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
														<button type="button" className="btn btn-sm btn-outline-danger">Delete</button>
													</div>
													<small className="text-muted">6 rel</small>
												</div>
											</div>
										</div>
									</div>
								)
								: 'No questions'}


						</div>
					</div>
				</div>

      </div>
    )};
}



export default withRouter(Edit);
