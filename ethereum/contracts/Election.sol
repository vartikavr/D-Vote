pragma solidity >=0.5.16;

contract Election {
    struct Candidate {
        uint256 id;
        string name;
        string party;
        uint256 voteCount;
    }
    mapping(address => bool) public voters; //accounts which have voted already
    mapping(uint256 => Candidate) public candidates; //access candidate values
    uint256 public candidatesCount; //total number of candidates

    //Events are inheritable members of contracts.
    //When you call them, they cause the arguments to be stored in the transaction’s log, a special data structure in the blockchain.
    //events can be indexed or not indexed
    event votedEvent(uint256 indexed _candidateId);

    //Constructor function
    constructor() public {
        addCandidate("Amar Singh Rai", "All India Trinamool Congress");
        addCandidate("Raju Bista", "Bharatiya Janata Party");
        addCandidate("Saman Pathak", "Communist Party Of India (Marxist)");
        addCandidate("Sankar Malakar", "Indian National Congress");
        addCandidate("Sudip Mandal", "Bahujan Samaj Party");
        addCandidate("NOTA", "None of the above");
    }

    function addCandidate(string memory name, string memory party) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            name,
            party,
            0
        );
    }

    function vote(uint256 _candidateId) public {
        require(!voters[msg.sender]); //haven't voted yet
        require(_candidateId > 0 && _candidateId <= candidatesCount); //valid candidate
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit votedEvent(_candidateId);
    }
}
