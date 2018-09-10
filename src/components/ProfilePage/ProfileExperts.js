import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';

import './index.scss';
import Breadcrumb from "../sections/Breadcrumb";
import MenuMore from "./MenuMore";

class ProfileExperts extends React.Component{
  constructor(){
    super();
    this.state={
    };
  };

  render(){

    return (
      <div className="ProfileExperts">
				<Breadcrumb view={'My Experts'}/>

				<div className="container">
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Title</th>
								<th scope="col">Questions</th>
								<th scope="col">Updated</th>
								<th scope="col">Published</th>
								<th scope="col">Views</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
						{this.props.experts.length>0 ?
							this.props.experts.map((expert, index) =>
								<tr key={expert._id}>
									<th scope="row">{index+1}</th>
									<td>{expert.name}</td>
									<td>{expert.questions.length}</td>
									<td>{expert.updatedAt}</td>
									<td>{expert.published ? 'true':'false'}</td>
									<td>{expert.consultationCount}</td>
									<td className="d-flex text-nowrap">
										<NavLink to={'/edit/'+expert._id} className="btn btn-link"><i className="ion-compose"/></NavLink>
										<button className="btn btn-link btn-link-danger" onClick={()=>this.props.showAlertModal(expert)}>
											<i className="ion-trash-b"/></button>
										<MenuMore key={expert._id} expert={expert}
															fireSuccessAlarm={this.props.fireSuccessAlarm}
															fireErrorAlarm={this.props.fireErrorAlarm} />
										{/*<button className="btn btn-link"><i className="ion-more"/></button>*/}
									</td>
								</tr>
							)
							:
							<tr>
								<th>1</th>
								<td>Error:</td>
								<td>No experts found</td>
								<td>Create first!</td>
							</tr>
						}
						</tbody>
					</table>
				</div>

			</div>
    )};
}




export default withRouter(ProfileExperts);
