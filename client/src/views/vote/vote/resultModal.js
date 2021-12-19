const ResultModal = ({ constituency }) => {
  return (
    <div
      className="modal fade"
      id="resultModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="resultModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              id="resultModalLongTitle"
              style={{ textAlign: "center", fontWeight: 700, color: "green" }}
            >
              The election has ended
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {!constituency && <p>Loading ...</p>}
            {constituency && (
              <p>
                Constituency winner :{" "}
                <span style={{ fontWeight: 700 }}>
                  {constituency.winnerParty}
                </span>
              </p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
