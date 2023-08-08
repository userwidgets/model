import { isly } from "isly"
import { Email } from "../Email"
import type { Organization } from "./index"

export interface Changeable {
	name?: Organization["name"]
	users?: Email[]
	permissions?: Organization["permissions"]
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: isly.string(/.+/).optional(),
		permissions: isly.array(isly.string(/.+/)).optional(),
		users: isly.array(Email.type).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
