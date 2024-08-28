export type Method =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'OPTIONS'
	| 'HEAD'
	| 'CONNECT'
	| 'TRACE'
	| 'PATCH';

export type Methods = Array<{ id: string; text: Method }>;

export const METHODS: Methods = [
	{
		id: '0',
		text: 'GET'
	},
	{
		id: '1',
		text: 'POST'
	},
	{
		id: '2',
		text: 'PUT'
	},
	{
		id: '3',
		text: 'DELETE'
	},
	{
		id: '4',
		text: 'OPTIONS'
	},
	{
		id: '5',
		text: 'HEAD'
	},
	{
		id: '6',
		text: 'CONNECT'
	},
	{
		id: '7',
		text: 'TRACE'
	},
	{
		id: '8',
		text: 'PATCH'
	}
];
