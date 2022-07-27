import { Collection } from "./Collection"
import { Permission } from "./Permission"

export type Applications = Record<"application" | "organization" | "user", Permission> & Collection
export namespace Applications {
	export function is(value: Applications | any): value is Applications & Record<string, any> {
		return (
			typeof value == "object" &&
			["application", "organization", "user"].every(resource => Object.keys(value).includes(resource)) &&
			Collection.is(value)
		)
	}
}
