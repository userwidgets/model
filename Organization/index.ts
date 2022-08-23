import * as isoly from "isoly"
import { Creatable as CreatableOrganization } from "./Creatable"

export interface Organization extends CreatableOrganization {
	id: string
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace Organization {
	export function is(value: Organization | any): value is Organization & Record<string, any> {
		return (
			Creatable.is(value) &&
			typeof value.name == "string" &&
			isoly.DateTime.is(value.created) &&
			isoly.DateTime.is(value.modified)
		)
	}
	export type Creatable = CreatableOrganization
	export const Creatable = CreatableOrganization
}
