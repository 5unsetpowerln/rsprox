import { Body } from './body';
import type { Header } from './header';

export interface RequestFromBackend {
	id: number;
	// headers: Map<string, string>;
	headers: Header[];
	uri: string;
	method: string;
	version: string;
	body: string;
	body_raw: Uint8Array;
}

export class Request {
	private id: number;
	// private headers: Map<string, string>;
	private headers: Header[];
	private uri: string;
	private method: string;
	private version: string;
	private body: Body;
	// private body_raw: Uint8Array;

	constructor(request_from_backend: RequestFromBackend) {
		this.id = request_from_backend.id;
		this.uri = request_from_backend.uri;
		this.headers = request_from_backend.headers;
		this.method = request_from_backend.method;
		this.version = request_from_backend.version;
		this.body = new Body(request_from_backend.body, request_from_backend.body_raw);
	}

	public get_id(): number {
		return this.id;
	}

	public get_method(): string {
		return this.method;
	}

	public get_uri(): string {
		return this.uri;
	}

	public get_headers(): Header[] {
		return this.headers;
	}

	public get_version(): string {
		return this.version;
	}

	public get_body(): Body {
		return this.body;
	}
}
