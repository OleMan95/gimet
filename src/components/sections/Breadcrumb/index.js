import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import "./index.scss";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
			<nav className="Breadcrumb d-flex">
				<ol className="breadcrumb">
					<li className="breadcrumb-item text-muted">Dashboard</li>
					<li className="breadcrumb-item text-muted">{this.props.view}</li>
				</ol>

				{this.props.view === 'My Experts' ?
					<NavLink to={'/edit-expert'} className="btn btn-link ml-auto mr-2"><i className="ion-plus-round"/></NavLink>
				:''}

				{this.props.view === 'Expert Edit' ?
					<button className="btn btn-link ml-auto mr-2" onClick={this.props.onAddClick}><i className="ion-plus-round"/></button>
				:''}

			</nav>
    );
  }
}

export default withRouter(Breadcrumb);
