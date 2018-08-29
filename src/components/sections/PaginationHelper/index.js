import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink, withRouter} from 'react-router-dom';
import {getExperts} from "../../services/api-helper";
import './index.scss';

class PaginationHelper extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
			maxPagesNum: 0,
			items: [],
      currentPage: 0,
	  };
	}

	componentDidMount(){

	}



	setPageNumbers = (pageNum)=>{
	  if(pageNum > this.state.paginationItemThree){
      this.setState({
        paginationItemOne: ++this.state.paginationItemOne,
        paginationItemTwo: ++this.state.paginationItemTwo,
        paginationItemThree: ++this.state.paginationItemThree,
      });
    }else if(pageNum < this.state.paginationItemOne){
      this.setState({
        paginationItemOne: --this.state.paginationItemOne,
        paginationItemTwo: --this.state.paginationItemTwo,
        paginationItemThree: --this.state.paginationItemThree,
      });
    }
  };

  render(){
    return (
      <div className="PaginationHelper">

        <nav aria-label="Page navigation">
          <ul className="pagination">

						<li className={this.state.currentPage == 0 ? "page-item disabled" : "page-item"}>
							<button className="page-link" aria-label="Previous"
											onClick={async ()=>{await this.setPage(--this.state.currentPage)}}>
								<i className="ion-chevron-left"/>
								<span className="sr-only">Previous</span>
							</button>
						</li>

						{this.state.items}

						<li className={this.props.count < 7 ? "page-item disabled" : "page-item"}>
							<button className="page-link" aria-label="Next"
											onClick={async ()=>{await this.setPage(++this.state.currentPage)}}>
								<i className="ion-chevron-right"/>
								<span className="sr-only">Next</span>
							</button>
						</li>

          </ul>
        </nav>

      </div>
    );
  }
}


export default withRouter(PaginationHelper);
