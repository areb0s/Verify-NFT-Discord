<script lang="ts">
	import { selectedAccount } from 'svelte-web3';
</script>

<span class="text-sm">
	{#if $selectedAccount}
		{$selectedAccount.slice(0, 4)}...{$selectedAccount.slice(-4)}
	{:else}
		Not Connected
	{/if}
</span>
