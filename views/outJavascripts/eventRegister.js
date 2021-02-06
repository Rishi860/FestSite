// for registering an event

async function register(id){
    console.log(id)
    const token = localStorage.getItem('token')
    if (!token){
        alert('Please login before registering in any event!')
    } else {
        const response = await fetch(`/user/register/${id}`,{
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                token,
            },
        })
        if (response.ok) alert('Registraion successful')
        else alert('Registraion failed')
    }
}

// For de-registering an event

async function deregister(eventId, userId){
    let response = await fetch(`/admin/deregister/${eventId}`,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            userId,
        },
    })
    response  = await response.json();
    if (response.ok) alert(`${response.message}`)
    else alert(`${response.message}`)
    window.location.reload();
}