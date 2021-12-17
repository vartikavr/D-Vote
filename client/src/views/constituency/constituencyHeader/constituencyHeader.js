import axios from "axios";
import Election from "../../../../../ethereum/election";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react/cjs/react.development";
import "./constituencyHeader.css";
toast.configure();

const ConstituencyHeader = ({
  isAdmin,
  openDropdown,
  electionStarted,
  setIsChange,
  electionEnded,
}) => {
  const [isStarting, setIsStarting] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const election = Election(process.env.REACT_APP_ADDRESS);

  const handleStartElection = () => {
    try {
      setIsStarting(true);
      setIsChange(false);
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("/api/start", { isAdmin, isAdmin }, axiosConfig)
        .then((res) => {
          setIsStarting(false);
          setIsChange(true);
        })
        .catch((e) => {
          toast.error("An error occured. Try again!");
          setIsStarting(false);
        });
    } catch (e) {
      toast.error("An error occured in starting the election.");
      setIsStarting(false);
    }
  };

  const handleEndElection = () => {
    setIsEnding(true);
    setIsChange(false);
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .get("/api/vote", {}, axiosConfig)
        .then((res) => {
          calculateConstituenciesWinner(res.data.constituencies);
        })
        .catch((e) => {
          toast.error("An error occured. Try again!");
          setIsEnding(false);
        });
    } catch (e) {
      toast.error("An error occured. Try again!");
      setIsEnding(false);
    }
  };

  const calculateConstituenciesWinner = async (constituenciesData) => {
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      for (let i = 0; i < constituenciesData.length; i++) {
        let maxVotes = 0;
        let maxParty = "";
        const constituency = constituenciesData[i];
        for (let j = 0; j < constituency.candidateIds.length; j++) {
          const candidate = await election.methods
            .candidates(constituency.candidateIds[j])
            .call();
          if (candidate.voteCount > maxVotes) {
            maxVotes = candidate.voteCount;
            maxParty = candidate.party;
          }
        }
        axios
          .post(
            "/api/vote/edit",
            { isAdmin: isAdmin, id: constituency._id, winnerParty: maxParty },
            axiosConfig
          )
          .then((res) => {})
          .catch((e) => {
            toast.error("An error occured. Try again!");
            setIsEnding(false);
          });
        axios
          .post(
            "/api/party/edit",
            { isAdmin: isAdmin, partyName: maxParty },
            axiosConfig
          )
          .then((res) => {
            if (i == constituenciesData.length - 1) {
              endElection();
            }
          })
          .catch((e) => {
            toast.error("An error occured. Try again!");
            setIsEnding(false);
          });
      }
    } catch (e) {
      toast.error("An error occured. Try again!");
      setIsEnding(false);
    }
  };

  const endElection = () => {
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("/api/end", { isAdmin: isAdmin }, axiosConfig)
        .then((res) => {
          setIsEnding(false);
          setIsChange(true);
          toast.success("Election ended successfully!");
        })
        .catch((e) => {
          toast.error("An error occured. Try again!");
          setIsEnding(false);
        });
    } catch (e) {
      toast.error("An error occured. Try again!");
      setIsEnding(false);
    }
  };

  return (
    <div className="Constituencies card">
      <div className="card-head">
        <div className="card-title" title="Constituencies">
          Constituencies
        </div>
        <div
          className="card-class dropdown-menu-classroom"
          style={{ marginLeft: "auto" }}
        >
          {isAdmin && !electionEnded && (
            <button className="menu-btn" onClick={openDropdown}>
              <img
                alt=""
                src="https://img.icons8.com/ios-glyphs/30/ffffff/menu-2.png"
              />
            </button>
          )}
          <div className="menu-content" id="menu-content">
            {!electionStarted && !isStarting && (
              <button className="links" onClick={handleStartElection}>
                Start Election
              </button>
            )}
            {!electionStarted && isStarting && (
              <button className="links">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                &nbsp;Starting
              </button>
            )}
            {!isEnding && !electionEnded && (
              <button className="links" onClick={handleEndElection}>
                End Election
              </button>
            )}
            {isEnding && !electionEnded && (
              <button className="links">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                &nbsp;Ending
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstituencyHeader;
