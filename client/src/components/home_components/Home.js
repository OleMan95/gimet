import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter } from 'react-router-dom';
import {getUser, getToken} from '../../services/tokenService';
import * as firebase from 'firebase';

import ExpertRoom from './ExpertRoom';
// import ConfirmDeleteExpert from '/.ConfirmDeleteExpert';

class Home extends React.Component{
  constructor(){
    super();
    this.state={ 
      expertsList:[],
      experts:[],
      confirmationBlock: '',
      username: '',
      roomClass: 'expand-block'
    };
  };

  async componentDidMount() {
      const user = await getUser('experts name', 'true');
      console.log('! user: ', user);

      if (user) {
          this.props.setUser(user);
          this.displayExperts(user.experts);

          this.setState({
              username: user.name,
              experts: user.experts,
          });

      } else {
          this.props.history.push('/signin');
      }

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
          <li key={i} id={experts[i]._id} className="experts-listItem d-flex flex-column">
            <div className="experts-header d-flex justify-between align-items-center"
                 onClick={()=>{this.onExpertClick()}}>

              <p id={experts[i]._id}>{experts[i].name}</p>

              <button className="d-flex justify-center align-items-center"
                      id={experts[i]._id} onClick={(elem) => this.onConfirmDeleteUserDialog(experts[i])}>
                  <i className="material-icons">delete</i>
              </button>
            </div>
            <div className="experts-body d-flex flex-column justify-center align-items-center">
                <i className="material-icons d-flex justify-center"
                   ref={elem=>this.expandIcon = elem}
                   onClick={()=>{this.onExpertClick()}}>keyboard_arrow_down</i>
                <div className={this.state.roomClass} ref={elem=>this.expandBlock = elem}>
                    <ExpertRoom expert={experts[i]}/>
                </div>
            </div>
          </li>
        );     }
    }

    this.setState({
      expertsList:expertListElems,
    });
  };

  handleFilterChange=(event)=>{ // производится поиск експертов по имени, которое введет пользователь
    switch (event.target.name) {
      case 'findExpert':
        const newExperts = this.state.experts.filter(expert => {
            const name = expert.name.toLowerCase();
            return name.includes(event.target.value.toLowerCase());
        });

        this.displayExperts(newExperts);
        
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

  onExpertClick=()=>{
      console.log(this.expandIcon.classList);
      if(this.expandBlock.classList.contains('show')){
          this.expandBlock.classList.remove("show");
          this.expandIcon.classList.remove("hide");
      }else{
          this.expandBlock.classList.add("show");
          this.expandIcon.classList.add("hide");
      }
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
              <h2>{this.state.username}</h2>
            </NavLink>
          </div>
          <div>
            <NavLink to="/" className="signOutBtn">Sign out</NavLink>
          </div>
        </header>

        <div className="Home">
          <div className="home-content">
              <div className="home-top">
                  <div className="home-search d-flex justify-center">
                      <input type="search" name="findExpert" placeholder="Find an expert"
                             onChange={this.handleFilterChange} />
                      <NavLink to="/config_new_expert" className="addExpertBtn">NEW EXPERT</NavLink>
                  </div>

                  <div className="d-flex justify-center">
                    <h3>Your experts</h3>
                  </div>
              </div>

              <div className="home-body d-flex justify-center">
                <ul className="d-flex flex-column justify-start">
                  {this.state.expertsList}
                </ul>
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
    setUser: (user)=>{
      dispatch({type:'SET_USER',payload: user});
    }
  })
)(Home));
