import { isly } from "isly"
import { Application } from "./Application"
import { Organization } from "./Organization"

export type Permissions<T extends Record<string, unknown> = Record<string, unknown>> = Application<T> & Organization<T>
export namespace Permissions {
	export function createType<T extends Record<string, unknown>>(
		type: isly.Type<T> = isly.record(isly.string(), isly.union(isly.undefined(), isly.unknown()))
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
