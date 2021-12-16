import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./constituencyHeader.css";
toast.configure();

const ConstituencyHeader = ({ isAdmin, openDropdown }) => {
  return (
    <div className="Constituencies card">
      <div className="card-head">
        <div className="card-title" title="Constituencies">
          Constituencies
        </div>
        <div
          className="card-class dropdown-menu-classroom"
          style={{ marginLeft: "auto" }}
        >
          {isAdmin && (
            <button className="menu-btn" onClick={openDropdown}>
              <img
                alt=""
                src="https://img.icons8.com/ios-glyphs/30/ffffff/menu-2.png"
              />
            </button>
          )}
          <div className="menu-content" id="menu-content">
            <button className="links">Start Election</button>
            <button className="links">End Election</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstituencyHeader;
