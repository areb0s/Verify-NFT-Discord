<script lang="ts">
	import { onMount } from 'svelte';

	import TailwindCss from './TailwindCSS.svelte';

	let params: string[] = [];

	const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID?.toString();
	const CLIENT_SECRET: string =
		import.meta.env.VITE_CLIENT_SECRET?.toString();
	const API_ENDPOINT: string = import.meta.env.VITE_API_ENDPOINT?.toString();

	onMount(async () => {
		const url = window.location.href;
		const querys = url.split('?');
		const redirect_uri = querys.shift();
		querys.map((query) => {
			const [paramName, parmaValue] = query.split('=');
			params[paramName] = parmaValue;
		});
		const test = await fetch(API_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				grant_type: 'authorization_code',
				code: params['code'],
				redirect_uri: redirect_uri,
			}),
		});
		console.log(test);
	});
</script>

<TailwindCss />

<main class="container">
	<p>{params['code']}</p>
</main>

<style>
</style>
