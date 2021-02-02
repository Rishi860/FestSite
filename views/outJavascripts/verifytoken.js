// watching if the user is online or not
console.log('verify token in fo=rontend')
fetch(`${url}/auth/verifytoken`, {
    method: 'GET',
    headers: {
      token: `${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
        console.log(res)
      if (!res.success) {
        window.location.href = '/login.html';
      }
    })
    .catch((err) => {
      console.log(err);
});