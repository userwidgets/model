import { Organization } from "../Organization"

export interface Creatable {
	name: string
	permissions: ["application", "organization", "user", ...string[]]
	organizations: Record<string /* organizationId */, Organization>
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.name == "string" &&
			Array.isArray(value.permissions) &&
			value.permissions.every((permission: string | any) => typeof permission == "string") &&
			["application", "organization", "user"].every(permission => value.permissions.includes(permission)) &&
			typeof value.organizations == "object" &&
			Object.values(value.organizations).every(organization => Organization.is(organization))
		)
	}
}
