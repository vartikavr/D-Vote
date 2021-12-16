import { useEffect, useState } from "react";
import web3 from "../../../../ethereum/web3";
import "./navbar.css";

const Navbar = () => {
  const url = window.location.pathname;
  console.log(url);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkIfAdmin();
  }, []);

  const checkIfAdmin = async (req, res) => {
    try {
      const storeAddress = await web3.eth.getCoinbase((err, coinbase) => {
        console.log(coinbase);
      });
      if (storeAddress !== undefined) {
        if (
          process.env.REACT_APP_ADMIN_ADDRESS.toLowerCase() === storeAddress
        ) {
          setIsAdmin(true);
        }
      }
    } catch (err) {
      console.log("An error occured while checking for admin");
    }
  };

  return (
    <div className="header-navbar">
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark navbar-bg-header">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            DVote
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a
                className={`nav-item ${url == "/home" ? " active" : ""}`}
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </div>
            {isAdmin && (
              <div className="navbar-nav">
                <a
                  className={`nav-item ${url == "/voters" ? " active" : ""}`}
                  aria-current="page"
                  href="/voters"
                >
                  Voters
                </a>
              </div>
            )}
            {isAdmin && (
              <div className="navbar-nav">
                <a
                  className={`nav-item ${url == "/parties" ? " active" : ""}`}
                  aria-current="page"
                  href="/parties"
                >
                  Parties
                </a>
              </div>
            )}
            <div className="navbar-nav ms-auto">
              <a
                className={`nav-item d-block ${
                  url == "/working" ? " active" : ""
                }`}
                href="/working"
              >
                Working
              </a>
              <a
                className={`nav-item ${url == "/vote" ? " active" : ""}`}
                href="/vote"
              >
                Vote
              </a>
              <a
                className={`nav-item ${url == "/my-card" ? " active" : ""}`}
                href="/my-card"
              >
                My Card
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
