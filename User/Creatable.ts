import { Name as UserName } from "./Name"
import { Password } from "./Password"
import { Permissions as UserPermissions } from "./Permissions"

export interface Creatable {
	email: string
	password: Password.Set
	name: UserName
	permissions: Record<
		string /* applicationId */,
		| (Record<"*", UserPermissions.Application> &
				Record<Exclude<string, "*"> /* organizationId */, UserPermissions.Organization | undefined>)
		| undefined
	>
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.email == "string" &&
			Password.Set.is(value.password) &&
			UserName.is(value.name) &&
			typeof value.permissions == "object" &&
			value.permissions &&
			Object.values(value.permissions).every(
				(application: any) =>
					typeof application == "object" &&
					UserPermissions.Application.is(application?.["*"]) &&
					Object.entries(application)
						.filter(([id, _]) => id != "*")
						.every(([_, organization]) => UserPermissions.Organization.is(organization))
			)
		)
	}
}
