const ResultModal = ({ winnerParty, totalConstituencies }) => {
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
            {winnerParty && (
              <p>
                <span style={{ fontWeight: 700 }}>{winnerParty.name}</span> won
                the election by majority. The party won{" "}
                {Math.floor(winnerParty.constituenciesWon)}/
                {totalConstituencies} constituencies.
              </p>
            )}
            {winnerParty == null && (
              <p>
                <span style={{ fontWeight: 700 }}>No party</span> won by
                majority. Alliances are expected.
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
