import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./Components/views/About/About";
import YG from "./Components/views/About/Individual/YG";
import Joy from "./Components/views/About/Individual/Joy";
import Keith from "./Components/views/About/Individual/Keith";
import Trenton from "./Components/views/About/Individual/Trenton";
import NewListing from "./Components/views/NewListing/NewListing";
import Dashboard from "./Components/dashboard/Dashboard";
import Home from "./Components/Home";
import Books from "./Components/Books";
import Furniture from "./Components/Furniture";
import Electronics from "./Components/Electronics";
import Other from "./Components/Other";
import Result from "./Components/Result";
import ProductListing from "./Components/ProductListing";
import Login from "./Components/views/UI/AuthModal/AuthModal";
import SearchResults from "./Components/views/Testing/SearchResults";
import Auth from "../src/utils/auth";
import Blin from "./Components/views/About/Individual/Blin";
import Hesham from "./Components/views/About/Individual/Hesham";
import Error from "./Components/Error.js";

export default function Routes() {
  // null - Anyone Can go inside
  // true - Only logged in user can go inside
  // false - Logged in user can't go inside

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={Auth(About, null)} />
      <Route exact path="/about/yg" component={Auth(YG, null)} />
      <Route exact path="/about/joy" component={Auth(Joy, null)} />
      <Route exact path="/about/keith" component={Auth(Keith, null)} />
      <Route exact path="/about/trenton" component={Auth(Trenton, null)} />
      <Route exact path="/about/blin" component={Auth(Blin, null)} />
      <Route exact path="/about/hesham" component={Auth(Hesham, null)} />
      <Route
        exact
        path="/searchresults"
        component={Auth(SearchResults, null)}
      />
      <Route exact path="/books" component={Auth(Books, null)} />
      <Route exact path="/furniture" component={Auth(Furniture, null)} />
      <Route exact path="/electronics" component={Auth(Electronics, null)} />
      <Route exact path="/other" component={Auth(Other, null)} />
      <Route exact path="/result" component={Auth(Result, null)} />
      <Route
        exact
        path="/productlisting"
        component={Auth(ProductListing, null)}
      />
      <Route exact path="/login" component={Auth(Login, false)} />
      <Route exact path="/newListing" component={Auth(NewListing, true)} />
      <Route exact path="/dashboard" component={Auth(Dashboard, true)} />
      <Route path='*' exact={true} component={Error} />
    </Switch>
  );
}
