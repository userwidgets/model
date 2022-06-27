import * as isoly from "isoly"
import { Creatable as CreatableOrganization } from "./Creatable"

export interface Organization extends CreatableOrganization {
	id: string
	users: string[]
	modified: isoly.DateTime
}

export namespace Organization {
	export function is(value: Organization | any): value is Organization & Record<string, any> {
		return (
			Creatable.is(value) &&
			typeof value.name == "string" &&
			Array.isArray(value.users) &&
			value.users.every(user => typeof user == "string") &&
			isoly.DateTime.is(value.modified)
		)
	}
	export type Creatable = CreatableOrganization
	export const Creatable = CreatableOrganization
}
