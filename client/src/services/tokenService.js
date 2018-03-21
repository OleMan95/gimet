
export function getToken(){
    // возвращает cookie с именем token, если есть, если нет, то undefined
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + 'token'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function signin(emailValue, passwordValue){
    const token = getToken();
    let result;

    if(!token){
        fetch('/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        }).then((response) => {
            response.json().then(async function (data) {
                console.log('data: ', data);

                if (data.data) {
                    document.cookie = 'token='+data.data.token;
                    result = data.data.token;
                }
            });
            return response;
        }).catch(function(error) {
            console.log('There has been a problem with fetch operation: ' + error.message);
        });
    }else{
        result = token;
    }

    return result;
}

export async function getUser(fields, populate){
    const token = getToken();

    return new Promise(function(resolve, reject) {
        // Эта функция будет вызвана автоматически

        // В ней можно делать любые асинхронные операции,
        // А когда они завершатся — нужно вызвать одно из:
        // resolve(результат) при успешном выполнении
        // reject(ошибка) при ошибке

        if(token){
            console.log('fields: ',fields);

            fetch(`/v1/user?fields=${fields}&populate=${populate}`, {
                method: 'GET',
                headers: {
                    'Authorization' : token
                }})
                .then((response) => {
                    response.json().then(async function (data) {
                        console.log('data 1111: ', data);

                        if (data) {
                            resolve(data);
                        }
                    });
                    return response;
                }).catch(function(error) {
                    reject(false);
                    console.log('There has been a problem with fetch operation: ' + error.message);
                });
        }
    });
}
