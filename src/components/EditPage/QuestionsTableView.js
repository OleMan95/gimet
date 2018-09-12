import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import Breadcrumb from "../sections/Breadcrumb";
import ExpertSettingsModal from "../sections/ExpertSettingsModal";
import './index.scss';

class QuestionsTableView extends React.Component{
  constructor(){
    super();
    this.state={
      isModalSettingsOpen: false,
      expert: {
        questions: []
      }
    };
  };

  componentDidMount(){

    this.setState({
      expert: this.props.experts[0]
    });
  }

  onAddClick = () =>{
    this.setState({
      isModalSettingsOpen: true
    });
  };
  onModalSave = () => {
    //Todo: save expert edits (???)
    this.setState({
      isModalSettingsOpen: false
    });
  };
  onModalClose = () => {
    this.setState({
      isModalSettingsOpen: false
    });
  };

  render(){
    console.log('QuestionsTableView',this.props.experts);

    return (
      <div className="QuestionsTableView">
				<Breadcrumb view={'Expert Edit'} onAddClick={this.onAddClick}/>

				<div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="w-1" scope="col">#</th>
                <th className="w-50" scope="col">Question Keys</th>
                <th className="w-5" scope="col">Answers</th>
                <th className="w-5" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
            {this.props.experts[0].questions.map((question, index) =>
              <tr key={question.key}>
                <th scope="row">{index+1}</th>
                <td>{question.key}</td>
                <td>{question.answers.length}</td>
                <td className="d-flex text-nowrap">
                  <NavLink to={'/'} className="btn btn-link py-0" title="Edit expert"><i className="ion-compose"/></NavLink>
                  <button className="btn btn-link btn-link-danger py-0" onClick={()=>{}} title="Remove expert">
                    <i className="ion-trash-b"/></button>
                </td>
              </tr>
            )}
            </tbody>
        </table>
				</div>

        <ExpertSettingsModal isOpen={this.state.isModalSettingsOpen}
                             expert={this.props.experts[0]}
                             onModalClose={this.onModalClose}
                             onModalSave={this.onModalSave}/>
			</div>
    )};
}

export default withRouter(QuestionsTableView);