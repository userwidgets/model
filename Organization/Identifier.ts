import { cryptly } from "cryptly"
import { isly } from "isly"

export type Identifier = cryptly.Identifier
export namespace Identifier {
	export const length = 8
	export const type = isly.fromIs<Identifier>("cryptly.Identifier", cryptly.Identifier.is)
	export const is = type.is
	export const flaw = type.flaw
}
