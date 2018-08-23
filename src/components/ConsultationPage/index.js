import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
import ConsultationInit from './ConsultationInit';
import ConsultationInterview from './ConsultationInterview';
import ConsultationResult from './ConsultationResult';
import {getExpertById} from '../services/api-helper';
import './index.scss';


class Consultation extends React.Component{
	constructor(){
		super();
		this.state={
			expert: {},
      questions:[],
			content: 'ConsultationInit',
			result:{}
		};
	};

  async componentWillMount() {
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

	onStartClick=()=>{
		this.setState({
			content: 'ConsultationInterview'
		});
	};

	onResult=(result)=>{
		this.setState({
			content: 'ConsultationResult',
			result
		});
	};


  render(){
    return (
      <div className="Consultation">
        <Header/>
				<div className="container py-5 mx-auto">
					<ConsultationInit class={this.state.content == 'ConsultationInit' ? '' : 'd-none'}
														expert={this.state.expert} onStartClick={this.onStartClick}/>

					{this.state.content == 'ConsultationInterview' ?
						<ConsultationInterview expert={this.state.expert} onResult={this.onResult}/>
						: ''}

					{this.state.content == 'ConsultationResult' ?
						<ConsultationResult result={this.state.result} expert={this.state.expert} onStartClick={this.onStartClick}/>
						: ''}

				</div>
				<Footer/>
      </div>
    )
  }
}


export default withRouter(Consultation);
