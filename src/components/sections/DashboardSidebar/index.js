import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { getToken } from "../../services/tokenService";
import { getUserById } from "../../services/api-helper";
import logo from "../../../data/logo.svg";
import "./index.scss";

class ProfileSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }

  render() {
    return (
      <div className="ProfileSidebar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to={'/profile/'+this.props.user._id} className={this.props.dashboardOptions.isProfile === true ? "nav-link btn btn-link active":"nav-link btn btn-link"}>
              <i className="ion-person mr-3"/>
              <span className="hide-menu">Profile</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/profile-experts'} className={this.props.dashboardOptions.isProfileExperts === true ? "nav-link btn btn-link active":"nav-link btn btn-link"}>
              <i className="ion-android-apps mr-3"/>
              <span className="hide-menu">My Experts</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/edit-expert'} className={this.props.dashboardOptions.isExpertEdit === true ? "nav-link btn btn-link active":"nav-link btn btn-link"}>
              <i className="ion-compose mr-3"/>
              <span className="hide-menu">Expert Edit</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(ProfileSidebar);
