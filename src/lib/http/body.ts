export type Charset = 'UTF_8' | 'SHIFT_JIS';

export const charset_options: Array<{ id: string; text: Charset }> = [
	{ id: '0', text: 'UTF_8' },
	{ id: '1', text: 'SHIFT_JIS' }
];

export interface BodyToInteractWithBackend {
	charset: Charset;
	str: string;
	raw: Array<number>;
}

export class Body {
	private body_to_interact_with_backend: BodyToInteractWithBackend;

	constructor(body_to_interact_with_backendt: BodyToInteractWithBackend) {
		this.body_to_interact_with_backend = body_to_interact_with_backendt;
	}

	public get_str(): string {
		return this.body_to_interact_with_backend.str;
	}

	public set_str(str: string) {
		this.body_to_interact_with_backend.str = str;
	}

	public get_raw(): Array<number> {
		return this.body_to_interact_with_backend.raw;
	}

	public set_raw(data: Array<number>) {
		this.body_to_interact_with_backend.raw = data;
	}

	public get_charset(): Charset {
		return this.body_to_interact_with_backend.charset;
	}

	public set_charset(charset: Charset) {
		this.body_to_interact_with_backend.charset = charset;
	}

	public get_length(): number {
		return this.body_to_interact_with_backend.raw.length;
	}

	public get_body_to_interact_with_backend(): BodyToInteractWithBackend {
		return this.body_to_interact_with_backend;
	}
}
