import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { getUserById } from '../../services/api-helper';
import './index.scss';

class ModalWindow extends React.Component { //все this.props мы получем как аргументы функции
	constructor(props) {
	  super(props);
	  this.state = {
	    expert: {
	      name: '',
        description: '',
        contributors: [],
      },
      contributorNames:[],
	  };
	}

	componentDidMount(){
    if(this.props.expert){
      const contributorNames = [];
			this.props.expert.contributors.forEach(async contributor => {
				contributorNames.push(await this.getContributorName(contributor));
			});

      this.setState({
        expert: this.props.expert,
				contributorNames
      });
    }
  }

  getContributorName = async (id) => {
	  let name = '';
		await getUserById(id, false, data=>{
			name = data.name;
    });
		return name;
	};

	handleInputChange=(event)=>{
    const expert = this.state.expert;
    switch (event.target.name) {
      case 'expertName':
				expert.name = event.target.value;
        this.setState({expert});
        break;
      case 'description':
				expert.description = event.target.value;
        this.setState({expert});
        break;
      default:
    }
  };

  render(){
    return (
      <div className={this.props.isOpen ? "ExpertSettingsModal modal fade show" : "ExpertSettingsModal modal fade"}
           tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLongTitle" aria-hidden="true"
           onClick={()=>this.props.onModalClose(this.state.expert)}>

        <div className="modal-dialog" role="document" onClick={(event)=>event.stopPropagation()}>
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Expert settings</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.props.onModalClose(this.state.expert)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Name</label>
                <input type="text" className="form-control" name="expertName" value={this.props.expert.name}
                       placeholder="Enter expert name" ref={elem=>this.nameValue=elem} onChange={(event=>this.handleInputChange(event))}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Description</label>
                <textarea className="form-control" name="description" value={this.props.expert.description}
                          rows="3" ref={elem=>this.descriptionValue=elem}
                          onChange={(event=>this.handleInputChange(event))}/>
              </div>
							{/*<div className="form-group">*/}
								{/*<label htmlFor="exampleFormControlInput1">Contributors</label>*/}
								{/*<input type="text" className="form-control" name="expertContributors" value={this.props.expert.contributors}*/}
											 {/*placeholder="Contributors" ref={elem=>this.nameValue=elem} onChange={(event=>this.handleInputChange(event))}/>*/}
							{/*</div>*/}

							{/*<ul className="list-group">*/}
								{/*{this.state.contributorNames.map((contributor, index)=>*/}
									{/*<li className="list-group-item">*/}
                    {/*<p>{contributor}</p>*/}
                    {/*<button className="btn close" aria-label="Close"><span aria-hidden="true">&times;</span></button>*/}
                  {/*</li>*/}
								{/*)}*/}
							{/*</ul>*/}


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>this.props.onModalClose(this.state.expert)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>this.props.onModalSave(this.state.expert)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

}


export default withRouter(ModalWindow);
