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
        console.log('here')
        console.log(response)
        // const data1 = response.json();
        // console.log(data1)
        // console.log('response:', response)
        // console.log('Success:', response.json());
    } catch (error) {
        console.log('catch')
        console.error(error);
    }
}