const PartyLogo = ({ partyLogo }) => {
  return (
    <div
      className="modal fade"
      id="partyLogoModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="partyLogoModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="partyLogoModalLongTitle">
              Party Logo
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
            {partyLogo == "" && <p>Loading...</p>}
            {partyLogo != "" && (
              <img src={partyLogo} alt="Party logo" width="100" height="300" />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyLogo;
