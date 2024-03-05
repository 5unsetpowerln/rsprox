import { Body, type BodyFromBackend } from './body';
import { type Header, Headers } from './header';
import type { Response } from './response';

export interface RequestFromBackend {
	id: number;
	headers: Array<Header>;
	uri: string;
	method: string;
	version: string;
	body: BodyFromBackend;
}

export class Request {
	private id: number;
	private headers: Headers;
	private uri: string;
	private method: string;
	private version: string;
	private body: Body;

	constructor(request_from_backend: RequestFromBackend) {
		this.id = request_from_backend.id;
		this.uri = request_from_backend.uri;
		this.headers = new Headers(request_from_backend.headers);
		this.method = request_from_backend.method;
		this.version = request_from_backend.version;
		this.body = new Body(request_from_backend.body);
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

	public get_headers(): Headers {
		return this.headers;
	}

	public get_version(): string {
		return this.version;
	}

	public get_body(): Body {
		return this.body;
	}
}

export interface RequestResponsePair {
	id: number;
	request: Request | undefined;
	response: Response | undefined;
}
