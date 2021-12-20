import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddVoterModal = ({ setIsReload, setIsAddingVoter, isAdmin }) => {
  const [voterId, setVoterId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [constituency, setConstituency] = useState("");

  useEffect(() => {
    const form = document.getElementById("form");
    document.getElementById("submitBtn").disabled = true;
    form.addEventListener("change", () => {
      document.getElementById("submitBtn").disabled = !form.checkValidity();
    });
  }, [name, voterId, constituency, address]);

  const handleAddVoter = () => {
    setIsAddingVoter(false);
    setIsReload(false);
    try {
      setIsAddingVoter(true);
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          "/api/voter/add",
          {
            isAdmin: isAdmin,
            name: name,
            voterId: voterId,
            constituency: constituency,
            address: address,
          },
          axiosConfig
        )
        .then((res) => {
          toast.success("Voter added successfully!");
          setIsReload(true);
          setIsAddingVoter(false);
          setName("");
          setAddress("");
          setConstituency("");
          setVoterId("");
        })
        .catch((e) => {
          if (e.response.data.isNotValidConstituency) {
            toast.error(
              "An error occured! Enterd constituency is not a valid constituency."
            );
          } else {
            toast.error("An error occured. Try again!");
          }
          setIsAddingVoter(false);
        });
    } catch (e) {
      setIsAddingVoter(false);
      toast.error("An error occured. Try again!");
    }
  };

  return (
    <div
      className="modal fade"
      id="addVoterModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addVoterModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addVoterModalLongTitle">
              Add new valid voter
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form id="form">
              <div className="mb-2">
                <label className="form-label">
                  <b>Voter ID</b>
                </label>
                <input
                  style={{ outline: "none", width: "60%" }}
                  className="ms-2"
                  id="voterID"
                  type="text"
                  name="voterID"
                  placeholder="enter voter ID"
                  required
                  value={voterId}
                  onChange={(event) => setVoterId(event.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  <b>Voter Name</b>
                </label>
                <input
                  style={{ outline: "none", width: "70%" }}
                  className="ms-2"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="enter voter name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  <b>Linked Account address</b>
                </label>
                <input
                  style={{ outline: "none", width: "70%" }}
                  className="ms-2"
                  id="address"
                  type="text"
                  name="address"
                  placeholder="enter linked Metamask account address"
                  required
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  <b>Associated Constituency Name</b>
                </label>
                <input
                  style={{ outline: "none", width: "70%" }}
                  className="ms-2"
                  id="constituencyName"
                  type="text"
                  name="constituencyName"
                  placeholder="enter constituency name"
                  required
                  value={constituency}
                  onChange={(event) => setConstituency(event.target.value)}
                />
              </div>
              <p style={{ color: "red" }}>*required</p>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              id="submitBtn"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={handleAddVoter}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVoterModal;
