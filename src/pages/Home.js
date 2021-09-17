import React, { useContext } from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import {

  Container,

} from "reactstrap";

import { UserProvider } from "../context/UserContext";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";


export default function Home({ update, toggleUpdate }) {
  const [userCompanies, setUserCompanies] = useState(null);
  const {user, loading} =  useContext(UserProvider.context)





  useEffect(() => {
    (async function fetchData() {
      const res = await axios.get("/nav");
      const { companies } = res.data;
      setUserCompanies([...companies]);    
    })();

  }, [userCompanies]);

  useEffect(()=> {
    console.log(user)
  },[loading])


  return (
    <Container>
      {user ? <HomeLoggedIn update={update} toggleUpdate={toggleUpdate} /> : <HomeLoggedOut/>}
    </Container>
  );
}
