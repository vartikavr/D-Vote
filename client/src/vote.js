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
        "A voter can not vote multiple candidates."
    ]
    const [candidatesCount, setCandidatesCount] = useState(0);
    const [isError, setIsError] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const { Header, Row, HeaderCell, Body, Cell } = Table;
    const election = Election(process.env.REACT_APP_ADDRESS);
    let [candidateData, setCandidateData] = useState([]);

    useEffect(() => {
        getAddress();
        getCandidateCount();
    }, []);

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
        //setHasLoaded(false);
        const count = await election.methods.candidatesCount().call();
        setCandidatesCount(count);
        for (var i = 1; i <= count; i++) {
            const candidate = await election.methods.candidates(i).call();
            //console.log(candidate);
            candidateData.push(candidate);
        }
        // candidateData = await Promise.all(
        //     Array(parseInt(count))
        //         .fill()
        //         .map((element, index) => {
        //             return election.methods.candidates(index + 1).call();
        //         })
        // )
        console.log(candidateData);
        setHasLoaded(true);
        console.log(candidateData[1])
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
                {(candidateData != '') &&
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
                                        candidateData.map((candidate, i) => {
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
                                                                color="teal"
                                                                basic
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