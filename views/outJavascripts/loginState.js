// check wether user is logged in or not

fetch(`/loginstate`, {
    method: 'GET',
    headers: {
      token: `${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
        if(res.login){
          let logTrue = document.getElementById('logTrue');
          let logFalse = document.getElementById('logFalse');
          document.getElementById('loginurl').href = `/user/dashboard/${res.id}`;
          logFalse.style['display'] = 'none';
          logTrue.style.removeProperty('display');
        }
        if(res.role === 'admin'){
          let admin = document.getElementById('admin');
          admin.style.removeProperty('display');
        }
    })
    .catch((err) => {
      console.log(err);
});
