import { cryptly } from "cryptly"
import { isly } from "isly"

export type Identifier = cryptly.Identifier
export namespace Identifier {
	export const length = 8
	export const type = isly.fromIs<Identifier>("cryptly.Identifier", value => cryptly.Identifier.is(value, length))
}
