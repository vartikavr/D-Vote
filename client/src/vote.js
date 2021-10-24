import { useState, useEffect } from 'react/cjs/react.development';
import 'semantic-ui-css/semantic.min.css'
import { Message, Table, Label, Button } from 'semantic-ui-react';
import Election from '../../ethereum/election';
import FlashMessage from 'react-flash-message';
import web3 from '../../ethereum/web3';
require('dotenv').config()

const Vote = () => {

    const msgItems = [
        "A voter can only vote once.",
        "A voter can not vote multiple candidates at the same time.",
        "The voter is recommended to re-check their current connected account address on 'My Card'."
    ]
    const [candidatesCount, setCandidatesCount] = useState(0);
    const [isError, setIsError] = useState(false);
    const [loadingVote, setLoadingVote] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [errVote, setErrVote] = useState('');
    const [successVote, setSuccessVote] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [candidatesDisplay, setCandidatesDisplay] = useState([]);
    const { Header, Row, HeaderCell, Body, Cell } = Table;
    const election = Election(process.env.REACT_APP_ADDRESS);

    useEffect(() => {
        getAddress();
        getCandidateCount();
    }, [isReload]);

    const getAddress = async () => {
        setIsError(false);
        const storeAddress = await web3.eth.getCoinbase((err, coinbase) => { console.log(coinbase) });
        if (storeAddress == undefined) {
            setIsError(true);
        }
        else {
            getVoted(storeAddress);
        }
    }

    const getVoted = async (storeAddress) => {
        const voted = await election.methods.voters(storeAddress).call();
        setHasVoted(voted);
    }

    const getCandidateCount = async () => {
        const count = await election.methods.candidatesCount().call();
        setCandidatesCount(count);
        let candidateData = [];
        for (var i = 1; i <= count; i++) {
            const candidate = await election.methods.candidates(i).call();
            candidateData.push(candidate);
        }
        console.log(candidateData);
        setCandidatesDisplay(candidateData);
    }

    const handleVote = async (event) => {
        setLoadingVote(true);
        setErrVote('');
        setIsReload(false);
        setSuccessVote(false);
        try {
            const accounts = await web3.eth.getAccounts();
            await election.methods.vote(event.target.id).send({
                from: accounts[0]
            });
            setLoadingVote(false);
            setSuccessVote(true);
            setIsReload(true);
        }
        catch (err) {
            setLoadingVote(false);
            setErrVote(err.message);
            setSuccessVote(false);
        }
    }

    return (
        <div className="cast-vote">
            <div className="container col-md-8 p-5">
                <h2>Cast your Vote</h2>
                <Message
                    info
                    style={{ overflowWrap: 'break-word' }}
                >
                    <Message.Header>Important!</Message.Header>
                    <Message.List items={msgItems} />
                </Message>
                {isError && (
                    <div className="flash mb-3">
                        <FlashMessage duration={5000}>
                            <p>Address not found. Please login into your Metamask account!</p>
                        </FlashMessage>
                    </div>
                )}
                {!isError && (errVote != '') && (
                    <div className="flash mb-3">
                        <FlashMessage duration={5000}>
                            <p>An error occured!<br />{errVote}</p>
                        </FlashMessage>
                    </div>
                )}
                {successVote && (
                    <div className="flash-success mb-3">
                        <FlashMessage duration={5000}>
                            <p>Voted successfully!</p>
                        </FlashMessage>
                    </div>
                )}
                {(candidatesDisplay != '') &&
                    (
                        <div className="candidateTable">
                            <Table>
                                <Header>
                                    <Row>
                                        <HeaderCell>ID</HeaderCell>
                                        <HeaderCell>Candidate Name</HeaderCell>
                                        <HeaderCell>Party</HeaderCell>
                                        <HeaderCell>Voter Count</HeaderCell>
                                        <HeaderCell>Vote</HeaderCell>
                                    </Row>
                                </Header>
                                <Body>
                                    {
                                        candidatesDisplay.map((candidate, i) => {
                                            return <Row>
                                                <Cell>
                                                    <Label ribbon>{candidate.id}</Label>
                                                </Cell>
                                                <Cell>{candidate.name}</Cell>
                                                <Cell>{candidate.party}</Cell>
                                                <Cell>{candidate.voteCount}</Cell>
                                                <Cell>
                                                    {
                                                        hasVoted
                                                            ?
                                                            <Button
                                                                disabled
                                                            >Vote</Button>
                                                            :
                                                            <Button
                                                                id={candidate.id}
                                                                loading={loadingVote}
                                                                color="teal"
                                                                basic
                                                                onClick={handleVote}
                                                            >Vote</Button>
                                                    }
                                                </Cell>
                                            </Row>
                                        })
                                    }
                                </Body>
                            </Table>
                            <p>Found {candidatesCount} candidates.</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Vote;