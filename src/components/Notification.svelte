<script lang="ts">
	import { notification } from '../lib/store';
</script>

<span
	class="text-sm
    {$notification?.type == 'success' ? 'text-green-400' : ''}
    {$notification?.type == 'error' ? 'text-red-400' : ''}
    "
>
	{#if $notification?.message}
		{$notification?.message}
	{:else}
		<slot />
	{/if}
</span>
