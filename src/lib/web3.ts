import contractABI from './NATInft.json';
import Web3 from 'web3';

// const CONTRACT_ADDRESS: string =
// 	import.meta.env.VITE_CONTRACT_ADDRESS?.toString();

window.process = {
	...window.process,
};

const { ethereum } = window as any;
// const web3 = new Web3(ethereum);
// const NATIContract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
let accounts;

export const walletConnect = async () => {
	accounts = await ethereum.request({
		method: 'eth_requestAccounts',
	});
};
