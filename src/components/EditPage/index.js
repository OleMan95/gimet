import React from 'react';
import {NavLink, withRouter } from 'react-router-dom';
import {getToken} from '../services/tokenService';
import {getExpertById, createOrUpdateExpert} from '../services/api-helper';
import Header from '../sections/Header/';
import EditModal from '../sections/EditModal/';
import ExpertSettingsModal from '../sections/ExpertSettingsModal';
import alertHelper from '../services/alert-helper';

import './index.scss';


class Edit extends React.Component{
  constructor(){
    super();
    this.state={
      expert: {},
			questions: [],
      modalQuestion: '',
      isModalOpen: false,
      isSettingsOpen: false,
			alert: 'Error!',
			alertDangerClass: 'd-none',
			alertInfoClass: 'd-none',
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

	onSettingsOpen=()=>{
		this.setState({
			isSettingsOpen: true
		});
	};
	onSettingsClose=()=>{
		this.setState({
			isSettingsOpen: false
		});
	};
	onSettingsSave=(newExpert)=>{
		const expert = this.state.expert;
		expert.name = newExpert.name;
		expert.description = newExpert.description;
		expert.contributors = newExpert.contributors;

		this.setState({
			isSettingsOpen: false,
		});
	};

	onSaveExpert = async () => {
		let id = this.props.match.params.id == 'new' ? null : this.props.match.params.id;

		await createOrUpdateExpert(id, this.state.expert, (data)=>{
			alertHelper(this, 'Expert successfully saved.');
		}, (err)=>{
			alertHelper(this, 'Oops! An error has occurred.', 'danger');
		});
	};

  render(){
		return (
      <div className="Edit h-100">
				<Header />
				<div className="section-1 d-flex">
					<div className="container d-flex">
						<div className='title d-flex'>
							<h1>{this.state.expert.name ? this.state.expert.name : 'No expert found'}</h1>
							<p>{this.state.expert.description ? this.state.expert.description : ''}</p>
						</div>

						<div className='btn-group'>
							<button className='btn btn-outline-light' onClick={()=>this.onModalOpen()}>
								<i className="ion-plus-round"></i></button>
							<button className='btn btn-outline-light' onClick={()=>this.onSettingsOpen()}>
								<i className="ion-gear-a"></i></button>
							<button className='btn btn-outline-light' onClick={()=>this.onSaveExpert()}>SAVE</button>
						</div>

					</div>
				</div>

				<div className="section-2 h-100 bg-light">
					<div className="container py-5">
						<div className="row">

							{this.state.expert ?
								this.state.questions.map((question, index)=>
									<div className="col-md-4" key={question.key}>
										<div className="card mb-4 box-shadow">
											<div className="card-header d-flex flex-column justify-content-between align-items-center">
												<h5 className="">Question #{index}</h5>
											</div>
											<div className="card-body">
                        <p className="text-muted key-text text-monospace">{question.key}</p>
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
          <EditModal question={this.state.modalQuestion}
                           isOpen={this.state.isModalOpen}
                           onModalSave={this.onModalSave}
                           onModalClose={this.onModalClose}/>
          : ''}

        {this.state.isSettingsOpen ?
          <ExpertSettingsModal expert={this.state.expert}
                           isOpen={this.state.isSettingsOpen}
                           onModalSave={this.onSettingsSave}
                           onModalClose={this.onSettingsClose}/>
          : ''}


        <div className="alert-group w-100 d-flex">
					<div className={"alert alert-danger "+this.state.alertDangerClass} role="alert">
						{this.state.alert}
					</div>
					<div className={"alert alert-info "+this.state.alertInfoClass} role="alert">
						{this.state.alert}
					</div>
				</div>


      </div>
    )};
}



export default withRouter(Edit);
