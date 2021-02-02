// Sending credentials to server
async function login(){
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email, password)

        const data = {
            email,
            password,
        }
        console.log('sadkfjbask;dbf')
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        const res = await response.json();
        if(res.success){
            localStorage.setItem('token',res.token)
            window.location.href = '/'
        }
    
    } catch (error) {
        console.log('catch')
        console.error(error);
    }
}