import Election from "../../../../ethereum/election";
import web3 from "../../../../ethereum/web3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const TableRow = ({
  hasVoted,
  candidate,
  noMetamask,
  isRegisteredVoter,
  isNoAddressFound,
  setIsReload,
  loadingVote,
  setLoadingVote,
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

  return (
    <tr>
      <th scope="row">{candidate.id}</th>
      <th>{candidate.name}</th>
      <th>{candidate.party}</th>
      <th>{candidate.voteCount}</th>
      <th>
        {hasVoted || noMetamask || isNoAddressFound || !isRegisteredVoter ? (
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
              <button className="voteButton">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                &nbsp;Voting..
              </button>
            )}
          </div>
        )}
      </th>
    </tr>
  );
};

export default TableRow;
