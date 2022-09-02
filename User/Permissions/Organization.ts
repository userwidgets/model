import { Collection } from "./Collection"
import { Permission } from "./Permission"

export interface Organization {
	organization?: Permission
	user?: Permission
	[resource: string]: Permission | undefined
}
export namespace Organization {
	export function is(value: Organization | any): value is Organization & Record<string, any> {
		return typeof value == "object" && Collection.is(value)
	}
}
