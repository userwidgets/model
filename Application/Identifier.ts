import { isly } from "isly"

export type Identifier = string
export namespace Identifier {
	export const type = isly.string(/.+/)
	export const is = type.is
	export const flaw = type.flaw
}
