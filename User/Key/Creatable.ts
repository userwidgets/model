import { Permissions } from "../Permissions"

export interface Creatable {
	name: { first: string; last: string }
	email: string
	permissions: Record<"*", Permissions.Applications> & Record<string /* organizationIds */, Permissions.Organizations>
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.email == "string" &&
			typeof value.name == "object" &&
			typeof value.name.first == "string" &&
			typeof value.name.last == "string" &&
			typeof value.permissions == "object" &&
			Object.keys(value.permissions).includes("*") &&
			Permissions.Applications.is(value.permissions["*"]) &&
			Object.entries(value.permissions)
				.filter(([key, _]) => key != "*")
				.every(([_, organization]) => Permissions.Organizations.is(organization))
		)
	}
}
