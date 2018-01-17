import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import * as firebase from 'firebase';

import ExpertRoom from './ExpertRoom';
// import ConfirmDeleteExpert from '/.ConfirmDeleteExpert';

class Home extends React.Component{
  constructor(){
    super();
    this.state={ 
      browseActivity:( // создание елемента который будет отображаться на странице до момента нажатия на експерта в списке експертов
        <div className="Home-content-body">
          <div className="content-body-header">
            <button className="content-body-header-text1">
            <h3>Browse activity</h3>
            </button>
            <button className="content-body-header-text2">
            <h3>Find an expert</h3>
            </button>
          </div>
          <div className="content-body">
          </div>
        </div>
      ),
      expertNames:[],
      confirmationBlock: "",
    };
  };

  componentDidMount(){
      this.getExperts();
  };

  getExperts=()=>{

      const url = '/v1/user/' + this.props.store.accountReducer.user._id + '/experts';
      const context = this;

      fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':this.props.store.accountReducer.token
          },

      }).then((response) => {
          response.json().then(function(data) {
              console.log(data);
              context.displayExperts(data);

          });
          return response;
      }).catch(function(error) {
          console.log('There has been a problem with fetch operation: ' + error.message);
      });

  };

  displayExperts=(experts)=>{ // проверка и заполнение списка експертов(если они есть) в кабинете пользователя
    let expertListElems=[];
    
    if(!experts) {
      expertListElems = (
        <p className="content-experts-emptyList">No experts</p>
      );
    }else{
      for(let i=0; i<experts.length; i++){
        expertListElems.push( // перебор экспертов и создание маркированного списка, при нажатии на элемент списка происходит вызов события onExpertClick
          <li key={i} id={experts[i]._id} onClick={(elem)=>{this.onExpertClick(experts[i])}} className="content-experts-listItems">
            <p id={experts[i]._id}>{experts[i].name}</p>
            <button id={experts[i]._id} onClick={(elem) => this.onConfirmDeleteUserDialog(experts[i])}/>
          </li>
        );
      }
    }

    this.setState({
      expertNames:expertListElems,
    });
  };

  handleFilterChange=(event)=>{ // производится поиск експертов по имени, которое введет пользователь
    switch (event.target.name) {
      case 'findExpert':
        let newExpertNames = [];
        //При чтении экспертов из firebase записывается переменная names в state.
        //Если name (элемент массива names) содержит event.target.value (значение поля findExpert),
        // значит name записивается в новый массив с именами.
        newExpertNames = this.state.names.filter(name => name.includes(event.target.value));

        this.displayExperts(newExpertNames);
        
        break;
      default:
    }
  };

  onDeleteExpertClick=(expert)=>{ // процес удаления експерта при нажатии кнопки удаления в списке експертов.
    // this.props.getHomeBody(<ConfirmDeleteExpert />);
      const userId = this.props.store.accountReducer.user._id;
      console.log(userId);
      const url = '/v1/expert/'+userId+'?expertId='+ expert._id;
      const ctx = this;
      console.log('expert: ', expert._id);

      fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':this.props.store.accountReducer.token
          }
      }).then((response) => {
          if(response.status==200)
          {
              ctx.getExperts();
          }
          else
          {
              alert("Expert not found");
          }
          ctx.ConfirmDeleteUserDiv.style.display='';

          return response;
      }).catch(function(error) {
          console.log('There has been a problem with fetch operation: ' + error.message);
      });
    
    // Create a reference to the expert to delete
    // const rootRef = firebase.database().ref().child('experts').child(elem.target.id);
    //
    // // Delete the expert
    // rootRef.remove().then(function() {
    //   // File deleted successfully
    //   alert('Expert deleted successfully!');
    // }).catch(function(error) {
    //   // Uh-oh, an error occurred!
    //   alert('Uh-oh, an error occurred!');
    // });

  };

   onConfirmDeleteUserDialog=(expert)=> {

        this.setState({
            confirmationBlock:(
              <div className='ConfirmDeleteUserDiv' ref={(button)=>{this.ConfirmDeleteUserDiv = button}}>
                  <h3>Delete:</h3>
                  <p>Are you sure you want to delete this expert?</p>

                  <button className='ConfirmDeleteUserDivClose'
                          onClick={this.onConfirmDeleteUserDialogClose}>Close</button>
                  <button className='ConfirmDeleteUserDivAccept'
                          onClick={(elem)=>this.onDeleteExpertClick(expert)} >Confirm</button>

              </div>
            )
      }, ()=>{
            this.ConfirmDeleteUserDiv.style.display='inline-block';
        })


      // this.ConfirmDeleteUserDiv.style.display='inline-block';
  };


  onConfirmDeleteUserDialogClose=()=> {
      this.ConfirmDeleteUserDiv.style.display='';
  };

  onExpertClick=(expert, elem)=>{ // при нажатии на определенного есперта из списка експертов ,
                                  // происходит рендер определенной области с отображеним данных об експерте
      const url = '/v1/expert/' + expert._id;
      const ctx = this;
      console.log('expert: ', expert._id);

      fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':this.props.store.accountReducer.token
          }
      }).then((response) => {
          response.json().then(function(data) {
              ctx.props.getHomeBody(<ExpertRoom expert={data}/>);
              // ctx.props.setConsultationExpert(data);


          });
          return response;
      }).catch(function(error) {
          console.log('There has been a problem with fetch operation: ' + error.message);
      });
  };

  render(){
    return (
      <div>
        <header className="header" >
          <div>
            <NavLink to="/home" className="header-logo">
              <div className="header-logo-img"/>
              <p className="header-logo-title">GIMET</p>
            </NavLink>
            <NavLink to="/home" className="header-userName">
              <h2>{this.props.store.accountReducer.user.name}</h2>
            </NavLink>
          </div>
          <div>
            <NavLink to="/" className="signOutBtn">Sign out</NavLink>
          </div>
        </header>
        
        <div className="Home">
          <div className="Home-content">
            {this.props.store.homeBodyHandler[0]?this.props.store.homeBodyHandler[0]:this.state.browseActivity}
            <div className="Home-content-experts">
              <div className="content-experts-header">
                <div className="experts-header-title">
                  <h3>Your experts</h3>
                  <NavLink to="/config_new_expert" className="addExpertBtn">NEW EXPERT</NavLink>
                </div>
                <div className="experts-header-find">
                  <input type="search" name="findExpert" placeholder="Find an expert"
                  onChange={this.handleFilterChange} />
                </div>
  
              </div>
              <div className="content-experts">
                <ul className="content-experts-list">
                  {this.state.expertNames}
                </ul>
              </div>
  
            </div>
          </div>
        </div>



          {this.state.confirmationBlock}






      </div>
    )};
}



export default withRouter(connect(
  state=>({
    store: state,
  }),
  dispatch=>({ // сохранение в Redux данных
    getHomeBody: (id)=>{
      dispatch({type:'GET_HOME_BODY',payload: id});
    },
    // setConsultationExpert: (expert)=>{
    //   dispatch({type:'SET_CONSULTATON_EXPERT1',payload: expert});
    // }
  })
)(Home));
