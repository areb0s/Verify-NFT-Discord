<script lang="ts">
	import { onMount } from 'svelte';

	import TailwindCss from './TailwindCSS.svelte';

	let params: string[] = [];

	// const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID?.toString();

	const test = (t1) => {
		console.log(t1);
	};

	onMount(async () => {
		const url = window.location.href;
		const querys = url.split('#')[1].split('&');
		querys.map((query) => {
			const [paramName, parmaValue] = query.split('=');
			params[paramName] = parmaValue;
		});
		fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${params['token_type']} ${params['access_token']}`,
			},
		})
			.then((result) => console.log(result.json()))
			.then((response) => {
				test(response);
			})
			.catch(console.error);
	});
</script>

<TailwindCss />

<main class="container">
	<p>authorization: {params['token_type']} {params['access_token']}</p>
</main>

<style>
</style>
