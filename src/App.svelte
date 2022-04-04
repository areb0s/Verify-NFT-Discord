<script lang="ts">
	import { onMount } from 'svelte';

	import { getDiscordUser } from './lib/discord';
	import { metamaskInstalled, discordUser } from './lib/store';

	import {
		detectMetamaskInstalled,
		walletConnect,
		makeContract,
		verifyOwnership,
	} from './lib/web3';
	import {
		connected,
		web3,
		selectedAccount,
		chainId,
		chainData,
	} from 'svelte-web3';

	import Wave from './components/Wave.svelte';
	import Button from './components/Button.svelte';
	import Notification from './components/Notification.svelte';
	import WalletInformation from './components/WalletInformation.svelte';
	import Spinner from './components/Spinner.svelte';

	import TailwindCss from './TailwindCSS.svelte';

	let isHolder: boolean = false;

	const verify = async () => {
		makeContract();
		isHolder = await verifyOwnership();
	};

	onMount(async () => {
		await getDiscordUser();
		await detectMetamaskInstalled();
	});
</script>

<TailwindCss />

<Wave />

<main class="container h-screen mx-auto grid text-white place-items-center">
	{#if $discordUser}
		<div
			class="grid border-2 border-[rgba(255,255,255,0.3)] rounded-[20px] bg-[rgba(0,0,0,0.6)] px-[60px] py-[40px]"
		>
			<img
				class="mx-auto rounded-full"
				src="https://cdn.discordapp.com/avatars/{$discordUser.id}/{$discordUser.avatar}.png"
				alt={$discordUser.username}
			/>
			<p class="font-bold text-center mt-3">
				{$discordUser.username} #{$discordUser.discriminator}
			</p>
			<p class="text-5xl my-3 mx-auto font-bold">Welcome to NATI</p>
			{#if $metamaskInstalled}
				<div class="mx-auto mt-5 mb-10">
					{#if !$selectedAccount}
						<Button onclick={walletConnect}>Connect Wallet</Button>
					{:else}
						<Button onclick={verify}>Verify</Button>
					{/if}
				</div>
				<div class="flex justify-between">
					<WalletInformation />
					<Notification>Powered by NATI</Notification>
					<!-- <span>{isHolder}</span> -->
				</div>
			{:else}
				<p class="mx-auto">Please Install Wallet</p>
				<div class="flex justify-between">
					<a href="https://metamask.io/download/">METAMASK</a>
					<a
						href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
						>KAIKAS</a
					>
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
