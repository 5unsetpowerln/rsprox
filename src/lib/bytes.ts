export function bytes_to_string(data: Uint8Array) {
	return new TextDecoder().decode(Uint8Array.from(data));
}
