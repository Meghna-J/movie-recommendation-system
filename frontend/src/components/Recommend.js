import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigation, useNavigate } from "react-router-dom";

const Recommend = () => {

  const API_KEY = "api_key=3afc3d9c9bc6a9321feca626d548c13a";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL =
    BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const searchURL = BASE_URL + "/search/movie?" + API_KEY;

  const location = useLocation();
  // console.log(location.state);
  let arr = location.state.arr;
  let user = location.state.user;
  // console.log(arr);
  // const location = useLocation()
  const [movie1, setMovie] = useState("");
  const [movielist, setMovielist] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (ev) => {
    ev.preventDefault();
    // console.log(movie);
    axios
      .post("http://localhost:4000/recommendation", { json: movie1 })
      .then((res) => {
        // console.log(res.data);
        // return res.json;
        setMovielist(res.data);
        navigate("/recommendation", { state: {arr:res.data,user:user }});
      })
      .catch((err) => console.log(err));
  };

  const submitFormHandler = (ev) => {
    ev.preventDefault();
    console.log(ev.target.movie.value);
    let movie1 = ev.target.movie.value;
    axios
      .post("http://localhost:4000/recommendation", { json: movie1 })
      .then((res) => {
        console.log(res.data);
        // return res.json;
        setMovielist(res.data);
        navigate("/recommendation", { state: {arr:res.data,user:user }});
      })
      .catch((err) => console.log(err));
  };

  const submitFormTrailer = (ev) => {
    ev.preventDefault();
    console.log(ev.target.movie.value);
    let id = ev.target.movie.value;
    fetch(BASE_URL + '/movie/'+ id +'/videos?'+API_KEY)
    .then(res=>res.json())
    .then(videoData=>{
      console.log(videoData.results);
      videoData.results.push(arr[0].recommend_movie_name);
      navigate("/trailer",{state:{arr2:videoData.results,user:user}});
    })
    .catch((err)=>console.log(err));
  };

  const goBack = (ev)=>{
    ev.preventDefault();
    navigate("/home",{state:user});
  }

  return (
    <div style={{ backgroundColor: "black" }}>
      <div
        className="navbar"
        style={{ display: "flex", gap: 10, justifyContent: "flex-start" }}
      >
        <button
          class="btn btn-primary btn-block movie-button"
          style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
          onClick={goBack}
        >
          ⬅
        </button>
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
              value={movie1}
              onChange={(e) => setMovie(e.target.value)}
              className="movie form-control"
              autoComplete="off"
              placeholder="Enter the Movie Name"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#ffffff",
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
              onClick={submitHandler}
            >
              Search
            </button>
            <br />
            <br />
          </div>
        </form>
      </div>
      <div
        style={{
          backgroundImage:
            "url(" + "https://cdn.wallpapersafari.com/85/54/HbNMPp.png" + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          class="searched-movie"
          style={{
            display: "flex",
            marginTop: "5%",
            marginBottom: "5%",
            marginLeft: "10%",
            marginRight: "10%",
          }}
        >
          <div class="movie-poster">
            <img
              class="main-image"
              src={arr[0].recommended_movies_poster}
              alt="Card image cap"
              width="300px"
              height="400px"
              style={{ border: "1px solid white" }}
            />
          </div>
          <div class="about-movie" width="400px" style={{ marginLeft: 25 }}>
            <h2 width="20px" style={{ color: "white" }}>
              {arr[0].recommend_movie_name}
            </h2>
            <p style={{ fontStyle: "italic", color: "white" }}>
              {arr[0].tagline}
            </p>
            <p style={{ color: "white" }}>{arr[0].overview}</p>
            <p style={{ color: "white" }}>
              Tags:{arr[0].recommend_movie_genres}
            </p>
            <form onSubmit={submitFormTrailer}>
              <div
                class="form-group shadow-textarea"
                style={{ marginTop: 0, textAlign: "center", color: "white" }}
              >
                <input
                  type="hidden"
                  id="movie"
                  name="movie"
                  value={arr[0].recommend_movie_id}
                  // onChange={(e) => setMovie(movie.recommend_movie_name)}
                  className="movie form-control"
                  autoComplete="off"
                  placeholder="Enter the Movie Name"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "black",
                    width: 1,
                    color: "#181818",
                    border: "1px solid black",
                    margin: "auto",
                  }}
                  required="required"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-block movie-button"
                // onClick={window.scrollTo(0, 0)}
                style={{
                  // backgroundColor: "#e50914",
                  textAlign: "center",
                  borderColor: "black",
                  width: 120,
                  marginTop: 0,
                  marginLeft: 15,
                  height: "fit-content",
                }}
              >
                View Trailer
              </button>
            </form>
          </div>
        </div>
      </div>
      <h1>Recommendations</h1>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        {arr.map((movie) => (
          <div style={{ margin: 10 }}>
            <div class="card" style={{ width: 288, height: 520 }}>
              <img
                style={{ borderRadius: "2px" }}
                height="400px"
                src={movie.recommended_movies_poster}
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">{movie.recommend_movie_name}</h5>
              </div>
              <form onSubmit={submitFormHandler}>
                <div
                  class="form-group shadow-textarea"
                  style={{ marginTop: 0, textAlign: "center", color: "white" }}
                >
                  <input
                    type="hidden"
                    id="movie"
                    name="movie"
                    value={movie.recommend_movie_name}
                    // onChange={(e) => setMovie(movie.recommend_movie_name)}
                    className="movie form-control"
                    autoComplete="off"
                    placeholder="Enter the Movie Name"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "black",
                      width: 1,
                      color: "#181818",
                      border: "1px solid black",
                      margin: "auto",
                    }}
                    required="required"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary btn-block movie-button"
                  onClick={window.scrollTo(0, 0)}
                  style={{
                    // backgroundColor: "#e50914",
                    textAlign: "center",
                    borderColor: "black",
                    width: 120,
                    marginTop: -30,
                    marginLeft: 15,
                    height: "fit-content",
                  }}
                >
                  More info
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
