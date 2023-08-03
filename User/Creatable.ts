import { flagly } from "flagly"
import { isly } from "isly"
import { Email } from "../Email"
import { Name } from "./Name"
import { Password } from "./Password"
import { Permissions } from "./Permissions"

export interface Creatable<T extends flagly.Flags = flagly.Flags> {
	email: Email
	password: Password.Set
	name: Name
	permissions: Permissions<T>
}

export namespace Creatable {
	function createType<T extends flagly.Flags>(type: isly.Type<T>): isly.Type<Creatable<T>> {
		return isly.object<Creatable<T>>({
			email: Email.type,
			password: Password.Set.type,
			name: Name.type,
			permissions: Permissions.type.create(type),
		})
	}
	export const type = Object.assign(createType(flagly.Flags.type), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
}
