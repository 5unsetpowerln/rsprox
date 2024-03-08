export type Charset = 'UTF_8' | 'SHIFT_JIS';

export const charset_options: Array<{ id: string; text: Charset }> = [
	{ id: '0', text: 'UTF_8' },
	{ id: '1', text: 'SHIFT_JIS' }
];

export interface BodyToInteractWithBackend {
	charset: Charset;
	str: string;
	raw: Uint8Array;
}

export class Body {
	private body_to_interact_with_backend: BodyToInteractWithBackend;

	constructor(body_to_interact_with_backendt: BodyToInteractWithBackend) {
		this.body_to_interact_with_backend = body_to_interact_with_backendt;
	}

	public get_str(): string {
		return this.body_to_interact_with_backend.str;
	}

	public get_raw(): Uint8Array {
		return this.body_to_interact_with_backend.raw;
	}

	public get_charset(): Charset {
		return this.body_to_interact_with_backend.charset;
	}

	public get_length(): number {
		return this.body_to_interact_with_backend.raw.length;
	}

	public get_body_to_interact_with_backend(): BodyToInteractWithBackend {
		return this.body_to_interact_with_backend;
	}
}
