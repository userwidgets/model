import { Permissions } from "../Permissions"

export interface Creatable {
	email: string
	active: boolean
	permissions: Permissions.Readable
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.email == "string" &&
			typeof value.active == "boolean" &&
			Permissions.Readable.is(value.permissions)
		)
	}
}
