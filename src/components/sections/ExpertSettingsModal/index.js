import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { getUser } from '../../services/api-helper';
import './index.scss';

class ModalWindow extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    expert: {
	      name: '',
        description: ''
      },
      contributorNames:[],
	  };
	}

	componentDidMount(){
    this.setState({
      expert: this.props.expert
    });
  }

	handleInputChange=(e)=>{
    const expert = this.state.expert;
    switch (e.target.name) {
      case 'name':
				expert.name = e.target.value;
        this.setState({expert});
        break;
      case 'description':
				expert.description = e.target.value;
        this.setState({expert});
        break;
      default:
    }
  };

	onSave = () => {
	  if(this.state.expert.name.trim() === ''){
      //ToDo: make form validation
	    return;
    }
    if(this.state.expert.description.trim() === ''){
      //ToDo: make form validation
      return;
    }

    this.props.onModalSave(this.state.expert);
  };

  render(){
    return (
      <div className={this.props.isOpen ? "ExpertSettingsModal modal fade show" : "ExpertSettingsModal modal fade"}
           tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLongTitle" aria-hidden="true"
           onClick={()=>this.props.onModalClose()}>

        <div className="modal-dialog" role="document" onClick={(event)=>event.stopPropagation()}>
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Expert settings</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.props.onModalClose()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" name="name" defaultValue={this.props.expert.name}
                       placeholder="Enter expert name" onChange={event=>this.handleInputChange(event)}/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" name="description"
													value={this.props.expert.description} rows="3"
                          onChange={event=>this.handleInputChange(event)}/>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>this.props.onModalClose()}>Close</button>
              <button type="button" className="btn btn-primary" onClick={this.onSave}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

}


export default withRouter(ModalWindow);
