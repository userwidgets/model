import { isly } from "isly"

export type Email = string
export namespace Email {
	export const type = isly.string<Email>(/^.+@.+$/)
	export const is = type.is
	export const flaw = type.flaw
}
