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

	componentDidMount(){
	}

	onStatus=(status)=>{
	  if('ONLINE'){
      this.socket.send(JSON.stringify({
        isClient: true,
        isInitial: true
      }));
    }
		console.log('WebSocket status: ',status);
	};

	onMessage=(response)=>{
		let data = JSON.parse(response.data);
		console.log('WebSocket onmessage: ', data);

		const messages = this.state.messages;
		messages.push(data);
		this.setState({messages});

		this.messagesListElem.scrollTop = this.messagesListElem.scrollHeight;
	};

  onClose=()=>{
    this.socket.close();
    this.props.onClose();
  };

	onMessageSend=()=>{
		this.socket.send(JSON.stringify({
			message: this.input.value,
			isClient: true
		}));
		this.setState({message: this.input.value = ''});
  };
  onInputKeyDown=(event)=>{
  	if(event.keyCode == '13'){
      this.onMessageSend();
		}
	};

  render(){
    return (
      <div className={this.props.isOpen ? "ExpertChatModal modal fade show" : "ExpertChatModal modal fade"} ref={(elem)=>this.modal=elem}
           tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLongTitle" aria-hidden="true"
           onClick={()=>this.onClose()}>

        <div className="modal-dialog" role="document" onClick={(event)=>event.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Gimet Expert-bot</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.onClose()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" ref={elem=>this.messagesListElem=elem} onScroll={(e)=>{e.preventDefault()}}>

							<ul className="">
								{this.state.messages.map((msg, index)=>
									<li key={index} className={msg.isClient ? "is-client" : ""}>{msg.message}</li>
								)}
							</ul>

            </div>
            <div className="modal-footer">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Type a message"
											 ref={elem=>this.input=elem} onKeyDown={event=>this.onInputKeyDown(event)}/>
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
