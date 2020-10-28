import React from "react";
import Navigation from "./Components/views/Navigation/Navigation";
import Routes from "./Routes";
import Home from "./Components/Home";
import WarningBanner from "./Components/WarningBanner";
import Landing from "./Components/views/Landing/Landing"
import Searchbox from "./Components/Searchbox"
import "bootswatch/dist/pulse/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
