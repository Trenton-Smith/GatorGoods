import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function auth(SpecificComponent, option) {
  axios.defaults.withCredentials = true;

  function AuthCheck(props) {
    const [user, setUser] = useState();
    const [admin, setAdmin] = useState();
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
          await setAdmin(response.data.admin);
          //If use loggedIn and try to access Login again
          if (option === false) {
            history.push("/");
          }
        }
      });
    }, [history]);
    return <SpecificComponent {...props} user={user} admin={admin} />;
  }
  return AuthCheck;
}
