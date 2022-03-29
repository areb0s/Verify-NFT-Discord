<script lang="ts">
	import { onMount } from 'svelte';

	import TailwindCss from './TailwindCSS.svelte';

	let params: string[] = [];

	// const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID?.toString();

	onMount(async () => {
		const url = window.location.href;
		const querys = url.split('?');
		const redirect_uri = querys.shift();
		querys.map((query) => {
			const [paramName, parmaValue] = query.split('=');
			params[paramName] = parmaValue;
		});
		fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${params['tokenType']} ${params['accessToken']}`,
			},
		})
			.then((result) => console.log(result.json()))
			.then((response) => {
				console.log(response);
			});
	});
</script>

<TailwindCss />

<main class="container">
	<p>{params['code']}</p>
</main>

<style>
</style>
