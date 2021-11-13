import { useState, useEffect } from 'react/cjs/react.development';
import 'semantic-ui-css/semantic.min.css'
import { Message, Table, Label, Button } from 'semantic-ui-react';
import Election from '../../ethereum/election';
import FlashMessage from 'react-flash-message';
import web3 from '../../ethereum/web3';
import data from '../../seeders/data';
require('dotenv').config()

const Vote = () => {

    const msgItems = [
        "A voter can only vote once.",
        "The voter's current account address should be linked with his voter ID.",
        "The voter is recommended to re-check their current connected account address on 'My Card'."
    ]
    const [candidatesCount, setCandidatesCount] = useState(0);
    const [isError, setIsError] = useState(false); //address not found
    const [isRegistered, setIsRegistered] = useState(true); //address is registered or not
    const [loadingVote, setLoadingVote] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [errVote, setErrVote] = useState(''); //error during voting
    const [successVote, setSuccessVote] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [candidatesDisplay, setCandidatesDisplay] = useState([]);
    const [noMetamask, setNoMetamask] = useState(false);
    const { Header, Row, HeaderCell, Body, Cell } = Table;
    const election = Election(process.env.REACT_APP_ADDRESS);

    useEffect(() => {
        getAddress();
        getCandidateCount();
    }, [isReload]);

    const getAddress = async () => {
        setIsError(false);
        setNoMetamask(false);
        setIsRegistered(true);
        try {
            const storeAddress = await web3.eth.getCoinbase((err, coinbase) => { console.log(coinbase) });
            if (storeAddress == undefined) {
                setIsError(true);
            }
            else {
                let found = false;
                for(let i=0;i<data.length;i++)
                {
                    if(data[i].address.toLowerCase() == storeAddress)
                    {
                        found = true;
                        break;
                    }
                }
                if(found)
                {
                    getVoted(storeAddress);
                }
                else{
                    setIsRegistered(false);
                }
            }
        }
        catch (err) {
            setNoMetamask(true);
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

    const websiteStyle = {
        color: "white",
        borderBottom: "solid",
        borderBottomWidth: "thin",
        borderBottomColor: "black"
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
                {noMetamask && (
                    <div className="flash mb-3">
                        <FlashMessage duration={5000}>
                            <p><a href="https://metamask.io/" style={websiteStyle} target="_blank">Metamask</a> not installed. Kindly install it to continue.</p>
                        </FlashMessage>
                    </div>
                )}
                {isError && (
                    <div className="flash mb-3">
                        <FlashMessage duration={5000}>
                            <p>Address not found. Please login into your Metamask account!</p>
                        </FlashMessage>
                    </div>
                )}
                {!isError && (!isRegistered) && (
                    <div className="flash mb-3">
                        <FlashMessage duration={5000}>
                            <p>Account address not linked with a valid voterID!</p>
                        </FlashMessage>
                    </div>
                )}
                {!isError && isRegistered && (errVote != '') && (
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
                                                        (hasVoted || noMetamask || isError || !isRegistered) 
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