import "./addConstituencyModal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddConstituencyModal = ({
  changeIsAddingConstituency,
  isAdmin,
  setIsChange,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const form = document.getElementById("form");
    document.getElementById("submitBtn").disabled = true;
    form.addEventListener("change", () => {
      document.getElementById("submitBtn").disabled = !form.checkValidity();
    });
  }, [name]);

  const handleAddConstituency = async () => {
    changeIsAddingConstituency(true);
    setIsChange(false);
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("/api/vote/add", { isAdmin: isAdmin, name: name }, axiosConfig)
      .then((res) => {
        toast.success("Constituency added successfully!");
        changeIsAddingConstituency(false);
        setIsChange(true);
        setName("");
      })
      .catch((e) => {
        toast.error("An error occured. Try again!");
        changeIsAddingConstituency(false);
        setName("");
      });
  };

  return (
    <div
      className="modal fade"
      id="addConstituencyModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addConstituencyModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addConstituencyModalLongTitle">
              Add new constituency
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
                  <b>Constituency Name</b>
                </label>
                <input
                  style={{ outline: "none", width: "60%" }}
                  className="ms-2"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="enter constituency name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
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
              onClick={handleAddConstituency}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddConstituencyModal;
