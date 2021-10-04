import web3 from './web3';
import Election from './build/Election.json';

const instance = (address) => {
    return new web3.eth.Contract(
        JSON.parse(Election.interface),
        address
    )
};

export default instance;