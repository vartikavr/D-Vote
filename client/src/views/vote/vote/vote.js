import "./vote.css";
import { useState, useEffect } from "react";
import TableRow from "../tableRow/tableRow";
import Election from "../../../../../ethereum/election";
import web3 from "../../../../../ethereum/web3";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AddCandidateModal from "./addCandidateModal.js";
import VotePageHeader from "../votePageHeader/votePageHeader";
import EditCandidateModal from "../tableRow/editCandidateModal";
import { useParams } from "react-router-dom";
import PartyLogo from "../../parties/partyLogo";
toast.configure();
require("dotenv").config();

const Vote = () => {
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
  const [constituency, setConstituency] = useState(""); //constituency of new candidate
  const [loadingEdit, setLoadingEdit] = useState(false); //editing a candidate in-process
  const [editCandidateInfo, setEditCandidateInfo] = useState(""); //details of candidate to be edited
  const election = Election(process.env.REACT_APP_ADDRESS);
  const { id } = useParams();
  const [partyLogo, setPartyLogo] = useState("");

  useEffect(() => {
    getAddress();
    getConstituencyDetails();
  }, [isReload]);

  useEffect(() => {
    const form = document.getElementById("form");
    document.getElementById("submitBtn").disabled = true;
    form.addEventListener("change", () => {
      document.getElementById("submitBtn").disabled = !form.checkValidity();
    });
  }, [name, party, constituency]);

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
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        axios
          .post(
            `/api/voter/checkVoter`,
            { storeAddress: storeAddress },
            axiosConfig
          )
          .then((res) => {
            getVoted(storeAddress);
          })
          .catch((e) => {
            setIsRegistered(false);
            toast.error(
              "Error occured. Account address not linked with a valid voterID!"
            );
          });
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
      toast.error("An error occured while loading data. Please try again!");
    }
  };

  const getConstituencyDetails = () => {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`/api/vote/${id}`, axiosConfig)
      .then((res) => {
        setConstituency(res.data.constituency);
        getCandidates(res.data.constituency);
      })
      .catch((e) => {
        toast.error("An error occured while loading data. Try again!");
      });
  };

  const getCandidates = async (constituencyData) => {
    try {
      let candidateData = [];
      for (var i = 0; i < constituencyData.candidateIds.length; i++) {
        const candidate = await election.methods
          .candidates(constituencyData.candidateIds[i])
          .call();
        candidateData.push(candidate);
      }
      console.log(candidateData);
      setCandidatesDisplay(candidateData);
      setEndPending(true);
    } catch (e) {
      setEndPending(true);
      toast.error("An error occured while loading data. Please try again!");
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
        constituency={constituency}
        isAdmin={isAdmin}
      />
      <EditCandidateModal
        setLoadingEdit={setLoadingEdit}
        setIsReload={setIsReload}
        editCandidateInfo={editCandidateInfo}
      />
      <PartyLogo partyLogo={partyLogo} />
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
          {candidatesDisplay && candidatesDisplay.length === 0 && (
            <h3
              style={{
                textAlign: "center",
                margin: "auto",
                fontSize: 20,
                fontWeight: 350,
              }}
            >
              No candidates to show.
            </h3>
          )}
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
                      Logo
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
                        index={i}
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
                        setPartyLogo={setPartyLogo}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Vote;
