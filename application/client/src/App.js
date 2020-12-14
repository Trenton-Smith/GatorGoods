import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Components/views/Navigation/Navigation";
import Routes from "./Routes";
import WarningBanner from "./Components/WarningBanner";
import "bootswatch/dist/pulse/bootstrap.min.css";
import Footer from "./Components/Footer";

/*
Potential implementation #1 for Google Analytics - not verified yet
 */
// import ReactDOM from 'react-dom';
// import ReactGA from 'react-ga';
// import { createBrowserHistory } from 'history';
//
// const history = createBrowserHistory();
//
// // Initialize google analytics page view tracking
// history.listen(location => {
//     ReactGA.set({ page: location.pathname }); // Update the user's current page
//     ReactGA.pageview(window.location.pathname); // Record a pageview for the given page
// });

/*
Potential implementation #2 for Google Analytics - not verified yet
 */
import ReactGA from "react-ga";
useEffect(() => {
  ReactGA.initialize("G-0ECDWLTTK8");
  ReactGA.pageview(window.location.pathname + window.location.search);
}, []);

/**
 * File name: App.js
 * Purpose: App.js is the base structure for the application. From here, we load app-wide components like the our
 *          <WarningBanner/> and <Navigation/>, which then populate on every view listed under our <Routes/> directory.
 *          Google Analytics must be implemented here for tracking purposes.
 * Author: YG, Trenton
 * Notes: Google Analytics is not yet functional and needs to be further tested prior to submission.
 */

function App() {
  return (
    <div className="App">
      {/* <Router history={history}> // part of method #1 for Google Analytics attempt */}
      <Router>
        <WarningBanner />
        <Navigation />
        <Routes />
        <Footer />
      </Router>
    </div>
  );
}

// ReactDOM.render(<App />, document.getElementById('root')); // part of method #1 for Google Analytics attempt
export default App;
