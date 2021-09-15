import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const NavBar = ({ update, toggleUpdate }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [userCompanies, setUserCompanies] = useState(null);

  // const toggle = () => setIsOpen(!isOpen);

  function makeLinks(arr) {
    if (arr) {
      const links = userCompanies.map((item) => {
        return (
          <li key={item._id} className="nav-item">
            <Link className="nav-link" to={`/dashboard/${item._id}`}>
              {item.name}
            </Link>
          </li>
        );
      });

      return links;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/nav");
      const { companies } = res.data;
      setUserCompanies([...companies]);
    }

    fetchData();
  }, [update]);

  const dashboardLinks = makeLinks(userCompanies);

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
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {dashboardLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
