import { Permissions } from "../Permissions"

export interface Creatable {
	email: string
	active: boolean
	permissions: Permissions.Readable
}

export namespace Creatable {
	export const type = isly.object<Creatable>({})
	export function is(value: Creatable | any): value is Creatable {
		return (
			typeof value == "object" &&
			typeof value.email == "string" &&
			typeof value.active == "boolean" &&
			Permissions.Readable.is(value.permissions)
		)
	}
}
