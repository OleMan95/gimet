import React from 'react';
import {withRouter} from 'react-router-dom';
import {createOrUpdateExpert} from "../services/api-helper";

class MenuMore extends React.Component{
  constructor(){
    super();
    this.state={
			show: false
    };
  };

  toggleMenu = ()=>{
		if (!this.state.show)
			document.addEventListener('click', this.handleOutsideClick, false);
		else
			document.removeEventListener('click', this.handleOutsideClick, false);

		this.setState({show: !this.state.show});
	};
	handleOutsideClick = (e)=>{
		if (this.dropdown.contains(e.target)) return;
		this.toggleMenu();
	};

	handlePublishClick = async () => {
		let expert = this.props.expert;
		expert.published = !expert.published;

		await this.updateExpert(expert);

		this.toggleMenu()
	};


	updateExpert = async (expert) => {
		await createOrUpdateExpert(expert._id, expert,
			this.props.fireSuccessAlarm, this.props.fireErrorAlarm);
	};

  render(){
    return (
      <div className="MenuMore">

				<div className="dropdown dropleft" ref={elem=>{this.dropdown = elem}}>
					<button className="btn btn-light" onClick={this.toggleMenu}>
						<i className="ion-more"/>
					</button>
					<div className={this.state.show ? "dropdown-menu py-0 show" : "dropdown-menu py-0"}>

						<ul className="list-group">
							{this.props.expert.published ?
								<li className="list-group-item" onClick={this.handlePublishClick}>
									<span className="">
										<i className="ion-android-download"/>
										Unpublish
									</span>
								</li>
								:
								<li className="list-group-item" onClick={this.handlePublishClick}>
									<span className="">
										<i className="ion-android-upload"/>
										Publish
									</span>
								</li>
							}
							<li className="list-group-item disabled">
								<span className="">
									<i className="ion-link"/>
									Copy link
								</span>
							</li>
							<li className="list-group-item disabled">
								<span className="">
									<i className="ion-code-download"/>
									Export
								</span>
							</li>
							<li className="list-group-item disabled">
								<span className="">
									<i className="ion-person-add"/>
									Add contributor
								</span>
							</li>
						</ul>
					</div>
				</div>

			</div>
    )};
}




export default withRouter(MenuMore);
