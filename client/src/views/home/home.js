import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <header
        class="header-area header-sticky wow slideInDown"
        data-wow-duration="0.75s"
        data-wow-delay="0s"
      >
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nav class="main-nav">
                <a href="/" class="logo">
                  <img
                    src="https://img.icons8.com/windows/45/000000/vote-yea.png"
                    alt="DVote"
                    title="DVote"
                  />
                </a>
                <ul class="nav">
                  <li class="scroll-to-section">
                    <Link to="/" className="active">
                      Home
                    </Link>
                  </li>
                  <li class="scroll-to-section">
                    <Link to="/working">Working</Link>
                  </li>
                  <li class="scroll-to-section">
                    <Link to="/vote">Vote</Link>
                  </li>
                  <li>
                    <div class="gradient-button">
                      <Link to="/my-card">My Card</Link>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div
        class="main-banner wow fadeIn"
        id="top"
        data-wow-duration="1s"
        data-wow-delay="0.5s"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-6 align-self-center">
                  <div
                    class="left-content show-up header-text wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay="1s"
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <h2>DVote : Decentralized Voting</h2>
                        <h4>Welcome to the new age of voting!</h4>
                      </div>
                      <div class="col-lg-12">
                        <div class="white-button first-button scroll-to-section mt-3">
                          <Link to="/working">Get Started</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div
                    class="right-image wow fadeInRight mt-0"
                    data-wow-duration="1s"
                    data-wow-delay="0.5s"
                  >
                    <img src="assets/images/slider-dec.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services" class="services section">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div
                class="section-heading  wow fadeInDown"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <h4>Functionalities</h4>
                <img src="assets/images/heading-line-dec.png" alt="" />
                <h5>
                  Below listed are some main functionalities that DVote offers
                  its users.
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="service-item first-service">
                <div class="icon"></div>
                <h4>Show Voter Details</h4>
                <p>
                  Voter details can be seen and checked from the{" "}
                  <Link to="/my-card">My Card</Link> page.
                </p>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="service-item second-service">
                <div class="icon"></div>
                <h4>Check Voting Status</h4>
                <p>
                  A valid voter can check their voting status from{" "}
                  <Link to="/my-card">My Card</Link> and{" "}
                  <Link to="/vote">Voting Page</Link>. It'll show whether user
                  has cast vote so far or not.
                </p>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="service-item third-service">
                <div class="icon"></div>
                <h4>Cast Vote</h4>
                <p>
                  A valid voter is allowed to cast vote to their choice of
                  candidate.
                </p>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="service-item fourth-service">
                <div class="icon"></div>
                <h4>View votes</h4>
                <p>
                  To ensure transparent and untampered voting, each user can see
                  the current count of votes of each candidate on{" "}
                  <Link to="/vote">Voting Page</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer id="newsletter">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div class="section-heading">
                <h4>Decentralized Voting</h4>
                <h5 style={{ textAlign: "center" }}>
                  A new era of voting. <br />A step towards rightful voting
                  practices.
                </h5>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="copyright-text">
                <p>
                  Copyright © 2022 Election Commission of India
                  <br />
                  All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
