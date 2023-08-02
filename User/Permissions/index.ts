import { authly } from "authly"
import { isly } from "isly"
import { Application } from "./Application"
import { Organization } from "./Organization"

export type Permissions<T extends authly.Payload.Data = authly.Payload.Data> = Application<T> & Organization<T>
export namespace Permissions {
	export function createType<T extends authly.Payload.Data>(
		type: isly.Type<T> = isly.record(isly.string(), isly.undefined())
	): isly.Type<Permissions<T>> {
		return isly.intersection<Permissions<T>, Application<T>, Organization<T>>(
			Application.type.create(type),
			Organization.type.create(type)
		)
	}
	export const type = Object.assign(createType(), { create: createType })
	// export function check(source: Permissions, ...permissions: string[]): boolean {}
	// export function set(source: Permissions, ...permissions: string[]): Permissions {}
}
