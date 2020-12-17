import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

/**
 * File name: auth.js
 * Purpose: auth fuction checks if user's authentication.
 *          It calls get request from authenticate API ("/api/auth/authenticate") and
 *          reroute them to login ("/login") if user is not authenticated and
 *          if user is successfully authenticated reroute to home page("/").
 *          It also provides user's id as props on specific components which
 *          specified in Routes.js
 * Authors: YG
 */

export default function auth(SpecificComponent, option) {
  axios.defaults.withCredentials = true;

  function AuthCheck(props) {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
      axios.get("/api/auth/authenticate").then(async (response) => {
        console.log(response.data);
        // If user not loggedIn and try to access loggedin user only component:
        if (response.data.loggedIn === false) {
          if (option) {
            history.push("/login");
          }
        } else {
          await setUser(response.data.user);
          //If use loggedIn and try to access Login again
          if (option === false) {
            history.push("/");
          }
        }
      });
    }, [history]);
    return <SpecificComponent {...props} user={user} />;
  }
  return AuthCheck;
}
