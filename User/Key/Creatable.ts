import { Permissions } from "../Permissions"

export interface Creatable {
	name: { first: string; last: string }
	email: string
	permissions: Permissions.Readable
}

export namespace Creatable {
	export const type = isly.object<Creatable>({})
	export function is(value: Creatable | any): value is Creatable {
		return (
			typeof value == "object" &&
			typeof value.email == "string" &&
			typeof value.name == "object" &&
			typeof value.name.first == "string" &&
			typeof value.name.last == "string" &&
			Permissions.Readable.is(value.permissions)
		)
	}
}
