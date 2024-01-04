export class Body {
	private str: string;
	private raw: Uint8Array;

	constructor(str: string, raw: Uint8Array) {
		this.str = str;
		this.raw = raw;
	}

	public get_str(): string {
		return this.str;
	}

	public get_raw(): Uint8Array {
		return this.raw;
	}
}
