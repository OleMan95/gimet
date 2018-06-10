import WebSocket from 'ws';
import jwtService from '../services/jwt-service';

const socket = new WebSocket.Server({ port: 5000 });

const clients = [];

socket.on('connection', function connection(ws, req) {

	ws.on('message', async function incoming(message) {
		const data = JSON.parse(message);
		const token = getToken(req.headers.cookie);
		let id;

		if (token) {
			const payload = await jwtService.verify(token);
			id = payload._id;
		}
		console.log('message', data);

		if (data.isInitial) {
			socket.clients.forEach(function each(client) {
				if (client === ws && client.readyState === WebSocket.OPEN) {
					client.id = id;
				}
			});

			return;
		}

		sendMessage(id, {
			message: data.message,
			isClient: data.isClient
		});

		setTimeout(()=>{
			sendMessage(id, {
				message: 'echo: '+data.message,
				isClient: false
			});
		}, 3000);

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

function sendMessage(id, data) {

	socket.clients.forEach(function each(client) {
		if (client.id === id && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(data));
		}
	});
}