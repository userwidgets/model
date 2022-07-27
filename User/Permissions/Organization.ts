import { Collection } from "./Collection"
import { Permission } from "./Permission"

export type Organization = Record<"organization" | "user", Permission> & Collection
export namespace Organization {
	export function is(value: Organization | any): value is Organization & Record<string, any> {
		return (
			typeof value == "object" &&
			["organization", "user"].every(resource => Object.keys(value).includes(resource)) &&
			Collection.is(value)
		)
	}
}
