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

  onCloseExpertClick=(id)=>{
    //Параметр null знатит то, что должно отобразится окно
    // активности (browseActivity)
    this.props.getHomeBody(null);
  }

  componentDidMount(){
    if(!this.props.expert.description){
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

    if(!this.props.expert.conditions){
      this.setState({
        conditionsDOMs:(
          <p className="expertRoom-emptyText">Empty</p>
        ),
      });
    }else{
      let isEmpty = false;
  
      for(let i=0;i<this.props.expert.conditions.length;i++){
        if(!this.props.expert.conditions[i].pairs){
          isEmpty = true;
        }
      }
  
      if(isEmpty){
        this.setState({
          conditionsDOMs:(
            <p className="expertRoom-emptyText">Empty</p>
          ),
        });
      }else{
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
        
    

    if(!this.props.expert.questions){
      this.setState({
        questionsDOMs:(
          <p className="expertRoom-emptyText">Empty</p>
        ),
      });
    }else{
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

  render(){
    return (
      <div className="Home-content-body">
        <div className="header-expertRoom">
          <div className="header-expertRoom-top">
            <div>
              <h3 className="header-expertRoom-expertName">{this.props.expert.name}</h3>
            </div>
            <div className="header-expertRoom-btns">
              <button className="expertRoom-configureExpert">
              </button>
              <button className="expertRoom-closeBtn" onClick={this.onCloseExpertClick}>
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
