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

			return await response.json();
		} else return token;

	} catch (err) {
		console.error(err.message);
	}
}

export async function getUserById (id, populate, onSuccess, onError){
	try {
		let token = getToken();
		populate = populate ? '?populate=true' : '';
		id = id ? '/'+id : '';

		let response = await fetch('/api/user'+id+populate, {
			method: 'GET',
			credentials: 'include',
            headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		});

		if(response.status == 200) onSuccess(await response.json());
		else onError(response);

	} catch (err) {
		console.error(err.message);
	}
}

export async function getExpertById (id, onSuccess, onError){
	try {
		let token = getToken();

		if (id == 'new') return false;

		let response = await fetch('/api/expert/' + id, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		});

		if (response.status == 200) onSuccess(await response.json());
		else onError(await response.json());
	}catch (err) {
		console.error(err.message);
	}
}