import { Organization } from "../Organization"

export interface Creatable {
	name: string
	permissions: string
	organizations: Record<string, Organization>
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.name == "string" &&
			typeof value.permissions == "string" &&
			typeof value.organizations == "object" &&
			Object.entries(value.organizations).every(([k, v]) => typeof k == "string" && Organization.is(v))
		)
	}
}
