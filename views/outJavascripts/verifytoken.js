// watching if the user is online or not
console.log('verify token in fo=rontend')
fetch(`/auth/verifytoken`, {
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
        console.log('')
      if (!res.success) {
        window.location.href = '/auth/login';
      }
    })
    .catch((err) => {
      console.log(err);
});
