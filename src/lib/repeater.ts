import { get, writable, type Writable } from 'svelte/store';
import type { Request } from './request';

interface RequestInRepeater {
	id: number;
	request: Request;
}

class RequestInRepeaters {
	next_id: number;
	requests: Writable<Array<RequestInRepeater>>;

	constructor() {
		this.next_id = 1;
		this.requests = writable([]);
	}

	public add(request: Request) {
		this.requests.update((requests) => {
			requests.push({ id: this.next_id, request: request });
			this.next_id += 1;
			return requests;
		});
	}

	public get_requests() {
		return this.requests;
	}
}

export const requests_in_repeater: RequestInRepeaters = new RequestInRepeaters();
