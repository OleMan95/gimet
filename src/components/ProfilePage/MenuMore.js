import React from 'react';
import {withRouter} from 'react-router-dom';

class MenuMore extends React.Component{
  constructor(){
    super();
    this.state={
			show: false
    };
  };

  async componentDidMount() {

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

  render(){

    return (
      <div className="MenuMore">

				<div className="dropdown dropleft" ref={elem=>{this.dropdown = elem}}>
					<button className="btn btn-light" onClick={this.toggleMenu}>
						<i className="ion-more"/>
					</button>
					<div className={this.state.show ? "dropdown-menu show" : "dropdown-menu"}>
						<button className="dropdown-item">{this.props.expert.published ? 'Unpublish' : 'Publish'}</button>
						<button className="dropdown-item">Copy link</button>
						<button className="dropdown-item">Export knowledge base</button>
						<button className="dropdown-item">Add contributor</button>
					</div>
				</div>

			</div>
    )};
}




export default withRouter(MenuMore);
