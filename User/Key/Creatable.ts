import { Permissions } from "../Permissions"

export interface Creatable {
	name: { first: string; last: string }
	email: string
	permissions: Record<
		"*",
		Record<"application" | "organization" | "user", Permissions.Permission> &
			Record<string, Permissions.Permission | undefined>
	> &
		Record<
			string /* organizationIds */,
			Record<"organization" | "user", Permissions.Permission> & Record<string, Permissions.Permission | undefined>
		>
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
			["application", "organization", "user"].every(resource =>
				Object.keys(value.permissions["*"]).includes(resource)
			) &&
			Object.values(value.permissions).every(
				organization =>
					typeof organization == "object" &&
					organization &&
					["organization", "user"].every(resource => Object.keys(organization).includes(resource))
			)
		)
	}
}
