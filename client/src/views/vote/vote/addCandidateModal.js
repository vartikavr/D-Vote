import Election from "../../../../../ethereum/election";
import web3 from "../../../../../ethereum/web3";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddCandidateModal = ({
  setLoadingAdd,
  setIsReload,
  name,
  setName,
  party,
  setParty,
  constituency,
  isAdmin,
}) => {
  const election = Election(process.env.REACT_APP_ADDRESS);
  const { id } = useParams();

  const checkAddCandidate = async () => {
    setLoadingAdd(true);
    setIsReload(false);
    try {
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("/api/party/candidate", { party: party }, axiosConfig)
        .then((res) => {
          handleAddCandidate();
        })
        .catch((e) => {
          if (e.response.data.isValidParty === false) {
            toast.error(
              "An error occured. Entered party is not a valid party!"
            );
            setLoadingAdd(false);
          }
        });
    } catch (e) {
      setLoadingAdd(false);
      toast.error("An error occured. Try again!");
    }
  };

  const handleAddCandidate = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await election.methods.addCandidate(name, party, constituency.name).send({
        from: accounts[0],
      });
      const candidateId = await election.methods.candidatesCount().call();
      //add candidateId into its constituency record in backend
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          `/api/vote/${id}/add`,
          { isAdmin: isAdmin, candidateId: candidateId },
          axiosConfig
        )
        .then((res) => {
          setLoadingAdd(false);
          setIsReload(true);
          setName("");
          setParty("");
          toast.success("Candidate added successfully!");
        })
        .catch((e) => {
          setLoadingAdd(false);
          toast.error("An error occured. Try again!");
        });
    } catch (e) {
      toast.error("An error occured! Try again.");
      setLoadingAdd(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="addModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addModalLongTitle">
              Add new candidate
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
                  <b>Candidate Name</b>
                </label>
                <input
                  style={{ outline: "none", width: "60%" }}
                  className="ms-2"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="enter candidate name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  <b>Party Name</b>
                </label>
                <input
                  style={{ outline: "none", width: "70%" }}
                  className="ms-2"
                  id="party"
                  type="text"
                  name="party"
                  placeholder="enter party name"
                  required
                  value={party}
                  onChange={(event) => setParty(event.target.value)}
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
              onClick={checkAddCandidate}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateModal;
