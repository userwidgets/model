import { Collection } from "./Collection"
import { Permission } from "./Permission"

export type Organizations = Record<"organization" | "user", Permission> & Collection
export namespace Organizations {
	export function is(value: Organizations | any): value is Organizations & Record<string, any> {
		return (
			typeof value == "object" &&
			["organization", "user"].every(resource => Object.keys(value).includes(resource)) &&
			Collection.is(value)
		)
	}
}
