import { isly } from "isly"
import { Organization } from "../Organization"

export interface Creatable {
	name: string
	permissions: string[]
	organizations: Record<string /* organizationId */, Organization>
}

export namespace Creatable {
export interface Creatable {
	export const type = isly.object<
	export const type = isly.object<Creatable>({})
	export function is(value: Creatable | any): value is Creatable {
		return (
			typeof value == "object" &&
			typeof value.name == "string" &&
			Array.isArray(value.permissions) &&
			value.permissions.every((permission: string | any) => typeof permission == "string") &&
			typeof value.organizations == "object" &&
			Object.values(value.organizations).every(organization => Organization.is(organization))
		)
	}
}
