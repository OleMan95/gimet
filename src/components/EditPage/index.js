import React from 'react';
import {NavLink, withRouter } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";

import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
import DashboardSidebar from '../sections/DashboardSidebar/';
import QuestionsTableView from './QuestionsTableView';
import './index.scss';

class Edit extends React.Component{
  constructor(){
    super();
    this.state={
      dashboardOptions: {
        isExpertEdit: true,
        editedExperts: []
      },
      experts:[]
    };
  };

  async componentWillMount() {

  };

  async componentDidMount() {

    this.setState({
      dashboardOptions: {
        isExpertEdit: true,
        editedExperts: this.props.store.expertEdit
      },
      experts: this.props.store.expertEdit
    });
  };


  render(){
    console.log('EditPage',this.props.store.expertEdit);
    return (
      <div className="Edit">
				<Header />
        <DashboardSidebar user={this.props.store.account} dashboardOptions={this.state.dashboardOptions}/>

				<div className="container">
          {this.state.experts.length>0 ?
            <QuestionsTableView experts={this.props.store.expertEdit}/>
            :
            ''
          }
				</div>

				<Footer/>
      </div>
    )};
}

export default withRouter(
  connect(state => ({
      store: state
    }),
    dispatch => ({
      addTodo: name => {
        dispatch({type: 'ADD_TODO', payload: name})
      }
    }))(Edit));