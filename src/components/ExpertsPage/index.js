import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';
import {getExperts} from '../services/api-helper';

import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
import PaginationHelper from '../sections/PaginationHelper/';

import './index.scss';

class Experts extends React.Component{
  constructor(){
    super();
    this.state={
      experts: [],
      count: 0,
      filterValue: '',
    };
  };

  async componentDidMount() {
		this.filterInput.value = '';
		await this.fetchExperts(0);
	};

  fetchExperts = async (skip, search) => {
    let data = await getExperts({sort: true, skip, search}, async err => {});
    let experts = data.experts.filter(expert => expert._id != null);

    experts.forEach((expert) => {
      expert.updatedAt = moment(expert.updatedAt).fromNow();
    });

    this.setState({
      experts,
      count: experts.length
    });
    return data.count;
  };

  handleFilterChange = async (event) => {
		if (event.target.name === 'find-expert') {
			this.setState({
				filterValue: event.target.value
			});
		}
	};
  handleFilterSubmit = async () => {
		if (this.state.filterValue.length>0 && this.state.filterValue.length<20) {
			await this.fetchExperts(0, this.state.filterValue);
		}
	};
  cancelFilter = async () => {
		await this.fetchExperts(0);

		this.setState({
			filterValue: ''
		});
		this.filterInput.value = '';
	};

  render(){

    return (
      <div className="Experts">
				<Header />
        <div className="section-1 d-flex">
          <div className="container d-flex">

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Let's search an expert" name="find-expert"
										 onChange={event=>this.handleFilterChange(event)} ref={elem=>this.filterInput=elem}/>
							<button className={this.state.filterValue.length>0?"btn btn-light cancel-btn":"btn btn-light cancel-btn d-none"}
											type="button" onClick={this.cancelFilter}>
								<i className="ion-close-circled"/>
							</button>
              <div className="input-group-append">
                <button className="btn btn-outline-light" type="button" onClick={this.handleFilterSubmit}>
                  <i className="ion-search"/>
                </button>
              </div>
            </div>

					</div>
        </div>
        <div className="section-2">
          <div className="container py-5">
            <ul className="list-group list-group-flush">
							{this.state.experts.length>0 ?
								this.state.experts.map(expert =>
									<li key={expert._id} className='list-group-item d-flex'>
										<p className='title'><b>{expert.name}</b></p>
										<p className='date'>{expert.updatedAt} <span className="mx-2">|</span>
											<i className="ion-eye mr-1"/>{expert.consultationCount || 0}</p>
										<p className='description'>{expert.description}</p>
										<div className='d-flex'>
											<NavLink className='consultation-btn btn btn-dark' to={'/consultation/'+expert._id}>Consultation</NavLink>
										</div>
									</li>
              	)
								:
								<div className="no-experts-found">
									<p className="m-0">No experts found</p>
								</div>
							}
            </ul>
          </div>
        </div>
        <PaginationHelper count={this.state.count} fetchExperts={this.fetchExperts}/>
        <Footer/>
      </div>
    )};
}




export default withRouter(Experts);
