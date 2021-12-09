import Carousel from "react-bootstrap/Carousel";

const Working = () => {
  const images = [
    "https://altamar.us/wp-content/uploads/2019/05/india_election_voting.jpg",
    "https://images.unsplash.com/photo-1583407386527-820c9281cfd0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://cdnuploads.aa.com.tr/uploads/Contents/2019/04/29/thumbs_b_c_ed095c0d5315cd76d93a43cbfe6c49d2.jpg?v=225241",
    "https://static.theprint.in/wp-content/uploads/2019/03/election-tpq-wt-696x392.jpg",
  ];

  return (
    <div className="working">
      <div className="container">
        <div className="row">
          <div className="mb-3">
            <h1 className="mt-4" style={{ color: "#4b8ef1" }}>
              How does DVote works?
            </h1>
            <p className="small">
              by &nbsp;
              <a href="https://eci.gov.in/" target="_blank">
                Election Commission of India
              </a>
            </p>
            <hr />
            <p>Posted on December 1, 2021 at 18:00 PM</p>
            <hr />
          </div>
          <div className="col-lg-6">
            <Carousel fade nextLabel="" prevLabel="">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={images[1]}
                  alt="Rashtrapati Bhawan, New Delhi"
                />
                <Carousel.Caption>
                  <h5>Rashtrapati Bhawan, New Delhi.</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={images[2]}
                  alt="Applying Electoral ink."
                />
                <Carousel.Caption>
                  <h5>Electoral ink.</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={images[0]}
                  alt="Voters standing in a queue to cast their vote."
                />
                <Carousel.Caption>
                  <h5>One person, One vote.</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={images[3]}
                  alt="Ballot system for elections."
                />
                <Carousel.Caption>
                  <h5>Earlier Ballot system.</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <hr />
          </div>
          <div className="col-lg-6 working-info">
            <p className="lead" style={{ fontWeight: 450, color: "#4b8ef1" }}>
              <em>
                Standing in the queue and waiting for your turn to cast vote is
                a part of history now.{" "}
              </em>
            </p>

            <p>
              <strong>The Election Commission of India</strong> proposes a new
              system of voting where everything is transparent and no question
              of tampering with the voting machine will be there, as it doesn't
              exist in the first place.
            </p>

            <p>
              <strong>DVote</strong> is the upcoming way of casting votes where
              all the votes will be stored in the Blockchain, which makes the
              system tamper-proof and fully transparent. This would
              revolutionize our existing voting methods. Below given are some
              steps to demonstrate how to use DVote and cast votes successfully.
            </p>

            <div className="alert alert-secondary" role="alert">
              <span>Note : This is still under various trials.</span>
            </div>
            <p className="lead" style={{ fontWeight: 600 }}>
              How to use?
            </p>

            <p>
              1. Install{" "}
              <a href="https://metamask.io/" target="_blank">
                MetaMask
              </a>{" "}
              Browser Extension.
            </p>
            <p>
              2. Make sure you've imported that Ethereum account, which you've
              been assigned by the commission, into MetaMask.
            </p>
            <p>
              3. Visit the <a href="/vote">Vote Page</a> and cast your vote.
            </p>
            <p>
              Regards,
              <br />
              <span style={{ fontWeight: 500 }}>
                Election Commission of India
              </span>
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Working;
