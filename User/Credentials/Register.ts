import { isly } from "isly"
import { Email } from "../../Email"
import { Name } from "../Name"
import { Password } from "../Password"

export interface Register {
	user: Email
	name: Name
	password: Password.Set
}

export namespace Register {
	export const type = isly.object<Register>({
		user: Email.type,
		name: Name.type,
		password: Password.Set.type,
	})
	export const is = type.is
	export const flaw = type.flaw
	export function validate(credentials: Register): boolean {
		return Password.Set.validate(credentials.password)
	}
}
