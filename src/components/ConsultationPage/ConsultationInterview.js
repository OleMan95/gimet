import React from 'react';
import {withRouter } from 'react-router-dom';

class ConsultationInterview extends React.Component{
	constructor(){
		super();
		this.state={
      currentQuestion:{
        question: '',
        answers: [],
				key:'',
				results:[]
      },
      key: ''
		};
	};

  componentDidMount(){
		this.getQuestion();
  }

	componentWillUnmount(){
  	this.setState({
			currentQuestion:{
				question: '',
				answers: [],
				key:'',
				results:[]
			}
		});
	}

	getQuestion=(nextKey)=>{
		let question;
		let answers;
		let results;
		let key;

  	if(!nextKey){
			question = this.props.expert.questions[0].question;
			answers = this.props.expert.questions[0].answers;
			results = this.props.expert.questions[0].results;
			key = this.props.expert.questions[0].key;
		}else{
  		for(let i=0; i<this.props.expert.questions.length; i++){
  			if(this.props.expert.questions[i].key == nextKey){
					question = this.props.expert.questions[i].question;
					answers = this.props.expert.questions[i].answers;
					results = this.props.expert.questions[i].results;
					key = this.props.expert.questions[i].key;
				}
			}
		}

	  this.setState({currentQuestion:{question, answers, results, key}});
	};

  onAnswerClick=(result)=>{
		if(result.type == 'key'){
			this.getQuestion(result.value);
		}else{
			this.props.onResult(result.value);
		}
	};

  render(){
		return (
			<div className="jumbotron consultation-interview mx-auto ">
				{/*<h3 className=""></h3>*/}
				<p className="lead">{this.state.currentQuestion.question}</p>
				<hr className="my-4"/>
				<ul className="list-group list-group-flush">
					{this.state.currentQuestion.answers.map((answer, i)=>
						<li className="list-group-item list-group-item-action"
								key={this.state.currentQuestion.results[i].value}
								onClick={()=>{this.onAnswerClick(this.state.currentQuestion.results[i])}} >
							<p>{answer}</p>
						</li>
					)}
				</ul>
			</div>
    )
  }
}


export default withRouter(ConsultationInterview);
