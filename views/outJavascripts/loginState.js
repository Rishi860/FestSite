// check wether user is logged in or not

// const token = localStorage.getItem('token');
// if (token){

// }
fetch(`/loginstate`, {
    method: 'GET',
    headers: {
      token: `${localStorage.getItem('token')}`,
    },
  })
    .then((res) => {
      // console.log('before json')
      // console.log(res)
      return res.json();
    })
    .then((res) => {
        console.log(res)
        if(res.login){
          console.log('in login')
          let logTrue = document.getElementById('logTrue');
          let logFalse = document.getElementById('logFalse');
          document.getElementById('loginurl').href = `/user/dashboard/${res.id}`;
          logFalse.style['display'] = 'none';
          logTrue.style.removeProperty('display');
        }
        if(res.role === 'admin'){
          console.log('in admin')
          let admin = document.getElementById('admin');
          admin.style.removeProperty('display');
        }
        // console.log(res)
    })
    .catch((err) => {
      console.log(err);
});
