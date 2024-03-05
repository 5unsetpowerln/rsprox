export interface Header {
	id: number;
	name: string;
	value: string;
	value_raw: Uint8Array;
}

export class Headers {
	private array: Array<Header>;

	constructor(array: Array<Header>) {
		this.array = array;
	}

	public find_by_name(name: string) {
		return this.array.find((header) => header.name === name);
	}

	// detect content extension from content-type.
	// if content-type is 'text/html', this returns 'html' for example.
	// if content-type isn't defined or doesn't contain 'text', this returns undefined.
	public content_extension(): ContentExtension | undefined {
		const content_type = this.find_by_name('content-type');
		if (content_type === undefined) {
			return undefined;
		}

		const extension = content_type.value.split(';')[0];
		if (extension.includes('html')) {
			return 'html';
		} else if (extension.includes('javascript')) {
			return 'javascript';
		} else if (extension.includes('json')) {
			return 'json';
		}
	}

	public get_array() {
		return this.array;
	}
}

export type ContentExtension = 'html' | 'javascript' | 'json';

export function searach_header(headers: Header[], name: string) {
	for (const header of headers) {
		if (header.name === name) {
			return {
				str: header.value,
				raw: header.value_raw
			};
		}
	}
}
