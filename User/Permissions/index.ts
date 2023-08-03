import { authly } from "authly"
import { isly } from "isly"
import { Application as PermissionsApplication } from "./Application"
import { Organization as PermissionsOrganization } from "./Organization"

export type Permissions<T extends authly.Payload.Data = authly.Payload.Data> = Permissions.Application<T> &
	Permissions.Organization<T>
export namespace Permissions {
	export type Organization<T extends authly.Payload.Data = authly.Payload.Data> = PermissionsOrganization<T>
	export const Organization = PermissionsOrganization
	export type Application<T extends authly.Payload.Data = authly.Payload.Data> = PermissionsApplication<T>
	export const Application = PermissionsApplication
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
