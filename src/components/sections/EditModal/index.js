import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import './index.scss';

class EditModal extends React.Component {
	constructor(){
		super();
		this.state = {
			question: '',
			key: '',
			answers: [],
			results: [],
            edited: false
		};
	}


	componentDidMount(){
	  if(this.props.question){
	    this.setState({
				question: this.props.question.question,
				key: this.props.question.key,
				answers: [...this.props.question.answers],
				results: [...this.props.question.results],
	    });
	  }
    }

  addAnswer=async()=>{

      this.setState({edited:this.state.edited = true});

      if ((this.answerValue.value.trim().length > 0 ||
				this.resultValue.value.trim().length > 0) &&
			this.resultType.value == 'initial') {
			return;
		}

		await this.setState({
			answers: [...this.state.answers, this.answerValue.value],
			results: [...this.state.results, {
				value: this.resultValue.value,
				type: this.resultType.value
			}]
		});

		this.answerValue.value = '';
		this.resultValue.value = '';
		this.resultType.value = '';
	};

	removeAnswer=(answer)=>{

    const answers = this.state.answers;
    const results = this.state.results;
    this.setState({edited:this.state.edited = true});


        for(let i=0; i<answers.length; i++){
    	if(answers[i]==answer){
				answers.splice(i, 1);
				results.splice(i, 1);
			}
		}

	  this.setState({answers, results});
  };

	handleInputChange=(event)=>{
        this.setState({edited:this.state.edited = true});

        switch (event.target.name) {
      case 'question':
        this.setState({question: event.target.value});
        break;
      case 'key':
        this.setState({key: event.target.value});
        break;
      case 'answerValue':
        this.setState({answerValue: event.target.value});
        break;
      case 'resultValue':
        this.setState({resultValue: event.target.value});
        break;
      case 'resultType':
        this.setState({resultType: event.target.value});
        break;
      default:
    }
  };

	onSave=()=>{
		let err = false;
	  let isNew = false;
        if(!this.questionValue.value.trim().length>0 ||
      !this.keyValue.value.trim().length>0){
			err = 'You are have unsaved changes!';
    }

    if((this.answerValue.value.trim().length>0 ||
			this.resultValue.value.trim().length>0) &&
			this.resultType.value == 'initial'){
			err = 'You are have unsaved changes!';
		}

		if(!this.props.question){
			isNew = true;
		}

		const question = {
			question: this.state.question,
			key: this.state.key,
			answers: this.state.answers,
			results: this.state.results,
		};

		this.props.onModalSave(question, isNew, err);
  };

	onClose=()=>{
		this.props.onModalClose();
		console.log(this.state.edited);
        console.log(this.state);

  };

  render(){
    return (
      <div className={"EditModal modal fade show"} ref={(elem)=>this.modal=elem}
           tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLongTitle" aria-hidden="true"
           onClick={this.onClose}>

        <div className="modal-dialog" role="document" onClick={(event)=>event.stopPropagation()}>
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{this.state.key}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Key</label>
                <input type="text" className="form-control" name="key" value={this.state.key}
                       placeholder="Enter question key" ref={elem=>this.keyValue=elem} onChange={(event=>this.handleInputChange(event))}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Question</label>
                <textarea className="form-control" name="question" value={this.state.question}
                          rows="3" ref={elem=>this.questionValue=elem}
                          onChange={(event=>this.handleInputChange(event))}></textarea>
              </div>

              <table className="table">
                <thead>
                  <tr className="row">
                    <th scope="col" className="col-5">Answer</th>
                    <th scope="col" className="col-1">Type</th>
                    <th scope="col" className="col-6">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.answers.map((answer, index)=>
                    <tr key={answer} className="row">
                      <td className="col-5">{answer}</td>
                      <td className="col-1">{this.state.results[`${index}`].type}</td>
                      <td className="col-6 d-flex justify-content-between">
												<p>{this.state.results[`${index}`].value}</p>
												<button className="btn btn-light" type="button" onClick={()=>this.removeAnswer(answer)}>
													<i className="ion-close-round"></i>
												</button>
											</td>
                    </tr>
                  )}
                  <tr className="row">
                    <td className="col-5">
                      <input type="text" className="form-control" placeholder="Enter new answer"
														 ref={elem=>this.answerValue=elem}/>
                    </td>
                    <td className="col-1">
                      <select className="custom-select" defaultValue="initial" ref={elem=>this.resultType=elem}>
                        <option value="initial"></option>
                        <option value="key">Key</option>
                        <option value="text">Text</option>
                      </select>
                    </td>
                    <td className="col-6">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter result value"
                               aria-label="Enter result value"
                               aria-describedby="basic-addon2" ref={elem=>this.resultValue=elem}/>
                        <div className="input-group-append">
                          <button className="btn btn-outline-secondary" type="button" onClick={this.addAnswer}>
														<i className="ion-plus-round"></i>
													</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={this.onSave}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

}


export default withRouter(EditModal);
