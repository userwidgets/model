import * as isoly from "isoly"
import { Creatable as CreatableOrganization } from "./Creatable"

export interface Organization extends Omit<CreatableOrganization, "users"> {
	id: string
	created: isoly.DateTime
	modified: isoly.DateTime
	users: string[]
}

export namespace Organization {
	export function is(value: Organization | any): value is Organization & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.name == "string" &&
			Array.isArray(value.permissions) &&
			value.permissions.every((permission: string | any) => typeof permission == "string") &&
			Array.isArray(value.users) &&
			value.users.every((user: any) => typeof user == "string") &&
			typeof value.id == "string" &&
			isoly.DateTime.is(value.created) &&
			isoly.DateTime.is(value.modified)
		)
	}
	export type Creatable = CreatableOrganization
	export const Creatable = CreatableOrganization
}
