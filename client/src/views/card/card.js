import "./card.css";
import { useState, useEffect } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import web3 from "../../../../ethereum/web3";
import Election from "../../../../ethereum/election";
import data from "../../../../seeders/data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
require("dotenv").config();

const Card = () => {
  const [address, setAddress] = useState(undefined);
  const [isError, setIsError] = useState(false); //address found or not
  const [isRegistered, setIsRegistered] = useState(true); //address is registered or not
  const [hasVoted, setHasVoted] = useState(false);
  const [noMetamask, setNoMetamask] = useState(false);
  const [voterDetails, setVoterDetails] = useState("");

  window.setTimeout(function () {
    window.location.reload(); //reload page after 1min (60 sec)
  }, 60000);

  useEffect(() => {
    getAddress();
    // console.log(address);
  }, []);

  const getAddress = async () => {
    setNoMetamask(false);
    setIsError(false);
    setIsRegistered(true);
    try {
      const storeAddress = await web3.eth.getCoinbase((err, coinbase) => {
        // console.log(coinbase);
      });
      //console.log(storeAddress);
      setAddress(storeAddress);
      if (storeAddress == undefined) {
        setIsError(true);
        toast.error(
          "Address not found. Please login into your Metamask account!"
        );
      } else {
        let foundIndex = -1;
        for (let i = 0; i < data.length; i++) {
          if (data[i].address.toLowerCase() == storeAddress) {
            foundIndex = i;
            break;
          }
        }
        if (foundIndex != -1) {
          setVoterDetails(data[foundIndex]);
          getVoted(storeAddress);
        } else {
          setIsRegistered(false);
          toast.error(
            "An error occured. Account address not linked with a valid voterID!"
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
      const election = Election(process.env.REACT_APP_ADDRESS);
      const voted = await election.methods.voters(storeAddress).call();
      setHasVoted(voted);
    } catch (e) {
      toast.error("An error occured. Plese try again!");
    }
  };

  return (
    <div className="my-card">
      <div className="col-lg-6 offset-lg-3">
        <div className="row no-gutters">
          <div class="card-body" style={{ textAlign: "center" }}>
            <Flippy
              flipOnHover={true}
              flipDirection="vertical"
              className="flippy-card"
            >
              <FrontSide className="flippy-card-front">
                <h5 className="card-title" style={{ color: "#fff" }}>
                  My DVote Card
                </h5>
                <p className="card-text">
                  This is a{" "}
                  <span style={{ fontWeight: "600" }}>
                    <em>digital voter ID card</em>
                  </span>
                  , containing the linked account address of voter and other
                  essential details. <em>Hover</em> on the card to view more
                  details.
                </p>
                <p className="card-text">
                  <span
                    className="card-text-heading"
                    style={{ fontWeight: 550, color: "#fff" }}
                  >
                    Account address :{" "}
                  </span>
                  {!noMetamask && !isError ? (
                    address
                  ) : (
                    <span style={{ color: "red" }}>Not Connected</span>
                  )}
                </p>
              </FrontSide>
              <BackSide className="flippy-card-back">
                <h5 className="card-title" style={{ color: "#4b8ef1" }}>
                  My DVote Card
                </h5>
                <p className="card-text">
                  <span
                    className="card-text-heading"
                    style={{ fontWeight: 550, color: "#4b8ef1" }}
                  >
                    Voter ID :{" "}
                  </span>
                  {!noMetamask && !isError && isRegistered ? (
                    voterDetails.voterID
                  ) : (
                    <span style={{ color: "red" }}>Not Connected</span>
                  )}
                </p>
                <p className="card-text">
                  <span
                    className="card-text-heading"
                    style={{ fontWeight: 550, color: "#4b8ef1" }}
                  >
                    Voter's name :{" "}
                  </span>
                  {!noMetamask && !isError && isRegistered ? (
                    voterDetails.name
                  ) : (
                    <span style={{ color: "red" }}>Not Connected</span>
                  )}
                </p>
                <p className="card-text">
                  <span
                    className="card-text-heading"
                    style={{ fontWeight: 550, color: "#4b8ef1" }}
                  >
                    Voted :{" "}
                  </span>
                  {"" + hasVoted}
                </p>
                <p className="card-text">
                  <small class="text-muted">Last updated 1 min ago</small>
                </p>
              </BackSide>
            </Flippy>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
