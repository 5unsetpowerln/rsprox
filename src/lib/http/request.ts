import { Ok, Err, type Result } from '$lib/error';
import { Body, type BodyToInteractWithBackend } from './body';
import { Headers, type HeadersToInteractWithBackend } from './header';
import { Response, type ResponseToInteractWithBackend } from './response';
import { invoke } from '@tauri-apps/api/tauri';

export interface RequestToInteractWithBackend {
	id: number;
	headers: HeadersToInteractWithBackend;
	uri: string;
	method: string;
	version: string;
	body: BodyToInteractWithBackend;
}

export class Request {
	private id: number;
	private headers: Headers;
	private uri: string;
	private method: string;
	private version: string;
	private body: Body;

	constructor(request_from_backend: RequestToInteractWithBackend) {
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

	public async send(): Promise<Result<Response>> {
		const request_to_backend: RequestToInteractWithBackend = {
			id: 0,
			headers: this.headers.get_headers_to_interact_with_backend(),
			uri: this.uri,
			method: this.method,
			version: this.version,
			body: this.body.get_body_to_interact_with_backend()
		};

		const request_to_backend_json: string = JSON.stringify(request_to_backend);

		const send_result: Result<string> = await invoke('tauri_cmd_send_request', {
			request_json: request_to_backend_json
		});

		if (send_result.Err !== undefined) {
			const err = send_result.Err;
			err.push('Failed to receive response correctly');
			return Err(err);
		}

		const response_json = send_result.Ok;
		const response_from_backend: ResponseToInteractWithBackend = JSON.parse(response_json);
		const response = new Response(response_from_backend);

		return Ok(response);
	}
}
export type SendHandler = (request: Request) => Promise<void>;

export interface RequestResponsePair {
	id: number;
	request: Request | undefined;
	response: Response | undefined;
}
