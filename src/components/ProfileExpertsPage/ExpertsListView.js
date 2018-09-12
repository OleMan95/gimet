import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';

import './index.scss';
import Breadcrumb from "../sections/Breadcrumb";
import MenuMore from "../EditPage/MenuMore";

class ExpertsListView extends React.Component{
  constructor(){
    super();
    this.state={
    };
  };

  render(){

    return (
      <div className="ExpertsListView">
				<Breadcrumb view={'My Experts'}/>

				<div className="container">
					{this.props.experts.length > 0 ?
            <table className="table table-striped">
              <thead>
              <tr>
                <th className="w-1" scope="col">#</th>
                <th className="" scope="col">Title</th>
                <th className="w-5" scope="col">Questions</th>
                <th className="w-11" scope="col">Updated</th>
                <th className="w-5" scope="col">Published</th>
                <th className="w-5" scope="col">Views</th>
                <th className="w-5" scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              {this.props.experts.map((expert, index) =>
                <tr key={expert._id}>
                  <th scope="row">{index+1}</th>
                  <td>
                    <NavLink className="btn btn-link p-0" to={'/consultation/'+expert._id}>{expert.name}</NavLink>
                  </td>
                  <td>{expert.questions.length}</td>
                  <td>{expert.updated}</td>
                  <td>{expert.published ? 'true':'false'}</td>
                  <td>{expert.consultationCount ? expert.consultationCount : 0}</td>
                  <td className="d-flex text-nowrap">
                    <NavLink to={'/edit-expert/'} className="btn btn-link py-0" title="Edit expert"
                             onClick={()=>this.props.addExpertToEdit(expert)}>
                      <i className="ion-compose"/>
                    </NavLink>
                    <button className="btn btn-link btn-link-danger py-0" onClick={()=>this.props.showAlertModal(expert)} title="Remove expert">
                      <i className="ion-trash-b"/></button>
                    <MenuMore key={expert._id} expert={expert}
                              fireSuccessAlarm={this.props.fireSuccessAlarm}
                              fireErrorAlarm={this.props.fireErrorAlarm} />
                  </td>
                </tr>
              )}
              </tbody>
            </table>
						:
						<h3 className={this.state.isLoading ? '' : ''}>No experts found. Let's create first!</h3>
					}

				</div>

			</div>
    )};
}




export default withRouter(ExpertsListView);
