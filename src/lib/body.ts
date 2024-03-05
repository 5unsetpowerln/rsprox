export type Charset = 'UTF_8' | 'SHIFT_JIS';

export const charset_options: Array<{ id: string; text: Charset }> = [
	{ id: '0', text: 'UTF_8' },
	{ id: '1', text: 'SHIFT_JIS' }
];

export interface BodyFromBackend {
	charset: Charset;
	str: string;
	raw: Uint8Array;
}

export class Body {
	private charset: Charset;
	private str: string;
	private raw: Uint8Array;

	constructor(body_from_backend: BodyFromBackend) {
		this.charset = body_from_backend.charset;
		this.str = body_from_backend.str;
		this.raw = body_from_backend.raw;
	}

	public get_str(): string {
		return this.str;
	}

	public get_raw(): Uint8Array {
		return this.raw;
	}

	public get_charset(): Charset {
		return this.charset;
	}

	public get_length(): number {
		return this.raw.length;
	}
}
