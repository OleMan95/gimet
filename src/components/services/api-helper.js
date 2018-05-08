import {getToken} from './tokenService';

export async function login (email, password){
	const token = getToken();

	try {
		if (!token) {
			let response = await fetch('/api/login', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			});
			const data = await response.json();

			if (data.token) {
				document.cookie = 'at=' + data.token;
			}

			return data;
		} else return token;

	} catch (err) {
		console.error(err.message);
	}
}

export async function getUserByToken (populate){
	try {
		let token = getToken();
		populate = populate ? '?populate=true' : '';

		let response = await fetch('/api/user'+populate, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		});

		return await response.json();

	} catch (err) {
		console.error(err.message);
	}
}
export async function getUserById (id, populate){
	try {
		populate = populate ? '?populate=true' : '';

		let response = await fetch('/api/user/'+id+populate, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return await response.json();

	} catch (err) {
		console.error(err.message);
	}
}



