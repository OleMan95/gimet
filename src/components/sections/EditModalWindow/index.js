import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import './index.scss';

class EditModalWindow extends React.Component { //все this.props мы получем как аргументы функции
	constructor(props) {
	  super(props);
	  this.state = {
	    question: {
        question: '',
        key: '',
        answers: [],
        results: [],
      }
	  };
	}

	componentDidMount(){
	  if(this.props.question){
	    this.setState({
        question: this.props.question
      });
    }
  }

  addQuestion=()=>{
    const question = this.state.question;
    question.answers.push(this.answerValue.value);
    question.results.push({
      value: this.resultValue.value,
      type: this.resultType.value
    });

	  this.setState({question});

    this.answerValue.value = '';
    this.resultType.value = '';
    this.resultValue.value = '';
  };

	handleInputChange=(event)=>{
    const question = this.state.question;
    switch (event.target.name) {
      case 'question':
        question.question = event.target.value;
        this.setState({question});
        break;
      case 'key':
        question.key = event.target.value;
        this.setState({question});
        break;
      default:
    }
  };

  render(){
    return (
      <div className={this.props.isOpen ? "ModalWindow modal fade show" : "ModalWindow modal fade"} ref={(elem)=>this.modal=elem} id="exampleModalCenter"
           tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLongTitle" aria-hidden="true"
           onClick={()=>this.props.onModalClose(this.state.question)}>

        <div className="modal-dialog" role="document" onClick={(event)=>event.stopPropagation()}>
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{this.state.question.key}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.props.onModalClose(this.state.question)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Key</label>
                <input type="text" className="form-control" name="key" value={this.state.question.key}
                       placeholder="Enter question key" ref={elem=>this.keyValue=elem} onChange={(event=>this.handleInputChange(event))}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Question</label>
                <textarea className="form-control" name="question" value={this.state.question.question}
                          rows="3" ref={elem=>this.questionValue=elem}
                          onChange={(event=>this.handleInputChange(event))}></textarea>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="col-5">Answer</th>
                    <th scope="col" className="col-1">Type</th>
                    <th scope="col" className="col-6">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.question.answers.map((answer, index)=>
                    <tr key={answer}>
                      <td>{answer}</td>
                      <td>{this.state.question.results[`${index}`].type}</td>
                      <td>{this.state.question.results[`${index}`].value}</td>
                    </tr>
                  )}
                  <tr>
                    <td>
                      <input type="text" className="form-control" id=""
                             placeholder="Enter new answer" ref={elem=>this.answerValue=elem}/>
                    </td>
                    <td>
                      <select className="custom-select" defaultValue="initial" ref={elem=>this.resultType=elem}>
                        <option value="initial"></option>
                        <option value="key">Key</option>
                        <option value="text">Text</option>
                      </select>
                    </td>
                    <td>
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter result value"
                               aria-label="Enter result value"
                               aria-describedby="basic-addon2" ref={elem=>this.resultValue=elem}/>
                        <div className="input-group-append">
                          <button className="btn btn-outline-secondary" type="button" onClick={this.addQuestion}><i className="ion-plus-round"></i></button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>this.props.onModalClose(this.state.question)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>this.props.onModalSave(this.state.question)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

}


export default withRouter(EditModalWindow);
