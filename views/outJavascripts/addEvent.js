// creating new event
// console.log('in add event file')
async function add(){
    // console.log('in event function')
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
        name: eName,
        type: eType,
        description,
        eventDate: date,
        image: imageurl,
        eventTime: time,
    }
    // console.log(data,time)

    const response = await fetch('http://localhost:8080/admin/catalog/create', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })

    console.log(response)
}