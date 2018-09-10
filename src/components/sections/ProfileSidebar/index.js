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

  async componentDidMount() {

	}

	handleNavClick=(view)=>{
    this.props.toggleView(view);
  };

  render() {
    return (
      <div className="ProfileSidebar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className={this.props.activeView === 'profile' ? "nav-link btn btn-link active":"nav-link btn btn-link"}
                    onClick={()=>this.handleNavClick('profile')}>
              <i className="ion-person mr-3"/>
              <span className="hide-menu">Profile</span>
            </button>
          </li>
          <li className="nav-item">
            <button className={this.props.activeView === 'my_experts' ? "nav-link btn btn-link active":"nav-link btn btn-link"}
                    onClick={()=>this.handleNavClick('my_experts')}>
              <i className="ion-android-apps mr-3"/>
              <span className="hide-menu">My Experts</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(ProfileSidebar);
