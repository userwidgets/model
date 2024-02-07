import { isly } from "isly"
import type { User } from "./index"
import { Name } from "./Name"
import { Password } from "./Password"

export interface Changeable {
	name?: User["name"]
	password?: User.Password.Change | User.Password.Set
	permissions?: User["permissions"]
	twoFactor?: { key: string; recoveryCodes: string[] }
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: Name.type.optional(),
		password: isly.union(Password.Change.type, Password.Set.type).optional(),
		permissions: isly.string().optional(),
		twoFactor: isly
			.object<Required<Changeable>["twoFactor"]>({ key: isly.string(), recoveryCodes: isly.string().array() })
			.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
