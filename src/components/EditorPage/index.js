import React from 'react';
import {NavLink, withRouter } from 'react-router-dom';
import {getUser, getToken} from '../services/tokenService';
// import ConfigDevelop from '../config_new_expert/ConfigDevelop';
// import EditConditionBox from './EditConditionBox';

class Edit extends React.Component{
  // constructor(){
   //  super();
   //  this.state={
   //    expert: {},
	// 		conditionsDOMs:[],
	// 		questionsDOMs:[],
	// 		name:'',
	// 		description:'',
	// 		editBlock: ''
   //  };
  // };
  //
  // async componentDidMount() {
   //  await this.fetchUser();
   //  await this.fetchExpert();
  // };
  //
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
      <div>
        {/*<header className="header" >*/}
          {/*<div>*/}
            {/*<NavLink to="/home" className="header-logo">*/}
              {/*<div className="header-logo-img"/>*/}
              {/*<p className="header-logo-title">GIMET</p>*/}
            {/*</NavLink>*/}
            {/*<NavLink to="/home" className="header-userName">*/}
              {/*<h2>{this.state.expert.name}</h2>*/}
            {/*</NavLink>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<NavLink to="/" className="signOutBtn">Sign out</NavLink>*/}
          {/*</div>*/}
        {/*</header>*/}

        {/*<div className="Edit">*/}
          {/*<div className="edit-content">*/}
              {/*<div className="edit-top">*/}
								{/*<input type="search" name="findQuestion" placeholder="Find a question"*/}
											 {/*onChange={this.handleFilterChange} />*/}
								{/*<div className="edit-btns d-flex justify-center">*/}
									{/*<button onClick={()=>{this.consultationClick(this)}} className="d-flex align-items-center">Consultation</button>*/}
									{/*<button onClick={()=>{this.addNewConditionClick(this)}} className="edit-plus-btn d-flex align-items-center">+</button>*/}
								{/*</div>*/}
              {/*</div>*/}

              {/*<div className="edit-body d-flex justify-center flex-column">*/}
								{/*<div className="edit-description d-flex justify-center">*/}
									{/*{this.state.expert.description}*/}
								{/*</div>*/}

								{/*<div className="edit-questions">*/}
									{/*{this.state.questionsDOMs}*/}
								{/*</div>*/}

              {/*</div>*/}

          {/*</div>*/}
        {/*</div>*/}

				{/*{this.state.editBlock}*/}

      </div>
    )};
}



export default withRouter(Edit);
