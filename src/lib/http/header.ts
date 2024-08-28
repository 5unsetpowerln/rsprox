export interface Header {
	id: number;
	name: string;
	value: string;
	value_raw: Array<number>;
}

export type HeadersToInteractWithBackend = Array<Header>;

export class Headers {
	private headers_to_interact_with_backend: HeadersToInteractWithBackend;

	constructor(headers_to_interact_with_backend: HeadersToInteractWithBackend) {
		this.headers_to_interact_with_backend = headers_to_interact_with_backend;
	}

	public find_by_name(name: string) {
		return this.headers_to_interact_with_backend.find((header) => header.name === name);
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
		} else if (extension.includes('css')) {
			return 'css';
		}
	}

	public set_headers_to_interact_with_backend(
		headers_to_interact_with_backend: HeadersToInteractWithBackend
	) {
		this.headers_to_interact_with_backend = headers_to_interact_with_backend;
	}

	public get_headers_to_interact_with_backend(): HeadersToInteractWithBackend {
		return this.headers_to_interact_with_backend;
	}
}

export type ContentExtension = 'html' | 'javascript' | 'json' | 'css';
