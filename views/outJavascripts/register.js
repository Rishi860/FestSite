// Sending credentials to server
function register(){
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    console.log(email, password)
    if(password === confirmPassword){
        const data = {
            name: username,
            email: email,
            password: password
        }
        fetch('http://localhost:8080/auth/register', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    } else {
        alert(`Passwords doesn't match!!`)
    }    
}