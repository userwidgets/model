import { authly } from "authly"
import { isly } from "isly"
import { Email } from "../Email"
import { Name } from "./Name"
import { Password } from "./Password"
import { Permissions } from "./Permissions"

export interface Creatable<T extends authly.Payload.Data = authly.Payload.Data> {
	email: Email
	password: Password.Set
	name: Name
	permissions: Permissions<T>
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		email: Email.type,
		password: Password.Set.type,
		name: Name.type,
		permissions: Permissions.type,
	})
	export const is = type.is
	export const flaw = type.flaw
}
