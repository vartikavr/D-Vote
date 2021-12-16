import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddPartyModal = ({ setIsReload, setIsAddingParty, isAdmin }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) toast.error("File doesn't exist!");
      const formData = new FormData();
      formData.append("files", file);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
      document.getElementById("submitBtn").disabled = true;
      document.getElementById("submitBtn").innerHTML = "Uploading ..";
      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("api/upload", formData, axiosConfig)
        .then((res) => {
          setImage(res.data.url);
          document.getElementById("submitBtn").disabled = false;
          document.getElementById("submitBtn").innerHTML = "Submit";
        })
        .catch((e) => {
          toast.error("An error occured while uploading image. Try again!");
        });
    } catch (err) {
      toast.error("An error occured. Try again!");
    }
  };

  const handleAddParty = () => {
    if (!name) toast.error("Party name not added in details!");
    if (!image) toast.error("Party logo not added in details!");
    setIsAddingParty(false);
    try {
      setIsAddingParty(true);
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          "/api/party/add",
          {
            isAdmin: isAdmin,
            name: name,
            image: image,
          },
          axiosConfig
        )
        .then((res) => {
          toast.success("Party added successfully!");
          setIsReload(true);
          setIsAddingParty(false);
          setName("");
          setImage("");
        })
        .catch((e) => {
          toast.error("An error occured. Try again!");
          setIsAddingParty(false);
        });
    } catch (e) {
      setIsAddingParty(false);
      toast.error("An error occured. Try again!");
    }
  };

  return (
    <div
      className="modal fade"
      id="addPartyModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addPartyModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addPartyModalLongTitle">
              Add new valid party
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
                  <b>Party Name</b>
                </label>
                <input
                  style={{ outline: "none", width: "70%" }}
                  className="ms-2"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="enter party name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  <b>Party Logo</b>
                </label>
                <input
                  style={{ outline: "none", width: "70%" }}
                  className="ms-2"
                  id="image"
                  type="file"
                  name="image"
                  placeholder="enter party logo"
                  onChange={handleUpload}
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
              onClick={handleAddParty}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPartyModal;
