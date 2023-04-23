import React, { useState }  from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = (ev)=>{
    ev.preventDefault();
    axios
      .post("http://localhost:4000/signup", {
        email:email,
        password:password,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "exist") {
          alert("user already exist");
        } else if (res.data === "user created") {
          history("/login");
        }
      })
      .catch((e) => {
        // alert("wrong details");
        console.log(e);
      });
  }

  return (
    <div className="signup">
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Registered already ?{" "}
              <Link to="/login" className="link-primary">
                Log in
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
  )
}

export default Signup