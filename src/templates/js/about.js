sendRequest = () => {
    let url = `http://${window.location.host}:8000`,
        msg = document.querySelector('.msg').value,
        name = document.querySelector('.name').value,
        email = document.querySelector('.email').value

    if (msg && name && email) {
        fetch(url + '?name=' + name + '&email=' + email + '&msg=' + msg)
            .then(function(value){
                if(value.status !== 200){
                    return Promise.reject(new Error('Error ' + value.status));
                }
                document.getElementById('contacts').remove()
            })
            .catch( (e) => {
                alert(e + ' please try again later...')
            })
    }
}