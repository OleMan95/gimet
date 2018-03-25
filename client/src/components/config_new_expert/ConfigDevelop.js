import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter, Prompt } from 'react-router-dom';
import {getUser, getToken} from '../../services/tokenService';

/*
  expert:{
    name:'',
    description:'',
    questions:[
      {
        key:'q1',
        question:'question 1',
        answersString:'value 1, value 2',
        answers:['value 1' , 'value 2'],
        results:[
          {type:'key',value:'q2'},
          {type:'text',value:'result 2'}
        ]
      }
    ]
  }
*/

class ConfigDevelop extends React.Component{
  state = {
    questionCount:1,
    expert:{
      name:this.props.expert.name,
      description:this.props.expert.description,
      questions:[]
    },
    unsolvedQuestions:[],
    keyValue:'',
    questionValue:'',
    answerValue:'',
    answers:[],
    answersList:[],
    resultsList:[],
    answersCount:1, 
    answersString:'',
    finishMassage:'Are you sure you want to go?',
    user: {}
  };

  async componentDidMount() {
      const user = await getUser('name');
      this.setState({user});
      console.log('user._id: ', user._id);
  }

  handleInputChange=(event)=>{
    let value = event.target.value.trim();
    switch (event.target.name) {
      case 'question':
        this.setState({
          questionValue:value.trim(),
        });
        break;
      case 'answer':
        this.setState({
          answerValue:value.trim(),
        });
        break;
      case 'key':
        this.setState({
          keyValue:value.trim(),
        });
        break;
      default:
    }
  };

  onKeyDown=(event)=>{
    if(event.keyCode === 13){
      let answersList = this.state.answersList;
      let answersValue = this.state.answerValue;
      let newAnswersCount = this.state.answersCount;
      let answers = this.state.answers;

      if(!this.answersInput.value || 
        this.answersInput.value.trim() === ''){
          return;
      }
      
      let resultsList = this.state.resultsList;
      // let resultValue = this.state.resultValue;
      
      if(!answersValue){
        alert('No answer value found!');
        return;
      }
        let answerValue = answersValue.trim();
      //убираем пробелы по краям ответа

      for(let i=0; i<this.state.answersList.length; i++){
        if(this.state.answers[i] === answerValue || !answerValue){
          return;          
        }
      }

      let newAnswers = [
        ...answers,
        answerValue
      ];
      let newAnswersList = [
        // <mark>{newAnswersCount}.</mark>
        ...answersList,
        (
          <li key={answerValue}>
            <div className="CD-answerItem">
              <div>
                <p>{answerValue}</p>
              </div>
              <div onClick={() => this.onDelTagClick(answerValue)}/>
            </div>         
          </li>
          )
      ];
      let newResultsList = [
        ...resultsList,
        (
          <li key={answerValue}>
            <div className="CD-resultItem">
              <select defaultValue="none" className="CD-resultSelect">
                <option value="none"/>
                <option value="key">key</option>
                <option value="text">text</option>
              </select>
              <input type="text" className="CD-resultInput"
                name="result"
                placeholder={"Result for an answer with the same number"}
                onChange={(elem)=>this.handleInputChange(elem)}/>
            </div>
              
          </li>
        )
      ];

      let newAnswersString;
      if(!this.state.answersString) newAnswersString = answerValue;
      else newAnswersString = this.state.answersString+', '+answerValue;

      this.answersInput.value='';

      newAnswersCount++;
      this.setState({
        answersList:newAnswersList,
        resultsList:newResultsList,
        answersValue:'',
        answersString:newAnswersString,
        answersCount:newAnswersCount,
        answers:newAnswers,        
      });
    }
  };

  onDelTagClick=(value)=>{
    let answers = this.state.answers;
    let answersList = this.state.answersList;
    let resultsList = this.state.resultsList;

    for(let i=0; i<answers.length; i++){
      if(answers[i] === value){
        console.log(answers[i], ' = ',value);
        answers.splice(i, 1);
        answersList.splice(i, 1);
        resultsList.splice(i, 1);
      }
    }

    this.setState({
      answersList: answersList,
    });      
  };

  onAddClick=()=>{
    let questionCount = this.state.questionCount;
    let expert = this.state.expert;
    let newQuestions = expert.questions;
    let resultValues = document.getElementsByClassName("CD-resultInput");
    let resultTypes = document.getElementsByClassName("CD-resultSelect");
    let newResults = [];
    let unsolvedQuestions = this.state.unsolvedQuestions;
    let value = '';
    let type = '';

    if(this.state.answers.length <=0){
      alert('No answers found! ');
      return;
    }else if(!this.questionInput.value || 
      this.questionInput.value.trim() === ''){
        alert('Question field is empty.');
        return;
    }else if(!this.keyInput.value || 
      this.keyInput.value.trim() === ''){
        alert('Enter the question key.');
        return;
    }else if(resultValues) {
      for(let i=0; i<resultValues.length; i++){
        console.log('result type:',resultTypes[i].value,'.');
        
        if(resultValues[i].value.trim() === '') {
          alert('Error! Result №'+(i+1)+' is empty.');
          return;
          // Проверка полей ввода результата на пустое значение. 
          // Если поле "Result" пустое, то выводится сообщение.  
        }else if(resultTypes[i].value.trim() === 'none'){
          alert('Select type of result №'+(i+1));
          return;
        }
      }      
    }

    for(let i=0; i<resultValues.length; i++){
      if(resultValues[i].value.trim() === '') {
        alert('Error! Result №'+(i+1)+' is empty.');
        return;
        // Проверка полей ввода результата на пустое значение. 
        // Если поле "Result" пустое, то выводится сообщение.  
      }else{
        value = resultValues[i].value.trim();
        type = resultTypes[i].value.trim();

        if(type === 'key' && unsolvedQuestions.indexOf(value) === -1)
         unsolvedQuestions.push(value);

        newResults.push({
          type:type,
          value:value
        });
      }
    }
    for(let j=0; j<expert.questions.length; j++){
      if(expert.questions[j].key === this.state.keyValue){
        alert('Question "'+ this.state.keyValue +'" already exist.');
        return;        
      }
    }      
    
    newQuestions.push({
      key:this.state.keyValue,
      question:this.state.questionValue,
      answers:this.state.answers,
      results:newResults
    }); 
    expert.questions = newQuestions;
    
    let unsolvedQuestionsIndex = this.state.unsolvedQuestions.indexOf(this.state.keyValue);

    if(unsolvedQuestionsIndex >= 0){
      unsolvedQuestions.splice(unsolvedQuestionsIndex, 1);
    }else if(unsolvedQuestionsIndex < 0){
    }

    console.log('unsolvedQuestions: ',unsolvedQuestions);

    questionCount++;
    this.setState({
      expert: expert,
      keyValue:'',
      questionValue:'',
      answers:[],
      answersList:[],
      resultsList:[],
      answersCount:1,
      questionCount:questionCount,
    });

    this.questionInput.value = '';
    this.keyInput.value = '';
    this.answersInput.value = '';
  };

  onFinish= async () => {
      let unsolvedQuestions = this.state.unsolvedQuestions;
      const url = '/v1/user/' + this.state.user._id;

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': await getToken()
          },
          body: JSON.stringify(this.state.expert)
      }).then((response) => {
          response.json().then(function (data) {
              console.log(data);
          });
          return response;
      }).catch(function (error) {
          console.log('There has been a problem with fetch operation: ' + error.message);
      });

      if (unsolvedQuestions.length > 0) {
          return 'You have unsolved questions: '
              + unsolvedQuestions + ". Are you sure you want to go?";
      } else {
          return "Are you sure you want to go?";
      }
  };

  render() {
    return (
      <div className="CD-questionBody">
        <div className="CD-header">
          <div>
            <h3>Question #{this.state.questionCount}</h3>
          </div>
        </div>

        <Prompt when={true} message={() => {return this.onFinish()}}/>

        <div className="CD-content">
          <textarea type="text" rows="5" name="question" id='CD-questioninput'
            ref={(input)=>{this.questionInput = input}}           
            placeholder="Write here your question" 
            onChange={(elem)=>this.handleInputChange(elem)}/>

          <input type="text" name="key"
            id='CD-keyinput'
            ref={(input)=>{this.keyInput = input}}           
            placeholder="Enter the key for this question"
            onChange={(elem)=>this.handleInputChange(elem)}/>

          <input type="text" name="answer"
            id='CD-answerinput'
            placeholder="Add new answer"
            ref={(input)=>{this.answersInput = input}}            
            onChange={(elem)=>this.handleInputChange(elem)}
            onKeyDown={(event)=>this.onKeyDown(event)}/>
          
          <div>

            <div className="CD-answersDiv">
              <h3>Answers:</h3>
              <ol className="CD-answersList">
                {this.state.answersList}
              </ol>
            </div>

            <div className="CD-resultsDiv">
              <h3>Results:</h3>
              <ol className="CD-resultsList">
                {this.state.resultsList}
              </ol>
            </div>

          </div>

          <div>
            <div className="CD-hints">
              {this.state.unsolvedQuestions.map((key, index)=>
                <p key={index}>{key}</p>
              )}
            </div>
            <div className="CD-buttons">
              <button type="button" name="addBtn" id="CD-buttons-addBtn" 
                onClick={this.onAddClick}>Add</button>
              <NavLink to="/home" type="button" name="finishBtn" 
                id="CD-buttons-finishBtn">Finish</NavLink>
            </div>
          </div>


        </div>
      </div>
    )}
  }

export default withRouter(connect(
  state=>({
    store: state
  }),
  dispatch=>({})
)(ConfigDevelop));
