import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserProvider} from "../context/UserContext";

const NavBar = ({update}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [userCompanies, setUserCompanies] = useState(null);
  const {user} = useContext(UserProvider.context)

  // const toggle = () => setIsOpen(!isOpen);

  function makeLinks(arr) {
    if (arr) {
      const links = userCompanies.map((item) => {
        return (
          <li key={item._id} className="dropdown-item">
            <Link className="nav-link" to={`/dashboard/${item._id}`}>
              {item.name}
            </Link>
          </li>
        );
      });

      return links;
    }
  }
  
  function logout(){
    axios.get('/logout')
  }

  function renderCondLinks(){
    console.log(user)
    if(!user) {
      return (
        <>
        <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Log In
            </Link>
          </li>
          </>
      )
    } else {
      return (
        <>
        <li className="nav-item">
            <a className="nav-link" href="/" onClick={logout}>
              Log Out
            </a>
          </li>
        </>
      )
    }
  }

  useEffect(() => {
   ( async function fetchData() {
      const res = await axios.get("/nav");
      const { companies } = res.data;
      setUserCompanies([...companies]);
  
    })();
    console.log('navlink useeffect')
    
  }, [ update ]);

  const dashboardLinks = makeLinks(userCompanies);
  const conditionalLinks = renderCondLinks()
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="nav-link text-muted" to="/">
          <h3>Craftory</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
   
            {conditionalLinks}

            
            {dashboardLinks ? (
              <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory Lists
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              {dashboardLinks}
              </ul>
            </li>
            ) : ''}
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
