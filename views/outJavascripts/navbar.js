function logout(){
    localStorage.removeItem('token')
}
async function dashboard(){
    token = localStorage.getItem('token')
    await fetch('/user/dashboard',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(token),
    })
}