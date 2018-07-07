import React from 'react';
import {NavLink} from 'react-router-dom';
import {getExperts, getUserById} from '../services/api-helper';
import './index.scss';
import isodate from "isodate";

class Section3 extends React.Component { //все this.props мы получем как аргументы функции
	constructor() {
	  super();
	  this.state = {
			experts: []
	  };
	}

	async componentDidMount() {

		const data = await getExperts(err=>{
			console.log(err);
		});

		const experts = [];
		for(let i=0; i<3; i++){
			let date = isodate(data[i].createdAt.toString());
			data[i].createdAt = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

			await getUserById({id: data[i].author}, res=>{
				data[i].author = res.data.name;
			}, async (err) => {
					console.log('err: ', err);
			});

			experts.push(data[i]);
		}

		this.setState({experts});
	}

  render(){
    return (
			<div className='section-3 py-5 px-3' id="section-3">
				<div className='container py-5 d-flex flex-column'>
					<h2 className="display-4 mb-4">Most viewed</h2>

					<div className='cards row'>
						{this.state.experts.map(expert=>
							<div key={expert._id} className='card'>
								<div className="card-body">
									<h5 className="card-title font-weight-bold">{expert.name}</h5>
									<div className="d-flex justify-content-between">
										<h6 className="card-subtitle mb-2 text-muted">{expert.author}</h6>
										<h6 className="card-subtitle mb-2 text-muted">{expert.createdAt}</h6>
									</div>
									<p className='card-text description'>{expert.description}</p>
									<NavLink className='card-link btn btn-dark' to={'/consultation/'+expert._id}>Consultation</NavLink>
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
