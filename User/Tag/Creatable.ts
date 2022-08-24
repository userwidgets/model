import { Permissions } from "../Permissions"

export interface Creatable {
	email: string
	active: boolean
	permissions: Record<"*", Permissions.Application> &
		Record<Exclude<string, "*"> /* organizationIds */, Permissions.Organization | undefined>
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.email == "string" &&
			typeof value.active == "boolean" &&
			Object.keys(value.permissions).includes("*") &&
			Permissions.Application.is(value.permissions["*"]) &&
			Object.entries(value.permissions)
				.filter(([key, _]) => key != "*")
				.every(([_, organization]) => Permissions.Organization.is(organization))
		)
	}
}
