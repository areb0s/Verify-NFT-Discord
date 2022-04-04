export interface UserData {
	accent_color: string | null;
	avatar: string;
	banner: string | null;
	banner_color: string | null;
	discriminator: string | null;
	flags: number;
	id: string;
	locale: string;
	mfa_enabled: boolean;
	premium_type: number;
	public_flags: number;
	username: string;
}
export interface Notification {
	message: string;
	type: string;
}
