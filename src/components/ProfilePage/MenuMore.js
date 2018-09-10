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
  handleCopyLink = () => {
		let expert = this.props.expert;

		const a = document.createElement('a');
		a.href = window.location;

		alert(a.origin+'/consultation/'+expert._id);
		this.toggleMenu()
	};
  handleExport = () => {
		let expert = this.props.expert;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(expert));

    this.exportLink.setAttribute("href", dataStr);
    this.exportLink.setAttribute("download", expert.name+".json");
		this.exportLink.click();

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
					<button className="btn btn-link py-1 px-2" onClick={this.toggleMenu}>
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
							<li className="list-group-item" onClick={this.handleCopyLink}>
								<span className="">
									<i className="ion-link"/>
									Copy link
								</span>
							</li>
							<li className="list-group-item" onClick={this.handleExport}>
								<span className="">
									<i className="ion-code-download"/>
									Export
									<a className="d-none" href="" ref={elem=>this.exportLink = elem}/>
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
