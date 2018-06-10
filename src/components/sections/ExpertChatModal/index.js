import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {getToken} from "../../services/tokenService";
import './index.scss';

class ExpertChatModal extends React.Component {
	socket = {};
	constructor(props) {
	  super(props);
	  this.state = {
	    messages: [],
			message: ''
	  };

	  this.socket = new WebSocket('ws://localhost:5000');
		this.socket.onopen=()=>this.onStatus('ONLINE');
		this.socket.onclose=()=>this.onStatus('DISCONNECTED');
		this.socket.onmessage=response=>this.onMessage(response);
	}

	onStatus=(status)=>{
		console.log('WebSocket status: ',status);
	};
	onMessage=(response)=>{
		let data = JSON.parse(response.data);
		console.log('WebSocket onmessage: ',response.data);

		const messages = this.state.messages;
		messages.push(data.message);

		this.setState({messages});

	};

	componentDidMount(){

  }

	handleInputChange=(event)=>{
		this.setState({message: event.target.value});
  };

	onMessageSend=()=>{
		this.socket.send(JSON.stringify({
			message: this.input.value
		}));
		this.setState({message: this.input.value = ''});
  };

  render(){
    return (
      <div className={this.props.isOpen ? "ExpertChatModal modal fade show" : "ExpertChatModal modal fade"} ref={(elem)=>this.modal=elem}
           tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLongTitle" aria-hidden="true"
           onClick={()=>this.props.onClose()}>

        <div className="modal-dialog" role="document" onClick={(event)=>event.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Gimet Expert-bot</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.props.onClose()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

							<ul>
								{this.state.messages.map((msg, index)=>
									<li key={index} className="is-client">{msg}</li>
								)}
							</ul>

            </div>
            <div className="modal-footer">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Type a message"
											 ref={elem=>this.input=elem}/>
								<div className="input-group-append">
									<button className="btn btn-light" type="button" onClick={this.onMessageSend}><i className="ion-android-send"></i></button>
								</div>
							</div>
            </div>
          </div>
        </div>

      </div>

    );
  }

}


export default withRouter(ExpertChatModal);
