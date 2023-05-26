export interface Name {
	first: string
	last: string
}

export namespace Name {
	export const type = isly.object<Name>({})
	export function is(value: Name | any): value is Name {
		return typeof value == "object" && typeof value.first == "string" && typeof value.last == "string"
	}
}
