import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./Components/views/About/About";
import Member from "./Components/views/About/Member";
import Test from "./Components/views/Testing/Test";
import NewListing from "./Components/views/NewListing/NewListing";
import Dashboard from "./Components/dashboard/Dashboard";
import Home from "./Components/Home";
import Books from "./Components/Books";
import Furniture from "./Components/Furniture";
import Electronics from "./Components/Electronics";
import Others from "./Components/Others";
import Result from "./Components/Result";
import ProductListing from "./Components/ProductListing";
import Auth from "./Components/views/UI/AuthModal/AuthModal";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/about/:name" component={Member} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/newListing" component={NewListing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/furniture" component={Furniture} />
        <Route exact path="/Electronics" component={Electronics} />
        <Route exact path="/others" component={Others} />
        <Route exact path="/result" component={Result} />
        <Route exact path="/productlisting" component={ProductListing} />
        <Route path="/authentication" component={Auth} />
      </Switch>
    </Router>
  );
}
