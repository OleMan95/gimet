import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import Breadcrumb from "../sections/Breadcrumb";
import MenuMore from "./MenuMore";
import './index.scss';

class QuestionsTableView extends React.Component{
  constructor(){
    super();
    this.state={
    };
  };

  render(){

    return (
      <div className="QuestionsTableView">
				<Breadcrumb view={'My Experts'}/>

				<div className="container">
					{this.props.experts.length>0 ?
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
                    <MenuMore key={question.key} expert={question}/>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
						:
						<h3 className={this.state.isLoading ? '' : ''}>No experts to edit. Please, select an expert first.</h3>
					}

				</div>

			</div>
    )};
}




export default withRouter(QuestionsTableView);
