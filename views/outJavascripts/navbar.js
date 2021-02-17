function logout(){
    localStorage.removeItem('token')
    console.log('removed')
}
console.log('ia')
async function dashboard(){
    token = localStorage.getItem('token')
    console.log('in navbar.js')
    await fetch('/user/dashboard',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(token),
    })
}