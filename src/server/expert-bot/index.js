import WebSocket from 'ws';
import jwtService from '../services/jwt-service';
import DialogHelper from './dialog-helper';

const socket = new WebSocket.Server({ port: 5000 });

socket.on('connection', function connection(ws, req) {

	ws.on('message', async function incoming(message) {
		const data = JSON.parse(message);
		const token = getToken(req.headers.cookie);
		let id;

		if (token) {
			const payload = await jwtService.verify(token);
			id = payload._id;
		}else{
			return;
		}

		if (data.isInitial) {
			socket.clients.forEach(client=>{
				if (client === ws && client.readyState === WebSocket.OPEN) {
					client.id = id;
					client.dialog = new DialogHelper(id);
					client.send(JSON.stringify({
						message: 'Hi, I am a Gimet expert-bot. Type "Help" if you need help.',
						isClient: false
					}));
				}else{
					ws.send(JSON.stringify({
						message: 'Oops, some error has happened. Try to reconnect.',
						isClient: false
					}));
				}
			});
		}else{
			socket.clients.forEach(client=>{
				if (client.id === id && client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify({
						message: data.message,
						isClient: data.isClient
					}));
					const send = (message)=>{
						client.send(JSON.stringify(message));
					};
					client.dialog.handleMessage({message: data.message}, send);
				}else{
					ws.send(JSON.stringify({
						message: 'Oops, some error has happened. Try to reconnect.',
						isClient: false
					}));
				}
			});
		}
	});

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