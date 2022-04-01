<script lang="ts">
	import { onMount } from 'svelte';

	import { getDiscordUser } from './lib/discord';
	import { discordUser } from './lib/store';

	import { walletConnect, makeContract, verifyOwnership } from './lib/web3';
	import {
		connected,
		web3,
		selectedAccount,
		chainId,
		chainData,
	} from 'svelte-web3';
	import { get } from 'svelte/store';

	import Wave from './components/Wave.svelte';
	import Spinner from './components/Spinner.svelte';

	import TailwindCss from './TailwindCSS.svelte';

	let isHolder: boolean = false;

	const verify = async () => {
		makeContract();
		isHolder = await verifyOwnership();
	};

	onMount(async () => {
		await getDiscordUser();
		// console.log($discordUser);
	});
</script>

<TailwindCss />

<Wave />

<main class="container h-screen mx-auto grid text-white place-items-center">
	{#if $discordUser}
		<div class="grid">
			<img
				class="mx-auto rounded-full"
				src="https://cdn.discordapp.com/avatars/{$discordUser.id}/{$discordUser.avatar}.png"
				alt={$discordUser.username}
			/>
			<p class="font-bold text-center">
				{$discordUser.username} #{$discordUser.discriminator}
			</p>
			<p class="text-5xl my-3 mx-auto font-bold">Welcome to NATI</p>
			{#if !$selectedAccount}
				<button
					class="mx-auto border-2 rounded-lg py-5 px-7 text-center transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-sky-600 hover:text-white"
					on:click={walletConnect}
				>
					Connect Wallet
				</button>
			{:else}
				<button
					class="mx-auto border-2 rounded-lg py-5 px-7 text-center transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-sky-600 hover:text-white"
					on:click={verify}>Verify</button
				>
				<div class="flex justify-between">
					<span>Connected</span>
					<span>{isHolder}</span>
					<span>
						{$selectedAccount.slice(
							0,
							4
						)}...{$selectedAccount.slice(-4)}
					</span>
				</div>
			{/if}
		</div>
	{:else}
		<Spinner />
	{/if}
</main>

<style>
	:global(body) {
		background-size: cover;
		background-position: center;
		font-family: 'Montserrat', sans-serif;
	}
</style>
