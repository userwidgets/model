import { Collection } from "./Collection"
import { Permission } from "./Permission"

export interface Organization extends Collection {
	organization?: Permission
	user?: Permission
}
export namespace Organization {
	export const type = Collection.type
	export const is = type.is
}
