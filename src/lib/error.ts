export type Result<T> = { Ok: T; Err: undefined } | { Ok: undefined; Err: Error };

export type Error = Array<string>;

export function Ok<T>(value: T): Result<T> {
	return {
		Ok: value,
		Err: undefined
	};
}

export function Err<T>(value: Error): Result<T> {
	return {
		Ok: undefined,
		Err: value
	};
}

export function print_errors(errs: Error) {
	for (const err of errs) {
		console.error(err);
	}
}
