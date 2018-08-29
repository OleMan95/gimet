import React from 'react';
import moment from 'moment';
import {NavLink, withRouter} from 'react-router-dom';
import {getExperts} from '../services/api-helper';

import Header from '../sections/Header/';
import Footer from '../sections/Footer/';
import PaginationHelper from '../sections/PaginationHelper/';

import './index.scss';

const EXPERTS_PER_PAGE = 5;

class Experts extends React.Component{
  constructor(){
    super();
    this.state={
      experts: [],
      count: 0,
      filterValue: '',
			maxPagesNum: 0,
			pageItems: [],
			currentPage: 1,
    };
  };

  async componentDidMount() {
		this.filterInput.value = '';
		await this.fetchExperts(0);

		const maxPagesNum = Math.ceil(this.state.count/EXPERTS_PER_PAGE);

		let pageItems = [];

		for(let i=0; i<maxPagesNum; i++){
			pageItems.push(i);
		}

		this.setState({maxPagesNum, pageItems});
	};

  fetchExperts = async (skip, search) => {
    let data = await getExperts({sort: true, published: false, skip, search}, async err => {});
    let experts = data.experts.filter(expert => expert._id != null);

    experts.forEach((expert) => {
      expert.updatedAt = moment(expert.updatedAt).fromNow();
    });

		this.setState({
      experts,
      count: experts.length
    });
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

	setPage = async (nextPage) => {
		this.setState({
		  currentPage: nextPage
		});

		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};

  render(){
  	let pageItems = [];

		if(this.state.maxPagesNum === 2){
			pageItems = this.state.pageItems;
		}else if(this.state.currentPage === 1){
			pageItems = this.state.pageItems.slice(this.state.currentPage-1, this.state.currentPage+2);
		}else if(this.state.currentPage === this.state.maxPagesNum){
			pageItems = this.state.pageItems.slice(this.state.currentPage-3, this.state.currentPage);
		}else{
			pageItems = this.state.pageItems.slice(this.state.currentPage-2, this.state.currentPage+1);
		}

    return (
      <div className="Experts">
				<Header />

        <div className="section-1 d-flex">
          <div className="container d-flex">

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Expert Search" name="find-expert"
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
							{this.state.count>0 ?
								this.state.experts.slice(this.state.currentPage*EXPERTS_PER_PAGE - EXPERTS_PER_PAGE, this.state.currentPage*EXPERTS_PER_PAGE).map(expert =>
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

				{this.state.count > EXPERTS_PER_PAGE ?
					<div className="PaginationHelper">

						<nav aria-label="Page navigation">
							<ul className="pagination">

								<li className={this.state.currentPage === 1 ? "page-item disabled" : "page-item"}>
									<button className="page-link" aria-label="Previous"
													onClick={async ()=>{await this.setPage(--this.state.currentPage)}}>
										<i className="ion-chevron-left"/>
										<span className="sr-only">Previous</span>
									</button>
								</li>

								{pageItems.map(i=>
									<li key={"page-link"+(i+1)} className={this.state.currentPage === i+1 ? "page-item active" : "page-item"}>
										<button className="page-link" onClick={()=>this.setPage(i+1)}>
											{i+1}
										</button>
									</li>
								)}

								<li className={this.state.currentPage === this.state.maxPagesNum ? "page-item disabled" : "page-item"}>
									<button className="page-link" aria-label="Next"
													onClick={async ()=>{await this.setPage(++this.state.currentPage)}}>
										<i className="ion-chevron-right"/>
										<span className="sr-only">Next</span>
									</button>
								</li>

							</ul>
						</nav>

					</div>
					: ''}

				<div className="section-3">
					<div className="container px-5 py-5 d-flex justify-content-between">
						<div>
							<h2>Didn't find the right expert?</h2>
							<p>Begin creating your own expert</p>
						</div>

						<NavLink className="btn btn-dark" to={"/edit/new"}>
							<i className="ion-chevron-right"/>
						</NavLink>
					</div>
				</div>

				<Footer/>
      </div>
    )};
}




export default withRouter(Experts);
