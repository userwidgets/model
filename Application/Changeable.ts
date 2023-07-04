import { isly } from "isly"
import type { Application } from "./index"

export interface Changeable {
	name?: Application["name"]
	permissions?: Application["permissions"]
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: isly.string(/.+/).optional(),
		permissions: isly.array(isly.string(/.+/)).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
