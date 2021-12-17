import "./votePageHeader.css";
import { Link } from "react-router-dom";

const VotePageHeader = ({ isAdmin, loadingAdd, electionStarted }) => {
  return (
    <div className="votePageHeader">
      <h2 style={{ color: "#4b8ef1" }}>Cast Your Vote</h2>
      <div
        className="alert alert-info mt-3 mb-3"
        role="alert"
        style={{ overflowWrap: "break-word" }}
      >
        <h5>Important!</h5>
        <ul className="ms-4">
          <li style={{ listStyleType: "circle", display: "list-item" }}>
            A voter can only vote once.
          </li>
          <li style={{ listStyleType: "circle", display: "list-item" }}>
            The voter's current account address should be linked with his voter
            ID.
          </li>
          <li style={{ listStyleType: "circle", display: "list-item" }}>
            The voter is recommended to re-check their current connected account
            address on <Link to="/my-card">My Card</Link>.
          </li>
          {isAdmin && (
            <li style={{ listStyleType: "circle", display: "list-item" }}>
              Admin can only <span style={{ fontWeight: "600" }}>edit</span>{" "}
              details of a listed candidate till the time no one has voted
              him/her.
            </li>
          )}
        </ul>
      </div>
      {isAdmin && !loadingAdd && !electionStarted && (
        <button
          className="btn-addCandidate"
          data-toggle="modal"
          data-target="#addModalCenter"
        >
          Add Candidate
        </button>
      )}
      {isAdmin && loadingAdd && !electionStarted && (
        <div className="voting-btn">
          <button className="btn-addCandidateLoading" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            &nbsp;Adding..
          </button>
        </div>
      )}
    </div>
  );
};

export default VotePageHeader;
