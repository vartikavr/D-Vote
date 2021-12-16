import "./parties.css";
import { useEffect, useState } from "react";
import axios from "axios";
import web3 from "../../../../ethereum/web3";
import { toast } from "react-toastify";
import AddPartyModal from "./addPartyModal";
import ReactLoading from "react-loading";
import "react-toastify/dist/ReactToastify.css";
import PartyLogo from "./partyLogo";
toast.configure();

const Parties = () => {
  const [endPending, setEndPending] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allParties, setAllParties] = useState([]);
  const [isAddingParty, setIsAddingParty] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [partyLogo, setPartyLogo] = useState("");

  useEffect(() => {
    checkIfAdmin();
  }, [isReload]);

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
          getAllParties(true);
        } else {
          getAllParties(false);
        }
      }
    } catch (err) {
      console.log("An error occured while checking for admin");
    }
  };

  const getAllParties = (admin) => {
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("/api/party", { isAdmin: admin }, axiosConfig)
        .then((res) => {
          setAllParties(res.data.parties);
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

  const setPartyImageValue = (event) => {
    setPartyLogo(event.target.id);
  };

  return (
    <div className="allParties pb-5">
      <AddPartyModal
        setIsReload={setIsReload}
        setIsAddingParty={setIsAddingParty}
        isAdmin={isAdmin}
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
        <div className="partiesList">
          <div className="mb-3">
            <h1
              className="mt-4 text-center mb-3"
              style={{ fontSize: 40, color: "#4b8ef1" }}
            >
              All Valid Parties
            </h1>
            <p
              className="text-center col-md-6 offset-md-3"
              style={{ fontSize: 17 }}
            >
              Following is the list of valid parties. A party (or an individual)
              needs to be added in this list and then only their candidate can
              stand in the election.
            </p>
          </div>
          {!isAddingParty && (
            <button
              className="btn-addParty"
              data-toggle="modal"
              data-target="#addPartyModalCenter"
            >
              Add Party
            </button>
          )}
          {isAddingParty && (
            <button className="btn-addPartyLoading">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              &nbsp; Adding
            </button>
          )}
          <div className="displayParties col-md-6 offset-md-3">
            {allParties.map((party) => (
              <div className="card mb-3">
                <div className="row ms-2">
                  <div className="card-body float-container">
                    <div className="float-child">
                      <h5
                        className="card-title mt-2"
                        style={{
                          color: "black",
                          fontWeight: 200,
                          fontSize: 20,
                        }}
                      >
                        {party.name}
                      </h5>
                    </div>
                    <div className="float-child ms-4">
                      <button
                        className="partyLogo"
                        data-toggle="modal"
                        data-target="#partyLogoModalCenter"
                        id={party.partyLogo}
                        onClick={setPartyImageValue}
                      >
                        Party Logo
                      </button>
                    </div>
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

export default Parties;
