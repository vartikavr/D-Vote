import Election from "../../../../../ethereum/election";
import axios from "axios";
import web3 from "../../../../../ethereum/web3";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react/cjs/react.development";
toast.configure();

const EditCandidateModal = ({
  setLoadingEdit,
  setIsReload,
  editCandidateInfo,
}) => {
  const election = Election(process.env.REACT_APP_ADDRESS);
  const [editName, setEditName] = useState("");
  const [editParty, setEditParty] = useState("");

  useEffect(() => {
    setValues();
  }, [editCandidateInfo]);

  const setValues = () => {
    setEditName(editCandidateInfo.name);
    setEditParty(editCandidateInfo.party);
  };

  const checkEditCandidate = async () => {
    setLoadingEdit(true);
    setIsReload(false);
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("/api/party/candidate", { party: editParty }, axiosConfig)
        .then((res) => {
          handleEditCandidate();
        })
        .catch((e) => {
          if (e.response.data.isValidParty === false) {
            toast.error(
              "An error occured. Entered party is not a valid party!"
            );
            setLoadingEdit(false);
          }
        });
    } catch (e) {
      setLoadingEdit(false);
      toast.error("An error occured. Try again!");
    }
  };

  const handleEditCandidate = async () => {
    if (
      editName === editCandidateInfo.name &&
      editParty === editCandidateInfo.party
    ) {
      toast.info("No changes required!");
      setLoadingEdit(false);
    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        await election.methods
          .editCandidate(editCandidateInfo.id, editName, editParty)
          .send({
            from: accounts[0],
          });
        setLoadingEdit(false);
        toast.success("Candidate details edited successfully!");
        setIsReload(true);
      } catch (err) {
        setLoadingEdit(false);
        toast.error(`An error occured! ${err.message}`);
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="editModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLongTitle">
              Edit candidate details
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
            {!editCandidateInfo && <p>Loading..</p>}
            {editCandidateInfo && (
              <form>
                <div className="mb-2">
                  <label className="form-label-edit">
                    <b>Candidate Name</b>
                  </label>
                  <input
                    style={{ outline: "none", width: "60%" }}
                    className="ms-2"
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={editCandidateInfo.name}
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label-edit">
                    <b>Party Name</b>
                  </label>
                  <input
                    style={{ outline: "none", width: "70%" }}
                    className="ms-2"
                    id="party"
                    type="text"
                    name="party"
                    defaultValue={editCandidateInfo.party}
                    value={editParty}
                    onChange={(event) => setEditParty(event.target.value)}
                  />
                </div>
              </form>
            )}
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
              onClick={checkEditCandidate}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCandidateModal;
