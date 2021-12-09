import "./vote.css";
import { useState, useEffect } from "react";
import TableRow from "../tableRow/tableRow";
import Election from "../../../../../ethereum/election";
import web3 from "../../../../../ethereum/web3";
import data from "../../../../../seeders/data";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCandidateModal from "./addCandidateModal.js";
import VotePageHeader from "../votePageHeader/votePageHeader";
import EditCandidateModal from "../tableRow/editCandidateModal";
toast.configure();
require("dotenv").config();

const Vote = () => {
  const [candidatesCount, setCandidatesCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false); //check if user is admin
  const [isError, setIsError] = useState(false); //address not found
  const [isRegistered, setIsRegistered] = useState(true); //address is registered or not
  const [hasVoted, setHasVoted] = useState(false); //user has voted or not
  const [isReload, setIsReload] = useState(false);
  const [candidatesDisplay, setCandidatesDisplay] = useState([]);
  //check whether page information has been fetched from backend or not
  const [endPending, setEndPending] = useState(false);
  const [noMetamask, setNoMetamask] = useState(false); //metamask installed in system or not
  const [loadingVote, setLoadingVote] = useState(false); //voting in-process
  const [loadingAdd, setLoadingAdd] = useState(false); //adding candidate in-process
  const [name, setName] = useState(""); //name of new added candidate
  const [party, setParty] = useState(""); //party of new added candidate
  const [loadingEdit, setLoadingEdit] = useState(false); //editing a candidate in-process
  const [editCandidateInfo, setEditCandidateInfo] = useState(""); //details of candidate to be edited
  const election = Election(process.env.REACT_APP_ADDRESS);

  useEffect(() => {
    getAddress();
    getCandidateCount();
  }, [isReload]);

  useEffect(() => {
    const form = document.getElementById("form");
    document.getElementById("submitBtn").disabled = true;
    form.addEventListener("change", () => {
      document.getElementById("submitBtn").disabled = !form.checkValidity();
    });
  }, [name, party]);

  const getAddress = async () => {
    setIsError(false);
    setNoMetamask(false);
    setIsRegistered(true);
    try {
      const storeAddress = await web3.eth.getCoinbase((err, coinbase) => {
        console.log(coinbase);
      });
      if (storeAddress == undefined) {
        setIsError(true);
        toast.error(
          "Address not found. Please login into your Metamask account!"
        );
      } else {
        if (
          process.env.REACT_APP_ADMIN_ADDRESS.toLowerCase() === storeAddress
        ) {
          setIsAdmin(true);
          toast.info("Logged in as admin!");
        }
        let found = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i].address.toLowerCase() == storeAddress) {
            found = true;
            break;
          }
        }
        if (found) {
          getVoted(storeAddress);
        } else {
          setIsRegistered(false);
          toast.error(
            "Error occured. Account address not linked with a valid voterID!"
          );
        }
      }
    } catch (err) {
      setNoMetamask(true);
      toast.error("Metamask not installed. Kindly install it to continue.");
    }
  };

  const getVoted = async (storeAddress) => {
    try {
      const voted = await election.methods.voters(storeAddress).call();
      setHasVoted(voted);
    } catch (e) {
      toast.error("An error occured. Please try again!");
    }
  };

  const getCandidateCount = async () => {
    try {
      const count = await election.methods.candidatesCount().call();
      setCandidatesCount(count);
      let candidateData = [];
      for (var i = 1; i <= count; i++) {
        const candidate = await election.methods.candidates(i).call();
        candidateData.push(candidate);
      }
      console.log(candidateData);
      setCandidatesDisplay(candidateData);
      setEndPending(true);
    } catch (e) {
      setEndPending(true);
      toast.error("An error occured. Please try again!");
    }
  };

  return (
    <div className="cast-vote">
      <AddCandidateModal
        setLoadingAdd={setLoadingAdd}
        setIsReload={setIsReload}
        name={name}
        setName={setName}
        party={party}
        setParty={setParty}
      />
      <EditCandidateModal
        setLoadingEdit={setLoadingEdit}
        setIsReload={setIsReload}
        editCandidateInfo={editCandidateInfo}
      />
      {!endPending && (
        <div className="pageLoading">
          <ReactLoading
            type={"balls"}
            color={"#4b8ef1"}
            height={80}
            width={80}
          />
        </div>
      )}
      {endPending && (
        <div className="container col-md-8 p-5">
          <VotePageHeader isAdmin={isAdmin} loadingAdd={loadingAdd} />
          {candidatesDisplay != "" && (
            <div className="candidateTable">
              <table
                className="table table-bordered"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th className="voteTableHeader" scope="col">
                      ID
                    </th>
                    <th className="voteTableHeader" scope="col">
                      Candidate Name
                    </th>
                    <th className="voteTableHeader" scope="col">
                      Party
                    </th>
                    <th className="voteTableHeader" scope="col">
                      Voter Count
                    </th>
                    <th className="voteTableHeader" scope="col">
                      Vote
                    </th>
                    {isAdmin && (
                      <th className="voteTableHeader" scope="col">
                        Edit
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {candidatesDisplay.map((candidate, i) => {
                    return (
                      <TableRow
                        candidate={candidate}
                        hasVoted={hasVoted}
                        isRegisteredVoter={isRegistered}
                        isNoAddressFound={isError}
                        noMetamask={noMetamask}
                        setIsReload={setIsReload}
                        loadingVote={loadingVote}
                        setLoadingVote={setLoadingVote}
                        loadingEdit={loadingEdit}
                        isAdmin={isAdmin}
                        setEditCandidateInfo={setEditCandidateInfo}
                      />
                    );
                  })}
                </tbody>
              </table>
              <p>Found {candidatesCount} candidates.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Vote;
