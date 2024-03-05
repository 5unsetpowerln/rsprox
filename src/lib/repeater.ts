import { writable, type Writable } from 'svelte/store';
import type { Request } from './request';
import type { Components } from './components';
import HttpEditor from '$lib/components/HttpEditor/HttpEditor.svelte';
import { type RequestResponsePair } from './request';

interface RequestInRepeater {
	id: number;
	request: Request;
}

class RequestInRepeaters {
	private next_id: number;
	private requests: Writable<Array<RequestInRepeater>>;
	private components: Components;

	constructor() {
		this.next_id = 1;
		this.requests = writable([]);
		this.components = [];
	}

	public add(request: Request) {
		this.requests.update((requests) => {
			requests.push({ id: this.next_id, request: request });
			const pair: RequestResponsePair = {
				id: this.next_id,
				request: request,
				response: undefined
			};
			this.components.push({
				component: HttpEditor,
				props: { pair: pair },
				name: this.next_id.toString()
			});

			this.next_id += 1;

			return requests;
		});
	}

	public get_requests() {
		return this.requests;
	}

	public get_components() {
		return this.components;
	}
}

export const requests_in_repeater: RequestInRepeaters = new RequestInRepeaters();
