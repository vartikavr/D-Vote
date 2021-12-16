import "./constituency.css";
import { useState, useEffect } from "react";
import Election from "../../../../../ethereum/election";
import web3 from "../../../../../ethereum/web3";
import axios from "axios";
import ConstituencyHeader from "../constituencyHeader/constituencyHeader";
import Searchbar from "./searchBar";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddConstituencyModal from "../addConstituencyModal/addConstituencyModal";
import DeleteConstituency from "./deleteConstituency";
toast.configure();
require("dotenv").config();

const Constituency = () => {
  const [allConstituencies, setAllConstituencies] = useState({});
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [endPending, setEndPending] = useState(false);
  const [isAddingConstituency, setIsAddingConstituency] = useState(false);
  const [isChange, setIsChange] = useState(false); //for changes like adding constituency
  const election = Election(process.env.REACT_APP_ADDRESS);

  useEffect(() => {
    getConstituencies();
  }, [isChange]);

  useEffect(() => {
    checkIfAdmin();
  }, []);

  const getConstituencies = async (req, res) => {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("/api/vote", {}, axiosConfig)
      .then((res) => {
        setAllConstituencies(res.data.constituencies);
        console.log(res.data.constituencies);
        setEndPending(true);
      })
      .catch((e) => {
        toast.error("An error occured. Try again!");
        setEndPending(true);
      });
  };

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
        }
      }
    } catch (err) {
      console.log("An error occured while checking for admin");
    }
  };

  const openDropdown = () => {
    let menuContent = document.querySelector(".menu-content");
    if (menuContent.style.display === "") {
      menuContent.style.display = "block";
    } else {
      menuContent.style.display = "";
    }
  };

  return (
    <div className="constituency">
      <AddConstituencyModal
        changeIsAddingConstituency={setIsAddingConstituency}
        isAdmin={isAdmin}
        setIsChange={setIsChange}
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
        <div className="col-sm-8 offset-sm-2">
          <div className="containerConstituency">
            <ConstituencyHeader isAdmin={isAdmin} openDropdown={openDropdown} />
            {isAdmin && !isAddingConstituency && (
              <div className="constituency-btn">
                <button
                  className="btn-addConstituency"
                  data-toggle="modal"
                  data-target="#addConstituencyModalCenter"
                >
                  Add Constituency
                </button>
              </div>
            )}
            {isAdmin && isAddingConstituency && (
              <div className="constituency-btn">
                <button className="btn-addConstituencyLoading" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp;Adding..
                </button>
              </div>
            )}
            {/* {global.startElection && (
              <p style={{ textAlign: "center", fontWeight: 200 }}>
                The election has started.
              </p>
            )}
            {global.endElection && (
              <p style={{ textAlign: "center", fontWeight: 200 }}>
                The election has ended.
              </p>
            )} */}
            <Searchbar searchValue={search} changeSearchValue={setSearch} />
            <div className="row">
              {allConstituencies &&
                allConstituencies.map((constituency) =>
                  constituency.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ? (
                    <div className="col-lg-6 col-xl-4 d-flex align-items justify-content-center">
                      <div className="icon-box">
                        <Link
                          to={`/${constituency._id}/vote`}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                          }}
                        >
                          <div className="icon">
                            <i className="bx bx-map"></i>
                          </div>
                          <h4
                            className="constituencyHeading"
                            title={`${constituency.name}`}
                            style={{ color: "#4b8ef1" }}
                          >
                            {constituency.name}
                          </h4>
                        </Link>
                        {isAdmin && (
                          <DeleteConstituency
                            isAdmin={isAdmin}
                            constituencyId={constituency._id}
                            setIsChange={setIsChange}
                          />
                        )}
                      </div>
                    </div>
                  ) : null
                )}
              {!allConstituencies.some((constituency) =>
                constituency.name.toLowerCase().includes(search.toLowerCase())
              ) ? (
                <h3
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    fontSize: 20,
                    fontWeight: 350,
                  }}
                >
                  No constituencies to show.
                </h3>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Constituency;
