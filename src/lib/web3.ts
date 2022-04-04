import type { AbiItem } from 'web3-utils';
import {
	chainId,
	chainData,
	web3,
	selectedAccount,
	defaultEvmStores,
} from 'svelte-web3';
import contractABI from './NATInft.json';
import { setNotification } from '../lib/notification';
import { metamaskInstalled, NATIContract } from './store';
import { get } from 'svelte/store';

const CONTRACT_ADDRESS: string =
	import.meta.env.VITE_CONTRACT_ADDRESS?.toString();

export const detectMetamaskInstalled = () => {
	const { ethereum } = window as any;
	if (typeof ethereum !== 'undefined') {
		metamaskInstalled.set(true);
	}
};

export const walletConnect = async () => {
	await defaultEvmStores.setProvider();
	if (get(selectedAccount)) {
		setNotification('Connected', 'success');
	}
};

export const makeContract = () => {
	const Web3 = get(web3);
	const contract = new Web3.eth.Contract(
		contractABI as AbiItem[],
		CONTRACT_ADDRESS
	);
	NATIContract.set(contract);
};

export const verifyOwnership = async (): Promise<boolean> => {
	const Web3 = get(web3);
	const contract = get(NATIContract);
	const SelectedAccount = get(selectedAccount);
	const data = 'NFT 홀더임을 인증하기 위해서 서명해주세요.';
	const hash = await Web3.eth.personal
		.sign(data, SelectedAccount, null)
		.catch((err) => {
			console.error(err);
			setNotification('Verification Faild', 'error');
		});
	if (hash) {
		const singedAddress = await Web3.eth.personal.ecRecover(
			data,
			hash as string
		);
		const balance = await contract.methods.balanceOf(singedAddress).call();
		if (balance !== 0) setNotification('Verification Success', 'success');
		return balance === 0 ? false : true;
	}
	return false;
};
