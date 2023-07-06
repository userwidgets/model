import { isly } from "isly"
import { User } from "./index"
import { Name } from "./Name"

export interface Changeable {
	name?: User["name"]
	password?: User.Password.Change
	permissions?: any
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: Name.type.optional(),
		password: User.Password.Change.type.optional(),
		permissions: isly.any(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
