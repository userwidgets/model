import { isly } from "isly"
import { Email } from "../Email"
import { Name } from "./Name"
import { Password } from "./Password"
import { Permissions as Permissions } from "./Permissions"

export interface Creatable {
	email: Email
	password: Password.Set
	name: Name
	permissions: Permissions.Readable
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		email: Email.type,
		password: Password.Set.type,
		name: Name.type,
		permissions: isly.fromIs("Permissions.Readable", Permissions.Readable.is),
	})
	export const is = type.is
	export const flaw = type.flaw
}
