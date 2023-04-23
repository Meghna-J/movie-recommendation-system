import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigation, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useLastLocation } from "react-router-dom-last-location";

const Trailer = () => {
  const location = useLocation();
  let trailer_videos = location.state.arr2;
  let user = location.state.user;
  const navigate = useNavigate();
  // console.log(trailer_videos)
  let yt_trailer = [];
  const lastLocation = useLastLocation();
  // console.log(lastLocation)
  let movie_name = trailer_videos.slice(-1);
  console.log(movie_name[0]);
  trailer_videos.forEach((video, idx) => {
    let { name, key, site } = video;
    // console.log(name + " " + key + " " + site);
    if (site == "YouTube") {
      yt_trailer.push(`https://www.youtube.com/embed/${key}`);
    }
  });
  const goBack = (ev) => {
    ev.preventDefault();
    axios
      .post("http://localhost:4000/recommendation", { json: movie_name[0] })
      .then((res) => {
        // console.log(res.data);
        // return res.json;
        // setMovielist(res.data);
        navigate("/recommendation", { state:{arr: res.data,user:user }});
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ backgroundColor: "black" }}>
      <div
        className="head"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <form onSubmit={goBack}>
          <div
            class="form-group shadow-textarea"
            style={{ marginTop: 0, textAlign: "center", color: "white" }}
          >
            <input
              type="hidden"
              id="movie"
              name="movie"
              value={movie_name[0]}
              // onChange={(e) => setMovie(movie.recommend_movie_name)}
              className="movie form-control"
              autoComplete="off"
              placeholder="Enter the Movie Name"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#ffffff",
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
              color: "black",
              textAlign: "center",
              borderColor: "black",
              width: 50,
              marginTop: 30,
              marginLeft: 15,
              marginRight:20,
              height: "fit-content",
            }}
          >
            ⬅
          </button>
        </form>
        <h1 style={{ marginTop: 20 }}>Trailer</h1>
      </div>
      <Carousel
        interval={null}
        style={{
          height: 500,
          width: 1000,
          margin: "auto",
          backgroundColor: "black",
        }}
      >
        {yt_trailer.map((link) => (
          <Carousel.Item>
            <div style={{ margin: "auto", width: 700 }}>
              <iframe
                className="d-block w-100"
                width="700"
                height="400"
                src={link}
                title="${name}"
                class="embed hide"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Trailer;
