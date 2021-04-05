// creating new event
async function add(){
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

    if(ampm1 === ampm2){
        if(startTime-endTime>=0){
            alert('Insert Correct Time')
            return;
        }
    }
    

    const data = {
        name: eName,
        type: eType,
        description,
        eventDate: date,
        image: imageurl,
        eventTime: time,
    }

    let response = await fetch('http://localhost:8080/admin/catalog/create', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    response = await response.json();
    if (response.success){
        window.location.href='/admin/catalog'
    } 
    if (!(response.success)){
        alert('Username Alerday Exist')
    }
}