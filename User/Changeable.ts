import { isly } from "isly"
import type { User } from "./index"
import { Name } from "./Name"

export interface Changeable {
	name?: User["name"]
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: Name.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
