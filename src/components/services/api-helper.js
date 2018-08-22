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

export async function getUserById ({id, populate, token}, onSuccess, onError){
	try {
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
		else onError(await response.json());

	} catch (err) {
		console.error(err.message);
	}
}

export async function getExperts (filter, onError){
	try {
		let filterParam = filter ? `?filter=${filter}` : '';

		let response = await fetch(`/api/experts${filterParam}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status != 200) onError(await response.json());
		return await response.json();
	}catch (err) {
		console.error(err.message);
	}
}

export async function increaseConsultationCount (id){
	try {
		console.log('increaseConsultationCount');

		let token = getToken();

		let response = await fetch(`/api/expert/${id}/count`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		});

		if (response.status != 200)
			return response;

		return await response.json();
	}catch (err) {
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

export async function createOrUpdateExpert (id, body, onSuccess, onError){
	try {
		let token = getToken();
		let response = '';

		if (id){
			response = await fetch('/api/expert/' + id, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				body: JSON.stringify(body)
			});
		}else{
			response = await fetch('/api/experts', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				body: JSON.stringify(body)
			});
		}

		if (response.status == 200) onSuccess(await response.json());
		else onError(await response.json());

	}catch (err) {
		console.error(err);
	}
}

export async function signUp (data){
	try {
		let response = await fetch('/api/signup', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		return response.status == 200;

	} catch (err) {
		console.error(err.message);
	}
}

export async function sendMail (data){
	try {
		if(!data.email || !data.message || !data.subject)
			return {error: {message:'Wrong data'}};

		return await fetch('/api/mail', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

	} catch (err) {
		console.error(err.message);
	}
}