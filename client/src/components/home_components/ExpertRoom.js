import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';



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
  };

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
                <p><mark>questions</mark>: {question.answersString}</p>
              </li>
            )}
          </ul>
        ),
      });
    }

  }

  onConfigureExpertClick=()=>{
  };

  consultationClick=(context)=>{
      context.props.setConsultationExpert(this.props.expert);
      context.props.history.push('/consultation');
  };

  render(){
    return (
      <div className="Home-content-body">
        <div className="header-expertRoom">
          <div className="header-expertRoom-top">
            <div>
              <h3 className="header-expertRoom-expertName"
              title={this.props.expert.name}>{this.props.expert.name}</h3>
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
            <button onClick={()=>{this.consultationClick(this)}} className="header-expertRoom-consultationBtn">Consultation</button>
          </div>

        </div>
        <div className="expertRoom-body">

          <div className="expertRoom-questionList">
            {this.state.questionsDOMs}
          </div>

        </div>
      </div>
    )
  }
}

{/*<NavLink to="/consultation" className="header-expertRoom-consultationBtn">Consultation</NavLink>*/}

export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({
    getHomeBody: (id)=>{
      dispatch({type:'GET_HOME_BODY',payload: id});
    },
    setConsultationExpert: (expert)=>{
      dispatch({type:'SET_CONSULTATION_EXPERT1',payload: expert});
    }
  })
)(ExpertRoom));
