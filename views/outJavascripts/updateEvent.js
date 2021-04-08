// editing existing event
async function update(id){
    const eName = document.getElementById('eventName').value;
    const eType = document.getElementById('type').value;
    const imageurl = document.getElementById('image').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const ampm1 = document.getElementById('ampm1').value;
    const endTime = document.getElementById('endTime').value;
    const ampm2 = document.getElementById('ampm2').value;
    const description = document.getElementById('desc').value;
    const time = startTime+ampm1+"-"+endTime+ampm2;

    const data = {
        _id:id,
        name: eName,
        type: eType,
        description,
        eventDate: date,
        image: imageurl,
        eventTime: time,
    }

    const response = await fetch('http://localhost:8080/admin/catalog/update', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })

    const success = (await response.json()).success;
    if(success){
        alert('Update Successful!')
        window.location.href ='/admin/catalog'
    }
}

async function deleteEvent(id){
    if (confirm('Event Selected will be deleted!!')){
        const response = await fetch(`http://localhost:8080/admin/delete/${id}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
        })

        const success = (await response.json()).success;
        if(success){
            alert('Event Deleted')
            window.location.href ='/admin/catalog'
        }
    } else {
        return;
    }
    
}