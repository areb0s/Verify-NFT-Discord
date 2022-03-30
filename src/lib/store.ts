import type { UserData } from '../models';
import { writable } from 'svelte/store';

export const discordUser = writable<UserData | undefined>();
