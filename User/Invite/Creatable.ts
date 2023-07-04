import { isly } from "isly"
import { Email } from "../../Email"
import { Permissions } from "../Permissions"

export interface Creatable {
	email: Email
	active: boolean
	permissions: Permissions.Readable
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		email: Email.type,
		active: isly.boolean(),
		permissions: isly.fromIs("Permissions.Readable", Permissions.Readable.is),
	})
	export const is = type.is
	export const flaw = type.flaw
}
