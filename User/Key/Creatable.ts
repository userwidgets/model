import { isly } from "isly"
import { Email } from "../../Email"
import { Name } from "../../User/Name"
import { Permissions } from "../Permissions"

export interface Creatable {
	name: { first: string; last: string }
	email: string
	permissions: Permissions.Readable
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		name: Name.type,
		email: Email.type,
		permissions: isly.fromIs("Permissions.Readable", Permissions.Readable.is),
	})
	export const is = type.is
	export const flaw = type.flaw
}
