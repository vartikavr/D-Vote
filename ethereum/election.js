import web3 from './web3';
import compiledElection from './build/Election.json';

const instance = (address) => {
    return new web3.eth.Contract(
        compiledElection.Election.abi,
        address
    )
};

export default instance;