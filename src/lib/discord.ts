import { discordUser } from './store';

let params: string[] = [];

export const getDiscordUser = async () => {
	const url = window.location.href;
	const querys = url.split('#')[1].split('&');

	querys.map((query) => {
		const [paramName, parmaValue] = query.split('=');
		params[paramName] = parmaValue;
	});
	const response = await fetch('https://discord.com/api/users/@me', {
		headers: {
			authorization: `${params['token_type']} ${params['access_token']} `,
		},
	})
		.then((result) => result.json())
		.catch(console.error);
	discordUser.set(response);
};
