import { isly } from "isly"
import { Email } from "../../Email"

export interface Creatable {
	email: Email
	active: boolean
	permissions: string
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		email: Email.type,
		active: isly.boolean(),
		permissions: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
