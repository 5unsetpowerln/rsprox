export interface ResponseFromBackend {
	id: number;
	headers: Map<string, string>;
	status: number;
	version: string;
	body: Uint8Array;
}

export class Response {
	private id: number;
	private headers: Map<string, string>;
	private status: number;
	private version: string;
	private body: Uint8Array;

	constructor(response_from_backend: ResponseFromBackend) {
		this.id = response_from_backend.id;
		this.headers = response_from_backend.headers;
		this.status = response_from_backend.status;
		this.body = response_from_backend.body;
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

	public get_body() {
		return this.body;
	}
}
