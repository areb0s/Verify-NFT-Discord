import type { UserData } from '../models';
import type { Contract } from 'web3-eth-contract';
import { writable } from 'svelte/store';

export const discordUser = writable<UserData>();
export const NATIContract = writable<Contract>();
