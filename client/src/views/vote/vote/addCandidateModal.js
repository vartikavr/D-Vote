import Election from "../../../../../ethereum/election";
import web3 from "../../../../../ethereum/web3";
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
}) => {
  const election = Election(process.env.REACT_APP_ADDRESS);
  const handleAddCandidate = async () => {
    setLoadingAdd(true);
    setIsReload(false);
    try {
      const accounts = await web3.eth.getAccounts();
      await election.methods.addCandidate(name, party).send({
        from: accounts[0],
      });
      setLoadingAdd(false);
      toast.success("Candidate added successfully!");
      setIsReload(true);
    } catch (err) {
      setLoadingAdd(false);
      toast.error(`An error occured! ${err.message}`);
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
              onClick={handleAddCandidate}
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
