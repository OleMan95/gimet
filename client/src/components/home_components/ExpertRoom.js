import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import '../../css/App.css';
import '../../css/Home.css';
import '../../css/ConfigConsultation.css';


class ExpertRoom extends React.Component{
  constructor(){
    super();
    this.state = {
      conditionsDOMs:[],
      questionsDOMs:[],
      name:'',
      description:'',
    }
  }

  onCloseExpertClick=()=>{ // если закрываем описание експерта, то отображаем начальное окно browseActivity
    //Параметр null знатит то, что должно отобразится окно
    // активности (browseActivity)
    this.props.getHomeBody(null);
  }

  componentDidMount(){ // происходит после рендеринга объекта
    if(!this.props.expert.description){ // если присутствует описание про експерта то происходит вывод this.props.expert.description, если нет то Empty
      this.setState({
        description:(
          <p className="expertRoom-emptyText">Empty</p>
        ),
      });
    }else{
      this.setState({
        description:(
          <p>{this.props.expert.description}</p>
        ),
      });
    }

    if(!this.props.expert.conditions){// если не присутствуют conditions в експерте то No conditions!
      this.setState({
        conditionsDOMs:(
          <p className="expertRoom-emptyText">No conditions!</p>
        ),
      });
    }else{ // иначе выводятся все conditions
      let isEmpty = false;
  
      for(let i=0;i<this.props.expert.conditions.length;i++){ // проверка на наличие пар в експерте
        if(!this.props.expert.conditions[i].pairs){
          isEmpty = true;
        }
      }
  
      if(isEmpty){ // если пар нету, то выводим Incorrectly configured conditions!
        this.setState({
          conditionsDOMs:(
            <p className="expertRoom-emptyText">Incorrectly configured conditions!</p>
          ),
        });
      }else{ // если пары есть, то выводим информацию Conditions
        this.setState({
          conditionsDOMs:(
            <ul className="expertRoom-conditionList-list">
              {this.props.expert.conditions.map((condition, index)=>
                <li key={index} className="expertRoom-conditionList-listItem">
                  <h3>Condition #{index+1}:</h3>
                  <h4>if</h4>
                  {condition.pairs.map((pair, i)=>
                    <p key={i}><mark>{pair.key}</mark> = {pair.answer}</p>)}
                  <h4>then</h4>                  
                  <p><mark>result</mark> = {condition.result}</p>
                </li>
              )}
            </ul>
          ),
        });
      }
    }
        
    

    if(!this.props.expert.questions){ // проверка на наличие вопросов, если нету то вывод No questions!
      this.setState({
        questionsDOMs:(
          <p className="expertRoom-emptyText">No questions!</p>
        ),
      });
    }else{ // если вопросы есть, то выводим их
      this.setState({
        questionsDOMs:(
          <ul className="expertRoom-questionList-list">
            {this.props.expert.questions.map((question, index)=>
              <li key={index} className="expertRoom-questionList-listItem">
                <h3>Question #{index+1}:</h3>
                <p><mark>key</mark>: {question.key}</p>
                <p><mark>question</mark>: {question.question}</p>
                <p><mark>answers</mark>: {question.answersString}</p>
              </li>
            )}
          </ul>
        ),
      });
    }

  }

  onConfigureExpertClick=()=>{// .....
    var url = 'http://www.google.com';
    fetch(url).then((response) => {
      if(!response.ok) alert('Download error!');
      return response;
    }).then((response) => response.json())
    .then((data) => {
      console.log('загружено: '+data);
})
  }

  render(){
    return (
      <div className="Home-content-body">
        <div className="header-expertRoom">
          <div className="header-expertRoom-top">
            <div>
              <h3 className="header-expertRoom-expertName">{this.props.expert.name}</h3>
            </div>
            <div className="header-expertRoom-btns">
              <button className="expertRoom-configureExpert" 
                onClick={this.onConfigureExpertClick}>
              </button>
              <button className="expertRoom-closeBtn" 
                onClick={this.onCloseExpertClick}>
              </button>
            </div>
          </div>
  
          <div className="header-expertRoom-description">
            {this.state.description}           
          </div>

          <div className="header-expertRoom-bottom">
            <NavLink to="/consultation" className="header-expertRoom-consultationBtn" onClick={this.onCloseExpertClick}>Consultation</NavLink>            
          </div>

        </div>
        <div className="expertRoom-body">

          <div className="expertRoom-questionList">
            {this.state.questionsDOMs}
          </div>

          <div className="expertRoom-conditionList">
            {this.state.conditionsDOMs}
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({
    getHomeBody: (id)=>{
      dispatch({type:'GET_HOME_BODY',payload: id});
    }
  })
)(ExpertRoom));
