<script lang="ts">
	import type { UserData } from './models';
	import { onMount } from 'svelte';

	import Spinner from './components/Spinner.svelte';

	import TailwindCss from './TailwindCSS.svelte';

	let params: string[] = [];
	let discordUser: UserData | undefined;

	// const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID?.toString();

	onMount(async () => {
		const url = window.location.href;
		const querys = url.split('#')[1].split('&');
		querys.map((query) => {
			const [paramName, parmaValue] = query.split('=');
			params[paramName] = parmaValue;
		});
		fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${params['token_type']} ${params['access_token']} `,
			},
		})
			.then((result) => result.json())
			.then((response) => (discordUser = response))
			.catch(console.error);
	});
</script>

<TailwindCss />

<main class="container h-screen mx-auto grid text-white place-items-center">
	{#if discordUser}
		<div class="grid">
			<img
				class="mx-auto rounded-full"
				src="https://cdn.discordapp.com/avatars/{discordUser?.id}/{discordUser?.avatar}.png"
				alt={discordUser?.username}
			/>
			<p class="font-bold text-center">
				{discordUser.username} #{discordUser.discriminator}
			</p>
			<p class="text-5xl my-3">Welcome to NATI</p>
			<button
				class="mx-auto border-2 rounded-lg py-5 px-7 text-center transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-sky-600 hover:text-white"
			>
				Connect
			</button>
		</div>
	{:else}
		<Spinner />
	{/if}
</main>

<style>
	:global(body) {
		background-image: url('/bg.jpg');
		background-size: cover;
		background-position: center;
		font-family: 'Noto Sans KR';
	}

	@font-face {
		font-family: 'Noto Sans KR';
		font-style: normal;
		font-weight: 100;
		src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2)
				format('woff2'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff)
				format('woff'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.otf)
				format('opentype');
	}
	@font-face {
		font-family: 'Noto Sans KR';
		font-style: normal;
		font-weight: 300;
		src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2)
				format('woff2'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff)
				format('woff'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.otf)
				format('opentype');
	}
	@font-face {
		font-family: 'Noto Sans KR';
		font-style: normal;
		font-weight: 400;
		src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2)
				format('woff2'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff)
				format('woff'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf)
				format('opentype');
	}
	@font-face {
		font-family: 'Noto Sans KR';
		font-style: normal;
		font-weight: 500;
		src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2)
				format('woff2'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff)
				format('woff'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf)
				format('opentype');
	}
	@font-face {
		font-family: 'Noto Sans KR';
		font-style: normal;
		font-weight: 700;
		src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2)
				format('woff2'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff)
				format('woff'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf)
				format('opentype');
	}
	@font-face {
		font-family: 'Noto Sans KR';
		font-style: normal;
		font-weight: 900;
		src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2)
				format('woff2'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff)
				format('woff'),
			url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.otf)
				format('opentype');
	}
</style>
