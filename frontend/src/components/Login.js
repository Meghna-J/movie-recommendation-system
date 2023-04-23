// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate, Link } from 'react-router-dom'

// function Login() {

//     const history = useNavigate();

//     const [email,setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     async function submit(e){
//         e.preventDefault();
//         try{
//             await axios.post("http://localhost:4000/login",{
//                 email,password
//             })
//             .then(res=>{
//                 if(res.data === "exist" ){
//                     history('/home',{state:{id:email}});
//                 }
//                 else if(res.data === "notexist" ){
//                     alert('Sign up first');
//                 }
//             })
//             .catch(e=>{
//                 alert('wrong details');
//                 console.log(e)
//             })
//         }
//         catch(e){
//             console.log(e);
//         }
//     }

//   return (
// <div className='login'>
//     <div className="Auth-form-container">
//     <form className="Auth-form" action="POST">
//       <div className="Auth-form-content">
//         <h3 className="Auth-form-title">Sign In</h3>
//         <div className="text-center">
//           Not registered yet?{" "}
//           <Link to="/signup" className="link-primary">
//             Sign Up
//           </Link>
//         </div>
//         <div className="form-group mt-3">
//           <label>Email address</label>
//           <input
//             type="email"
//             onChange={(e)=>{setEmail(e.target.value)}}
//             name = "email"
//             className="form-control mt-1"
//             placeholder="Enter email"
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label>Password</label>
//           <input
//             type="password"
//             onChange={(e)=>{setPassword(e.target.value)}}
//             name = "password"
//             className="form-control mt-1"
//             placeholder="Enter password"
//           />
//         </div>
//         <div className="d-grid gap-2 mt-3">
//           <button type="submit" className="btn btn-primary" onClick={submit}>
//             Submit
//           </button>
//         </div>
//         <p className="text-center mt-2">
//           Forgot <a href="#">password?</a>
//         </p>
//       </div>
//     </form>
//   </div>
// </div>
//   )
// }

// export default Login

import React, { useState }  from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e)=>{
    e.preventDefault();
      axios
        .post("http://localhost:4000/login", {
          email:email,
          password:password,
        })
        .then((res) => {
          console.log(res);
          if (res.data === "correct") {
            history("/home", { state: { id: email, loggedIn: true } });
          } else if (res.data === "notexist") {
            alert("Sign up first");
            history("/signup", { state: { loggedIn: false } });
          }
          else if(res.data=='wrong'){
            history("/login", { state: { loggedIn: false } });
            alert('wrong details');
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
  }
  return (
    <div className="login">
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <Link to="/signup" className="link-primary">
                Sign Up
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submit}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
