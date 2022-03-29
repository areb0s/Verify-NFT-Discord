<script lang="ts">
	import TailwindCss from './TailwindCSS.svelte';

	const fragment = new URLSearchParams(window.location.hash.slice(1));
	const [accessToken, tokenType] = [
		fragment.get('access_token'),
		fragment.get('token_type'),
	];
	console.log(accessToken, tokenType);
</script>

<TailwindCss />
<main class="container">
	<p>test</p>
	<div />
</main>

<style>
</style>
