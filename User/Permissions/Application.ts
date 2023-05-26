import { Collection } from "./Collection"
import { Permission } from "./Permission"

export interface Application extends Collection {
	application?: Permission
	organization?: Permission
	user?: Permission
}
export namespace Application {
	export const type = Collection.type
	export const is = type.is
}
