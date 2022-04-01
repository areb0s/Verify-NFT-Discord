import type { AbiItem } from 'web3-utils';
import {
	chainId,
	chainData,
	web3,
	selectedAccount,
	defaultEvmStores,
} from 'svelte-web3';
import contractABI from './NATInft.json';
import { NATIContract } from './store';
import { get } from 'svelte/store';

const CONTRACT_ADDRESS: string =
	import.meta.env.VITE_CONTRACT_ADDRESS?.toString();

export const walletConnect = async () => {
	await defaultEvmStores.setProvider();
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
			window.alert('서명에 실패하였습니다.');
		});
	if (hash) {
		const singedAddress = await Web3.eth.personal.ecRecover(
			data,
			hash as string
		);
		const balance = await contract.methods.balanceOf(singedAddress).call();
		return balance > 0 ? true : false;
	}
	return false;
};
