import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./HomeBody.css";
import axios from 'axios';

const HomeBody = () => {
  const [name,setName] = useState("");
  async function postName(e){
    e.preventDefault();
    try {
      axios.post("http://localhost:4000/recommendation",{
        name
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {/* <div className="main-title-container position-absolute start-50">
            <div className="main-head">
            <Alert.Heading className="main-title styles.mainheading"  style={{ fontSize: 50 }}>
                Unlimited movies, TV
                shows and more.
            </Alert.Heading>
            </div>
            <div className="main-title-desc" style={{ fontSize: 25 }}>
                <div className="desc">Watch anywhere. Cancel anytime.</div>
            </div>
            <p className="main-pitch" style={{ fontSize: 20 }}>Search your favourite movies</p>
        </div> */}

      <div className="main-title-container" style={{margin:20}}>
        <div className="main-head">
          <h className="main-title">
            Unlimited movies, TV
            <br /> shows and more.
          </h>
        </div>
        <div className="main-title-desc">
          <div className="desc">Watch anywhere. Cancel anytime.</div>
        </div>
        <p className="main-pitch">Search your favourite movies</p>
        <form
          onSubmit={postName}
          // action="/recommendation"
          // method="POST"
          style={{ display: "flex",justifyContent:"space-around" }}
        >
          <div
            className="form-group shadow-textarea"
            style={{ marginTop: 30, textAlign: "center", color: "white" }}
          >
            <input
              type="text"
              id="movie"
              name="movie"
              className="movie form-control"
              autoComplete="off"
              placeholder="Enter the Movie Name"
              value={name}
              onChange = {(e)=>setName = e.target.value}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#ffffff",
                // width: 300,
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
                backgroundColor: "#e50914",
                textAlign: "center",
                borderColor: "#e50914",
                width: 120,
                marginTop: 29,
                height: "fit-content",
              }}
            >
              Search
            </button>
            <br />
            <br />
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeBody;
