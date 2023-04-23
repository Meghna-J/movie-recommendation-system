import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigation, useNavigate } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  let user = location.state;
  // console.log(user.loggedIn);

  const [movie, setMovie] = useState("");
  const [movielist, setMovielist] = useState([]);
  const navigate = useNavigate();

  axios.get('http://localhost:4000/home')
  .then((res)=>{
    console.log(res);
  })

  const logout = (ev)=>{
    ev.preventDefault();
    axios.post('http://localhost:4000/logout')
    .then((res)=>{
      console.log(res.data);
      if(res.data==='loggedOut'){
        navigate('/login');
      }
    })
  }

  const login = (ev)=>{
    ev.preventDefault();
    navigate('/login');
  }

  const submitFormHandler = (ev) => {
    ev.preventDefault();
    // console.log(movie);
    axios
      .post("http://localhost:4000/recommendation", { json: movie })
      .then((res) => {
        // console.log(res.data);
        // return res.json;
        setMovielist(res.data);
        navigate("/recommendation", { state:{arr: res.data,user:user }});
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div className="main-container">
        <nav className="navbar" style={{ marginTop: 20 }}>
          <div className="logo">
            <img
              className="netflix-logo"
              src="./logo.jpg"
              width="80px"
              height="70px"
            />
          </div>
          <div
            className="dropdown position-absolute top-1 end-0"
            style={{ marginTop: "-18px", marginRight: 180 }}
          >
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: "transparent" }}
            >
              English
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              style={{ width: 50 }}
            >
              <li>
                <a
                  className="dropdown-item active"
                  href="#"
                  style={{ height: 25, fontSize: "small" }}
                >
                  English
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  style={{ height: 25, fontSize: "small" }}
                >
                  Hindi
                </a>
              </li>
            </ul>
          </div>
          {user ? (
            <div>
              <div className="sign-in-button">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    width: 90,
                    marginTop: 75,
                    height: 38,
                    marginLeft: 25,
                    zIndex: 1,
                  }}
                  onClick={logout}
                >
                  Log Out
                </button>
              </div>
              <h>Welcome {user.id}</h>
            </div>
          ) : (
            <div className="sign-in-button">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  width: 90,
                  marginTop: 55,
                  height: 38,
                  marginLeft: 25,
                  zIndex: 1,
                }}
                onClick={login}
              >
                Log In
              </button>
            </div>
          )}
        </nav>
        {/* <h>Hello {location.state.id}</h> */}
        <div className="main-title-container position-absolute start-50">
          <div className="main-head">
            <h className="main-title">
              Unlimited movies, TV
              <br /> shows and more.
            </h>
          </div>
          <div className="main-title-desc">
            <div className="desc">Watch anywhere anytime.</div>
          </div>
          <p className="main-pitch">Search your favourite movies</p>
          <form
            // action="/recommendation"
            // method="POST"
            // onSubmit={handleSubmit}
            className="form"
            style={{ display: "flex", gap: 20 }}
          >
            <div
              className="form-group shadow-textarea"
              style={{ marginTop: 30, textAlign: "center", color: "white" }}
            >
              <input
                type="text"
                id="movie"
                name="movie"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                className="movie form-control"
                autoComplete="off"
                placeholder="Enter the Movie Name"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "black",
                  width: 530,
                  color: "#181818",
                  border: "1px solid black",
                  margin: "auto",
                }}
                required="required"
              />
              {/* <br> */}
            </div>
            <div
              className="form-group"
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
                className="btn btn-primary btn-block movie-button"
                style={{
                  // backgroundColor: "#e50914",
                  textAlign: "center",
                  borderColor: "black",
                  width: 120,
                  marginTop: 29,
                  height: "fit-content",
                }}
                onClick={submitFormHandler}
              >
                Search
              </button>
              <br />
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
