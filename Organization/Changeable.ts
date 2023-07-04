import { isly } from "isly"
import type { Organization } from "./index"

export interface Changeable {
	name?: Organization["name"]
	permissions?: Organization["permissions"]
}
export namespace Changeable {
	export const type = isly.object({
		name: isly.string(/.+/).optional(),
		permissions: isly.array(isly.string(/.+/)).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
