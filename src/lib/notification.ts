import { notification } from './store';

export const setNotification = (
	message: string,
	type: string = 'default',
	timeout: number = 2000
) => {
	notification.set({ message, type });
	const timer = setTimeout(() => {
		notification.set(null);
		clearTimeout(timer);
	}, timeout);
};
