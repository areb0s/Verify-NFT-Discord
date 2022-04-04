import type { UserData, Notification } from '../models';
import type { Contract } from 'web3-eth-contract';
import { writable } from 'svelte/store';

export const metamaskInstalled = writable<boolean>(false);

export const notification = writable<Notification | null>();

export const discordUser = writable<UserData>();
export const NATIContract = writable<Contract>();
