import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { getToken } from "../../services/tokenService";
import { getUserById } from "../../services/api-helper";
import "./index.scss";
import ExpertChatModal from '../../sections/ExpertChatModal';


class ExpertChatButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
			isExpertBotModalOpen: false
    };
  }

  async componentDidMount() {

		if (getToken('token')) {
			await getUserById(false, false, (data)=>{

				this.setState({
					isAuthorized: true,
					user: data
				});
			}, (data)=>{

			});

		}

	}

	handleClick=()=>{
	};

	toggleExpertChatModal=()=>{
		this.setState({
			isExpertBotModalOpen: !this.state.isExpertBotModalOpen
		});
	};

  render() {
    return (
			<div className="ExpertChatButton">

				<button className="btn btn-primary" onClick={this.toggleExpertChatModal}><i className="ion-chatboxes"></i></button>

				{this.state.isExpertBotModalOpen ?
					<ExpertChatModal isOpen={this.state.isExpertBotModalOpen}
										 onClose={this.toggleExpertChatModal}/>
					: ''}

 			</div>
    );
  }
}

export default withRouter(ExpertChatButton);
