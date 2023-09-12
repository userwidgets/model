import { isly } from "isly"
import { Email } from "../Email"
import { Name } from "./Name"
import { Password } from "./Password"

export interface Creatable {
	email: Email
	password: Password.Set
	name: Name
	permissions: string
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		email: Email.type,
		password: Password.Set.type,
		name: Name.type,
		permissions: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
