import { Body, type BodyFromBackend } from './body';
import { type Header, Headers } from './header';

export interface ResponseFromBackend {
	id: number;
	headers: Array<Header>;
	status: number;
	version: string;
	body: BodyFromBackend;
}

export class Response {
	private id: number;
	private headers: Headers;
	private status: number;
	private version: string;
	private body: Body;

	constructor(response_from_backend: ResponseFromBackend) {
		this.id = response_from_backend.id;
		this.headers = new Headers(response_from_backend.headers);
		this.status = response_from_backend.status;
		this.body = new Body(response_from_backend.body);
		this.version = response_from_backend.version;
	}

	public get_id() {
		return this.id;
	}

	public get_headers() {
		return this.headers;
	}

	public get_status() {
		return this.status;
	}

	public get_version() {
		return this.version;
	}

	public get_body(): Body {
		return this.body;
	}
}
