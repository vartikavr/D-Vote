const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledElection = require("../ethereum/build/Election.json");

let accounts, election, candidateInfo, hasVoted;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  election = await new web3.eth.Contract(compiledElection.Election.abi)
    .deploy({ data: compiledElection.Election.evm.bytecode.object })
    .send({ from: accounts[0], gas: "3000000" });

  election.setProvider(provider);
});

describe("Election", () => {
  it("deploys election contract and initializes with six initial given values of candidates", async () => {
    assert.ok(election.options.address);
    const count = await election.methods.candidatesCount().call();
    assert.equal(count, 6);
  });

  it("initializes the given candidates with the correct values", async () => {
    candidateInfo = await election.methods.candidates(6).call();
    assert.equal(candidateInfo.id, 6, "contains the correct id");
    assert.equal(candidateInfo.name, "NOTA", "contains the correct name");
    assert.equal(
      candidateInfo.party,
      "None of the above",
      "contains the correct party"
    );
    assert.equal(
      candidateInfo.voteCount,
      0,
      "contains the correct votes count"
    );
  });

  it("adds and edits a new candidate by admin", async () => {
    await election.methods.addCandidate("Modi", "BJP").send({
      from: accounts[0],
      gas: "1000000",
    });
    candidateInfo = await election.methods.candidates(7).call();
    assert.equal(candidateInfo.id, 7, "contains correct id");
    assert.equal(candidateInfo.name, "Modi", "contains correct name");
    assert.equal(candidateInfo.party, "BJP", "contains the correct party");
    assert.equal(
      candidateInfo.voteCount,
      0,
      "contains the correct votes count"
    );
    await election.methods.editCandidate(7, "Vartika", "Congress").send({
      from: accounts[0],
      gas: "1000000",
    });
    candidateInfo = await election.methods.candidates(7).call();
    assert.equal(candidateInfo.id, 7, "contains correct id");
    assert.equal(candidateInfo.name, "Vartika", "contains correct name");
    assert.equal(candidateInfo.party, "Congress", "contains the correct party");
    assert.equal(
      candidateInfo.voteCount,
      0,
      "contains the correct votes count"
    );
  });

  it("allows a voter to cast a vote", async () => {
    hasVoted = await election.methods.voters(accounts[1]).call();
    assert.equal(hasVoted, false, "not voted yet");
    await election.methods.vote(3).send({
      from: accounts[1],
    });
    hasVoted = await election.methods.voters(accounts[1]).call();
    assert.equal(hasVoted, true, "successfully voted");
    candidateInfo = await election.methods.candidates(3).call();
    assert.equal(
      candidateInfo.voteCount,
      1,
      "vote count successfully increased"
    );
  });

  it("doesn't vote for invalid candidates", async () => {
    try {
      await election.methods.vote(99).send({
        from: accounts[0],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("doesn't allow multiple voting by same voter", async () => {
    await election.methods.vote(5).send({
      from: accounts[1],
    });
    try {
      await election.methods.vote(1).send({
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
