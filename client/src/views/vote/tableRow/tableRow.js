import "./tableRow.css";
import axios from "axios";
import Election from "../../../../../ethereum/election";
import web3 from "../../../../../ethereum/web3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const TableRow = ({
  hasVoted,
  index,
  candidate,
  noMetamask,
  isRegisteredVoter,
  isNoAddressFound,
  setIsReload,
  loadingVote,
  setLoadingVote,
  loadingEdit,
  isAdmin,
  setEditCandidateInfo,
  setPartyLogo,
  electionStarted,
  voterConstituency,
  constituency,
  electionEnded,
}) => {
  const election = Election(process.env.REACT_APP_ADDRESS);

  const handleVote = async (event) => {
    setLoadingVote(true);
    setIsReload(false);
    try {
      const accounts = await web3.eth.getAccounts();
      await election.methods.vote(event.target.id).send({
        from: accounts[0],
      });
      setLoadingVote(false);
      toast.success("Voted successfully!");
      setIsReload(true);
    } catch (err) {
      setLoadingVote(false);
      toast.error(`An error occured! ${err.message}`);
    }
  };

  const loadEditCandidateInfo = async (event) => {
    try {
      const candidate = await election.methods
        .candidates(event.target.id)
        .call();
      setEditCandidateInfo(candidate);
    } catch (e) {
      toast.error("An error occured. Please try again!");
    }
  };

  const getPartyLogo = () => {
    try {
      setPartyLogo("");
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("/api/party/i", { partyName: candidate.party }, axiosConfig)
        .then((res) => {
          setPartyLogo(res.data.party.partyLogo);
        })
        .catch((e) => {
          toast.error("An error occured while loading data. Try again!");
        });
    } catch (e) {
      toast.error("Error in getting party logo!");
    }
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <th>{candidate.name}</th>
      <th>{candidate.party}</th>
      <th>
        <button
          className="party-logo"
          data-toggle="modal"
          data-target="#partyLogoModalCenter"
          onClick={getPartyLogo}
        >
          Logo
        </button>
      </th>
      <th>{candidate.voteCount}</th>
      <th>
        {hasVoted ||
        noMetamask ||
        isNoAddressFound ||
        !isRegisteredVoter ||
        !electionStarted ||
        voterConstituency != constituency ||
        electionEnded ? (
          <button className="voteButtonDisabled" disabled>
            Vote
          </button>
        ) : (
          <div className="div">
            {!loadingVote && (
              <button
                id={candidate.id}
                className="voteButton"
                onClick={handleVote}
              >
                Vote
              </button>
            )}
            {loadingVote && (
              <button className="voteButtonLoading">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                &nbsp;Voting
              </button>
            )}
          </div>
        )}
      </th>
      {isAdmin && (
        <th>
          {(candidate.voteCount > 0 || electionStarted) && (
            <button className="editButtonDisabled" disabled>
              Edit
            </button>
          )}
          {!loadingEdit && candidate.voteCount == 0 && !electionStarted && (
            <button
              id={candidate.id}
              className="editButton"
              data-toggle="modal"
              data-target="#editModalCenter"
              onClick={loadEditCandidateInfo}
            >
              Edit
            </button>
          )}
          {loadingEdit && candidate.voteCount == 0 && !electionStarted && (
            <button className="editButtonLoading">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          )}
        </th>
      )}
    </tr>
  );
};

export default TableRow;
