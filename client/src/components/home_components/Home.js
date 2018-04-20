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
      user: ''
    };
  };

  async componentDidMount() {
      await this.fetchUser();
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
            <div className="experts-header d-flex justify-between align-items-center">

              <p id={experts[i]._id}>{experts[i].name}</p>

              <div className="d-flex justify-end align-items-center">

                <button className="expandBtn d-flex justify-center align-items-center"
                      id={experts[i]._id} onClick={()=>{this.onEditClick(experts[i]._id)}}>
                  <i className="material-icons">search</i>
                </button>
                <button className="expandBtn d-flex justify-center align-items-center"
                      id={experts[i]._id} onClick={()=>{this.onExpandClick(i)}}>
                  <i className={"material-icons d-flex justify-center "+i}
                     ref={elem=>this.expandIcon = elem}>
                      keyboard_arrow_down</i>
                </button>
                <button className="deleteBtn d-flex justify-center align-items-center"
                      id={experts[i]._id} onClick={(elem) => this.onDeleteExpertClick(experts[i])}>
                   <i className="material-icons">delete</i>
                </button>
            </div>
            </div>
            <div className="experts-body d-flex flex-column justify-center align-items-center">
                <div className={'expand-block '+i} ref={elem=>this.expandBlock = elem}>
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

  fetchUser = async () => {
      const user = await getUser('experts name', 'true');

      if (user) {
          this.props.setUser(user);
          this.displayExperts(user.experts);

          this.setState({
              user,
              experts: user.experts,
          });

      } else {
          this.props.history.push('/signin');
      }
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

  onDeleteExpertClick= async (expert) => { // процес удаления експерта при нажатии кнопки удаления в списке експертов.
      const userId = this.state.user._id;
      console.log(userId);
      const url = '/v1/expert/' + expert._id;
      console.log('expert: ', expert._id);

      const response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': getToken()
          }
      });

      if (response.status === 200) {
          alert("Expert has been deleted");
      }else {
          console.log('There has been a problem with fetch operation: ' + response);
          alert("Expert not found");
      }

      await this.fetchUser();
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

  onExpandClick=(index)=>{
    const expandBlock = document.getElementsByClassName('expand-block '+index)[0].classList;
    const expandIcon = document.getElementsByClassName('material-icons '+index)[0];

    if(expandBlock.contains(''+index) && expandBlock.contains('show')){
        expandBlock.remove("show");
        expandIcon.innerHTML = 'keyboard_arrow_down';
    }else if(expandBlock.contains(''+index) && !expandBlock.contains('show')){
        expandBlock.add("show");
        expandIcon.innerHTML = 'keyboard_arrow_up';
    }
  };

  onEditClick=(id)=>{
		this.props.history.push(`/edit/${id}`);
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
              <h2>{this.state.user.name}</h2>
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
