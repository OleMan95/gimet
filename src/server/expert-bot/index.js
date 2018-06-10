import WebSocket from 'ws';
import jwtService from '../services/jwt-service';

const socket = new WebSocket.Server({ port: 5000 });

const clients = [];

socket.on('connection', function connection(ws, req) {

	ws.on('message', function incoming(message) {
		const ip = req.connection.remoteAddress;
		const cookies = req.headers.cookie;

		socket.clients.forEach(async (client) => {
			if (client.readyState === WebSocket.OPEN) {

				console.log('message: ', message);

				try{
					const data = JSON.parse(message);
					const token = getToken(cookies);
					let id;

					if (token && data.isInitial) {
						const payload = await jwtService.verify(token);
						clients.push(payload._id);
						console.log('id: ', id);
					}



					ws.send(JSON.stringify({
						message: data.message,
						isClient: data.isClient
					}));

					setTimeout(()=>{
            ws.send(JSON.stringify({
              message: 'echo: '+data.message,
              isClient: false,
            }));
          }, 5000);

				}catch(err){
					console.error('err: ', err);
				}
			}
		});

	});


	ws.send(JSON.stringify({
		message: 'Hi, I am a Gimet expert-bot. Type "Help" if you need help.',
		isClient: false
	}));

	ws.on('close', function close() {
		console.log('disconnected');
	});
});

function getToken(cookies){
	const matches = cookies.match(new RegExp(
		"(?:^|; )" + 'at'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}