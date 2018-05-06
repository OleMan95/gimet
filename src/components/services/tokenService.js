/**
 * TOKENS:
 * aat - should be in every request to the back-end;
 * token - authorization token;
 *
 */
export function getToken(){
    // возвращает cookie с именем token, если есть, если нет, то undefined
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + 'token'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * @param emailValue - using for authorization if it needs
 * @param passwordValue - using for authorization if it needs
 * @returns if token exist in cookie - returns token, if not - undefined
 */
export async function signin(emailValue, passwordValue){
    const token = getToken();

    if(!token){
        let response = await fetch('/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        });
        let data = await response.json();

        if (data.data) {
            document.cookie = 'token='+data.data.token;
            return data.data.token;
        }else{
            console.log('There has been a problem with fetch operation: ' + response);
            return false;
        }
    }else{
        return token;
    }
}

/**
 * @param fields - using for designation fields that needs for selection
 * @param populate - indicates that you will receive a complete detailed field of experts
 * @returns user data
 */
export async function getUser(fields, populate){
    const token = getToken();

    if(token){
        console.log('fields: ',fields);
        const response = await fetch(`/v1/user?fields=${fields}&populate=${populate}`, {
            method: 'GET',
            headers: {
                'Authorization' : token
            }});

        let data = await response.json();
        console.log('data: ', data);

        if (data) return data;
        else {
            console.log('There has been a problem with fetch operation: ' + response);
            return false;
        }
    }
    return false;
}
