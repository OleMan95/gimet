import React from 'react';
import {NavLink} from 'react-router-dom';
import {getExperts, getUserById} from '../services/api-helper';
import './index.scss';
import moment from "moment";

class Section3 extends React.Component { //все this.props мы получем как аргументы функции
	constructor() {
	  super();
	  this.state = {
			experts: []
	  };
	}

	async componentDidMount() {

		const {experts} = await getExperts({sort: true, published: false, populate: true, limit: 3}, err=>{
			console.log(err);
		});

		const expertsModified = [];
		for(let i=0; i<experts.length; i++){
      experts[i].updatedAt = moment(experts[i].updatedAt).fromNow();
			expertsModified.push(experts[i]);
		}

		this.setState({experts: expertsModified});
	}

  render(){
    return (
			<div className='section-3 py-5 px-3' id="section-3">
				<div className='container py-5 d-flex flex-column'>
					<h2 className="display-4 mb-4">Most viewed</h2>

					<div className='cards d-flex'>
						{this.state.experts.map(expert=>
							<div key={expert._id} className='expert-container'>
								<div className="expert-header">
									<div className="expert-author d-flex">
										<i className="ion-person"/>
										<h3><NavLink to={"/profile/"+expert.author._id}>{expert.author.name}</NavLink></h3>
									</div>
								</div>

								<div className="expert-body">
									<div className="expert-title">
										<h1><NavLink to={'/consultation/'+expert._id}>{expert.name}</NavLink></h1>
									</div>
									<div className="expert-summary">
										<p>{expert.description}</p>
										<hr className={expert.description.length > 200 ? '':'d-none'} />
									</div>
								</div>

								<div className="expert-footer">
									<ul>
										<li className="published-date">{expert.updatedAt}</li>
										{/*<li className="comments">*/}
											{/*<i className="ion-chatbox"/>*/}
											{/*<span className="numero">8</span>*/}
										{/*</li>*/}
										<li className="shares">
											<i className="ion-android-star"/>
											<span className="numero">{expert.consultationCount || 0}</span>
										</li>
									</ul>
								</div>
							</div>
						)}
					</div>

					<NavLink className='card-link btn btn-outline-dark mt-4 align-self-center' to={'/experts'}>View all</NavLink>
				</div>
			</div>
    );
  }

}


export default Section3;
