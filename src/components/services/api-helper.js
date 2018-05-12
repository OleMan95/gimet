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


export async function getUserById (id, populate){
	try {
        let token = getToken();
        if(populate)
		{
            populate = populate ? '?populate=true' : '';
        }
        else{
        	populate = id ? '?id=true' : '';
        }


		let response = await fetch('/api/user/'+populate, {
			method: 'GET',
			credentials: 'include',
            headers: {
				'Content-Type': 'application/json',
				'Authorization': token
// 			}
		}});

		return await response.json();

	} catch (err) {
		console.error(err.message);
	}
}



