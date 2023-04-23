// import logo from "./logo.svg";
// import './theme.css';
// // import "./App.css";
// import Navbar from "./components/Navbar/Navbar";
// import HomeBody from "./components/HomeBody/HomeBody";

// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//       <HomeBody/>
//     </div>
//   );
// }

// export default App;
import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Recommend from "./components/Recommend";
import Trailer from "./components/Trailer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommendation" element={<Recommend />} />
        <Route path="/trailer" element={<Trailer/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
