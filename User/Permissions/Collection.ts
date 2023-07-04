import { Permission } from "./Permission"

export type Collection = Record<string /* resource */, Permission | undefined>
export namespace Collection {
	export function is(value: Collection | any): value is Collection {
		return typeof value == "object" && Object.values(value).every(permission => Permission.is(permission))
	}
}
