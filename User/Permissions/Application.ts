import { Collection } from "./Collection"
import { Permission } from "./Permission"

export interface Application {
	application?: Permission
	organization?: Permission
	user?: Permission
	[resource: string]: Permission | undefined
}
export namespace Application {
	export function is(value: Application | any): value is Application {
		return typeof value == "object" && Collection.is(value)
	}
}
