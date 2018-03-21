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
          <p className="expertRoom-description">{this.props.expert.description}</p>
        ),
      });
    }

    if(!this.props.expert.questions){
      console.log(this.props.expert.questions);
      this.setState({
        questionsDOMs:(
          <p className="expertRoom-emptyText">No questions!</p>
        ),
      });
    }else{ // если вопросы есть, то выводим их
      this.setState({
        questionsDOMs:(
          <ul className="expertRoom-list">
            {this.props.expert.questions.map((question, index)=>
              <li key={index} className="expertRoom-listItem">
                <h3>Question #{index+1}:</h3>
                <p><mark>key</mark>: {question.key}</p>
                <p><mark>question</mark>: {question.question}</p>
                <p><mark>answers</mark>: {question.answers}</p>
              </li>
            )}
          </ul>
        ),
      });
    }

  }

  consultationClick=(context)=>{
      context.props.setConsultationExpert(this.props.expert);
      context.props.history.push('/consultation');
  };

  render(){
    return (
      <div className="expertRoom">
        <div>
          {this.state.description}
        </div>

        <div className="expertRoom-consultation d-flex justify-center">
          <button onClick={()=>{this.consultationClick(this)}} className="d-flex align-items-center">Consultation</button>
        </div>

        <div className="">

          <div className="">
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
