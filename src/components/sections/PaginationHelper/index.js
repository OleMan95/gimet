import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink, withRouter} from 'react-router-dom';
import {getExperts} from "../../services/api-helper";
import './index.scss';

class PaginationHelper extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
      paginationItemOne: 1,
      paginationItemTwo: 2,
      paginationItemThree: 3,
      currentPage: 0,
	  };
	}

  setPage = async (pageNum) => {
    let skip = pageNum*7;

    await this.props.fetchExperts(skip)
      .then(count=>{
        this.setPageNumbers(pageNum+1);

        this.setState({
          currentPage: pageNum,
          maxItemsNumber: count
        });

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
  };

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
            <li className={this.state.currentPage+1 == this.state.paginationItemOne ? "page-item active" : "page-item"}>
              <button className="page-link" id="pagination-item-1"
                      onClick={()=>this.setPage(this.state.paginationItemOne-1)}>{this.state.paginationItemOne}</button>
            </li>
            <li className={this.state.currentPage+1 == this.state.paginationItemTwo ? "page-item active" : "page-item"}>
              <button className="page-link" id="pagination-item-2"
                      onClick={()=>this.setPage(this.state.paginationItemTwo-1)}>{this.state.paginationItemTwo}</button>
            </li>
            <li className={this.state.currentPage+1 == this.state.paginationItemThree ? "page-item active" : "page-item"}>
              <button className="page-link" id="pagination-item-3"
                      onClick={()=>this.setPage(this.state.paginationItemThree-1)}>{this.state.paginationItemThree}</button>
            </li>
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
