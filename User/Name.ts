import { isly } from "isly"

export interface Name {
	first: string
	last: string
}

export namespace Name {
	export const type = isly.object<Name>({
		first: isly.string(/.+/),
		last: isly.string(/.+/),
	})
	export const is = type.is
	export const flaw = type.flaw
}
