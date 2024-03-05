import { listen } from '@tauri-apps/api/event';
import { writable, type Writable } from 'svelte/store';
import { Request, type RequestFromBackend, type RequestResponsePair } from '$lib/request';
import { Response, type ResponseFromBackend } from '$lib/response';

export interface SmallHistoryEntry {
	id: number;
	method: string;
	uri: string;
	status: string;
	length: string;
}

export const history: Writable<Array<RequestResponsePair>> = writable([]);

export async function get_small_history(
	current_history: Array<RequestResponsePair>
): Promise<Array<SmallHistoryEntry>> {
	const history_list: Array<SmallHistoryEntry> = [];

	for (const pair of current_history) {
		if (pair.request !== undefined) {
			if (pair.response !== undefined) {
				history_list.push({
					id: pair.id,
					method: pair.request.get_method(),
					uri: pair.request.get_uri(),
					status: String(pair.response.get_status()),
					length: String(pair.response.get_body().get_length())
				});
			} else {
				history_list.push({
					id: pair.id,
					method: pair.request.get_method(),
					uri: pair.request.get_uri(),
					status: '',
					length: ''
				});
			}
		}
	}

	return history_list;
}

export function get_small_history_header(a_small_history_entry: SmallHistoryEntry) {
	const result: { key: string; value: string }[] = [];

	for (const key in a_small_history_entry) {
		const value = key.charAt(0).toUpperCase() + key.slice(1);
		result.push({ key, value: value });
	}

	return result;
}

export async function proxy_start() {
	await listen<string>('proxy_send_request_to_frontend', (data_from_backend) => {
		const request_from_backend_json = data_from_backend.payload;
		const request_from_backend: RequestFromBackend = JSON.parse(request_from_backend_json);
		const request = new Request(request_from_backend);

		history.update((current_history) => {
			current_history.push({
				id: request.get_id(),
				request: request,
				response: undefined
			});
			return current_history;
		});
	});

	await listen<string>('proxy_send_response_to_frontend', (data_from_backend) => {
		const response_from_backend_json = data_from_backend.payload;
		const response_from_backend: ResponseFromBackend = JSON.parse(response_from_backend_json);
		const response = new Response(response_from_backend);

		history.update((current_history) => {
			const index = current_history.findIndex((pair) => pair.id === response.get_id());
			current_history[index].response = response;
			return current_history;
		});
	});
}
