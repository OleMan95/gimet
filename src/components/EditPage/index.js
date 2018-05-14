import React from 'react';
import {NavLink, withRouter } from 'react-router-dom';
import {getToken} from '../services/tokenService';
import {getExpertById} from '../services/api-helper';
import Header from '../sections/Header/';
import EditModalWindow from '../sections/EditModalWindow/';

import './index.scss';


class Edit extends React.Component{
  constructor(){
    super();
    this.state={
      expert: {},
			questions: [],
      modalQuestion: '',
      isModalOpen: false
    };
  };

  async componentDidMount() {

    await getExpertById(this.props.match.params.id, expert=>{
			if(expert._id){
				this.setState({
					expert,
					questions: expert.questions
				});
			}
		}, err=>{
			alert('Unfortunately, there was a problem with the fetching operation.');
    	this.props.history.push('/');
		});

  };

  onModalOpen=(question)=>{

    this.setState({
      isModalOpen: true,
      modalQuestion: question
    });

  };
  onModalClose=()=>{
    this.setState({
      isModalOpen: false
    });
  };
  onModalSave=(question)=>{
    const questions = this.state.questions;
    let coincidence = false;

    for(let i=0; i<questions.length; i++){
      if(questions[i].key == question.key){
        questions[i].question = question.question;
        questions[i].answers = question.answers;
        questions[i].results = question.results;
        coincidence = true;
      }
    }

    if(!coincidence){
      questions.push(question);
    }

    this.setState({
      isModalOpen: false,
      questions
    });
  };

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
							<button className='btn btn-outline-light' onClick={()=>this.onModalOpen()}><i className="ion-plus-round"></i></button>
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
														<button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>this.onModalOpen(question)}>Edit</button>
														<button type="button" className="btn btn-sm btn-outline-danger">Delete</button>
													</div>
													<small className="text-muted">{question.answers.length} rel</small>
												</div>
											</div>
										</div>
									</div>
								)
								: 'No questions'}


						</div>
					</div>
				</div>

        {this.state.isModalOpen ?
          <EditModalWindow question={this.state.modalQuestion}
                           isOpen={this.state.isModalOpen}
                           onModalSave={this.onModalSave}
                           onModalClose={this.onModalClose}/>
          : ''}

      </div>
    )};
}



export default withRouter(Edit);
