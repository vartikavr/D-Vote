pragma solidity >=0.5.16;

contract Election {
    address public manager;
    struct Candidate {
        uint256 id;
        string name;
        string party;
        string constituency;
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
        manager = msg.sender;
        // addCandidate(
        //     "Amar Singh Rai",
        //     "All India Trinamool Congress",
        //     "Vijaypur"
        // );
        // addCandidate("Raju Bista", "Bharatiya Janata Party", "Vijaypur");
        // addCandidate(
        //     "Saman Pathak",
        //     "Communist Party Of India (Marxist)",
        //     "Sabalgarh"
        // );
        // addCandidate("Sankar Malakar", "Indian National Congress", "Sabalgarh");
        // addCandidate("Sudip Mandal", "Bahujan Samaj Party", "Morena");
    }

    modifier admin() //function modifier, to reduce the amount of code that we'll write; think of this as a macro
    {
        require(msg.sender == manager);
        _;
    }

    function addCandidate(
        string memory name,
        string memory party,
        string memory constituency
    ) public admin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            name,
            party,
            constituency,
            0
        );
    }

    function editCandidate(
        uint256 cid,
        string memory name,
        string memory party
    ) public admin {
        require(candidates[cid].voteCount == 0);
        candidates[cid].name = name;
        candidates[cid].party = party;
    }

    function vote(uint256 _candidateId) public {
        require(!voters[msg.sender]); //haven't voted yet
        require(_candidateId > 0 && _candidateId <= candidatesCount); //valid candidate
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit votedEvent(_candidateId);
    }
}
