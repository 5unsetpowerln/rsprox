import { Body, type BodyToInteractWithBackend } from './body';
import { Headers, type HeadersToInteractWithBackend } from './header';

export interface ResponseToInteractWithBackend {
	id: number;
	headers: HeadersToInteractWithBackend;
	status: number;
	version: string;
	body: BodyToInteractWithBackend;
}

export class Response {
	public id: number;
	public headers: Headers;
	public status: number;
	public version: string;
	public body: Body;

	constructor(response_from_backend: ResponseToInteractWithBackend) {
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
