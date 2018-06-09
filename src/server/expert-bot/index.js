import WebSocket from 'ws';

const socket = new WebSocket.Server({ port: 5000 });

socket.on('connection', function connection(ws, req) {

	ws.on('message', function incoming(message) {
		// const ip = req.connection.remoteAddress;
		// const cookie = req.headers.cookie;
		// console.log('req: ', cookie);

		socket.clients.forEach((client)=>{
			if(client.readyState === WebSocket.OPEN){
				ws.send('echo: '+message);
			}
		});

	});


	ws.send('Hi, I am a Gimet expert-bot. Type "Help" if you need help.');

	ws.on('close', function close() {
		console.log('disconnected');
	});
});