import "./deleteConstituency.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const DeleteConstituency = ({ isAdmin, constituencyId, setIsChange }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConstituency = async () => {
    setIsDeleting(true);
    setIsChange(false);
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        `/api/vote/${constituencyId}/delete`,
        { isAdmin: isAdmin },
        axiosConfig
      )
      .then((res) => {
        toast.success("Constituency deleted successfully!");
        setIsDeleting(false);
        setIsChange(true);
      })
      .catch((e) => {
        if (e.response.data.candidatesAlreadyRegistered) {
          toast.error(
            "Candidates already registered in the constituency. Selected constituency can't be deleted!"
          );
        } else {
          toast.error("An error occured. Try again!");
        }
        setIsDeleting(false);
      });
  };
  return (
    <div className="deleteConstituency">
      {!isDeleting && (
        <button
          className="deleteConstituencyBtn"
          id={constituencyId}
          onClick={handleDeleteConstituency}
        >
          Delete
        </button>
      )}
      {isDeleting && (
        <button className="deleteConstituencyLoadingBtn">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          &nbsp;Deleting
        </button>
      )}
    </div>
  );
};

export default DeleteConstituency;
