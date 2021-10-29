import CardSvg from './images/myCard.svg';
import { useState, useEffect } from "react";
import web3 from '../../ethereum/web3';
import FlashMessage from 'react-flash-message';
import Election from '../../ethereum/election';
require('dotenv').config()

const Card = () => {

    const [address, setAddress] = useState(undefined);
    const [isError, setIsError] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [noMetamask, setNoMetamask] = useState(false);

    window.setTimeout(function () {
        window.location.reload(); //reload page after 1min (60 sec)
    }, 60000);

    useEffect(() => {
        getAddress();
        // console.log(address);
    }, []);

    const getAddress = async () => {
        setIsError(false);
        setNoMetamask(false);
        try {
            const storeAddress = await web3.eth.getCoinbase((err, coinbase) => { console.log(coinbase) });
            //console.log(storeAddress);
            setAddress(storeAddress);
            if (storeAddress == undefined) {
                setIsError(true);
            }
            else {
                getVoted(storeAddress);
            }
        }
        catch (err) {
            setNoMetamask(true);
        }
    }

    const getVoted = async (storeAddress) => {
        //console.log(process.env.REACT_APP_ADDRESS);
        const election = Election(process.env.REACT_APP_ADDRESS);
        //console.log(election);
        //console.log(storeAddress);
        const voted = await election.methods.voters(storeAddress).call();
        setHasVoted(voted);
        //console.log(hasVoted)
    }

    const websiteStyle = {
        color: "white",
        borderBottom: "solid",
        borderBottomWidth: "thin",
        borderBottomColor: "black"
    }

    return (
        <div className="my-card">
            <div className="card shadow col-4 col-lg-6 offset-4 offset-lg-3">
                {isError && (
                    <div className="flash">
                        <FlashMessage duration={5000}>
                            <p>Address not found. Please login into your Metamask account!</p>
                        </FlashMessage>
                    </div>
                )}
                {noMetamask && (
                    <div className="flash">
                        <FlashMessage duration={5000}>
                            <p><a href="https://metamask.io/" style={websiteStyle} target="_blank">Metamask</a> not installed. Kindly install it to continue.</p>
                        </FlashMessage>
                    </div>
                )}
                <div className="row no-gutters">
                    <div className="col-lg-4">
                        <img src={CardSvg} className="card-img" alt="generalized card picture" />
                    </div>
                    <div className="col-lg-8">
                        <div class="card-body">
                            <h5 className="card-title">My DVote Card</h5>
                            <p className="card-text">This is a digital voter ID card, containing the linked account address of voter and other essential details.</p>
                            <p className="card-text"><span className="card-text-heading" style={{ fontWeight: 550 }}>Account address : </span>{address}</p>
                            <p className="card-text"><span className="card-text-heading" style={{ fontWeight: 550 }}>Voted : </span>{'' + hasVoted}</p>
                            <p className="card-text"><small class="text-muted">Last updated 1 min ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;