import React from 'react';
import isodate from 'isodate';
import {NavLink, withRouter} from 'react-router-dom';
import {getExperts} from '../services/api-helper';

import Header from '../sections/Header/';

import './index.scss';

class Experts extends React.Component{
  constructor(){
    super();
    this.state={
      experts:[],
    };
  };

  async componentDidMount() {
    let experts = await getExperts('views', async err=>{});
    console.log(experts);
    experts = experts.filter(expert=>expert._id!=null);

    experts.forEach((expert)=>{
      let date = isodate(expert.updatedAt.toString());
      expert.updatedAt = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    });

		this.setState({experts});
  };

  // handleFilterChange=(event)=>{ // производится поиск експертов по имени, которое введет пользователь
  //   switch (event.target.name) {
  //     case 'findExpert':
  //       const newExperts = this.state.experts.filter(expert => {
  //           const name = expert.name.toLowerCase();
  //           return name.includes(event.target.value.toLowerCase());
  //       });
  //
  //       this.displayExperts(newExperts);
  //
  //       break;
  //     default:
  //   }
  // };

  // onDeleteExpertClick= async (expert) => { // процес удаления експерта при нажатии кнопки удаления в списке експертов.
  //     const userId = this.state.user._id;
  //     console.log(userId);
  //     const url = '/v1/expert/' + expert._id;
  //     console.log('expert: ', expert._id);
  //
  //     const response = await fetch(url, {
  //         method: 'DELETE',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': getToken()
  //         }
  //     });
  //
  //     if (response.status === 200) {
  //         alert("Expert has deleted");
  //     }else {
  //         console.log('There was a problem with fetch operation: ' + response);
  //         alert("Expert not found");
  //     }
  //
  //     await this.fetchUser();
  // };

  render(){

    return (
      <div className="Experts">
				<Header />
        <div className="section-1 d-flex">
          <div className="container d-flex">

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Let's search an expert" aria-label="Recipient's username" aria-describedby="button-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-outline-light" type="button" id="button-addon2"><i className="ion-search"/></button>
              </div>
            </div>

					</div>
        </div>
        <div className="section-2">
          <div className="container py-5">
            <ul className="list-group list-group-flush">
							{this.state.experts.map(expert =>
                <li key={expert._id} className='list-group-item d-flex'>
                  <p className='title'><b>{expert.name}</b></p>
									<p className='date'>updated at: {expert.updatedAt} <span className="mx-2">|</span>
                    <i className="ion-eye mr-1"/>{expert.consultationCount || 0}</p>
                  <p className='description'>{expert.description}</p>
									<div className='d-flex'>
										<NavLink className='consultation-btn btn btn-dark' to={'/consultation/'+expert._id}>Consultation</NavLink>
									</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )};
}




export default withRouter(Experts);
