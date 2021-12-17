import "./voters.css";
import { useEffect, useState } from "react";
import axios from "axios";
import web3 from "../../../../ethereum/web3";
import Election from "../../../../ethereum/election";
import { toast } from "react-toastify";
import AddVoterModal from "./addVoterModal";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Voters = () => {
  const [endPending, setEndPending] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allVoters, setAllVoters] = useState([]);
  const [isAddingVoter, setIsAddingVoter] = useState(false);
  const [isDeletingVoter, setIsDeletingVoter] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const election = Election(process.env.REACT_APP_ADDRESS);
  const [electionStarted, setElectionStarted] = useState(false);

  useEffect(() => {
    checkIfAdmin();
  }, [isReload]);

  const checkIfAdmin = async (req, res) => {
    try {
      const storeAddress = await web3.eth.getCoinbase((err, coinbase) => {
        console.log(coinbase);
      });
      setCurrentAddress(storeAddress);
      if (storeAddress !== undefined) {
        if (
          process.env.REACT_APP_ADMIN_ADDRESS.toLowerCase() === storeAddress
        ) {
          setIsAdmin(true);
          getAllVoters(true);
        } else {
          getAllVoters(false);
        }
      }
    } catch (err) {
      console.log("An error occured while checking for admin");
    }
  };

  const getAllVoters = (admin) => {
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("/api/voter", { isAdmin: admin }, axiosConfig)
        .then((res) => {
          setAllVoters(res.data.voters);
          setElectionStarted(res.data.startElection);
          setEndPending(true);
        })
        .catch((e) => {
          toast.error("An error occured. Try again!");
          setEndPending(true);
        });
    } catch (e) {
      toast.error("An error occured while loading data. Try again!");
    }
  };

  const handleDeleteVoter = async (event) => {
    try {
      setIsDeletingVoter(true);
      const voted = await election.methods.voters(currentAddress).call();
      if (!voted) {
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        axios
          .post(
            `/api/voter/${event.target.id}/delete`,
            { isAdmin: isAdmin },
            axiosConfig
          )
          .then((res) => {
            toast.success("Voter successfully deleted!");
            setIsDeletingVoter(false);
            setIsReload(true);
          })
          .catch((e) => {
            toast.error("An error occured. Try again!");
            setIsDeletingVoter(false);
          });
      } else {
        setIsDeletingVoter(false);
        toast.error("Voter can't be deleted!");
      }
    } catch (e) {
      toast.error("An error occured. Try again!");
    }
  };

  return (
    <div className="allVoters pb-5">
      <AddVoterModal
        setIsReload={setIsReload}
        setIsAddingVoter={setIsAddingVoter}
        isAdmin={isAdmin}
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
        <div className="votersList">
          <div className="mb-3">
            <h1
              className="mt-4 text-center mb-3"
              style={{ fontSize: 40, color: "#4b8ef1" }}
            >
              All Valid Voters
            </h1>
            <p
              className="text-center col-md-6 offset-md-3"
              style={{ fontSize: 17 }}
            >
              Following is the list of valid registered voters, displayed in
              ascending order with respect to voter's name. The Metamask account
              of these voters have been linked to their other voting details.
            </p>
          </div>
          {!isAddingVoter && !electionStarted && (
            <button
              className="btn-addVoter"
              data-toggle="modal"
              data-target="#addVoterModalCenter"
            >
              Add Voter
            </button>
          )}
          {isAddingVoter && !electionStarted && (
            <button className="btn-addVoterLoading">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              &nbsp; Adding
            </button>
          )}
          <div className="displayVoters col-md-6 offset-md-3">
            {allVoters.map((voter) => (
              <div className="card mb-3">
                <div className="row ms-2">
                  <div className="card-body float-container">
                    <div className="leftCard col-6">
                      <div className="float-child">
                        <h5
                          className="card-title"
                          style={{
                            color: "black",
                            fontWeight: 200,
                            fontSize: 27,
                          }}
                        >
                          {voter.name}
                        </h5>
                        <p className="card-text">
                          <b>VoterId: </b>
                          {voter.voterId}
                        </p>
                        <p className="card-text">
                          <b>Account address: </b>
                          {voter.address}
                        </p>
                      </div>
                    </div>
                    {!isDeletingVoter && !electionStarted && (
                      <div className="float-child delete">
                        <a
                          className="btn btn-danger"
                          id={voter._id}
                          onClick={handleDeleteVoter}
                        >
                          Delete
                        </a>
                      </div>
                    )}
                    {isDeletingVoter && !electionStarted && (
                      <div className="float-child delete">
                        <a className="btn btn-danger" disabled>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          &nbsp; Deleting
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Voters;
