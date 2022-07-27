import { Collection } from "./Collection"
import { Permission } from "./Permission"

export type Application = Record<"application" | "organization" | "user", Permission> & Collection
export namespace Application {
	export function is(value: Application | any): value is Application & Record<string, any> {
		return (
			typeof value == "object" &&
			["application", "organization", "user"].every(resource => Object.keys(value).includes(resource)) &&
			Collection.is(value)
		)
	}
}
