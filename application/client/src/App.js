import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Components/views/Navigation/Navigation";
import Routes from "./Routes";
import WarningBanner from "./Components/WarningBanner";
import "bootswatch/dist/pulse/bootstrap.min.css";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <WarningBanner />
        <Navigation />
        <Routes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
