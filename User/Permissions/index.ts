import { flagly } from "flagly"
import { isly } from "isly"
import type { Organization } from "../../Organization"
import { Application as PermissionsApplication } from "./Application"
import { Organization as PermissionsOrganization } from "./Organization"

type OrganizationRecord<T extends flagly.Flags> = {
	[organization: Organization.Identifier]: PermissionsOrganization<T> | true | undefined
}
type ApplicationRecord<T extends flagly.Flags> = {
	"*"?: PermissionsApplication<T> | true | undefined
}
export type Permissions<T extends flagly.Flags = flagly.Flags> = OrganizationRecord<T> & ApplicationRecord<T>
export namespace Permissions {
	export type Organization<T extends flagly.Flags = flagly.Flags> = PermissionsOrganization<T>
	export const Organization = PermissionsOrganization
	export type Application<T extends flagly.Flags = flagly.Flags> = PermissionsApplication<T>
	export const Application = PermissionsApplication
	function createType<T extends flagly.Flags>(type: isly.Type<T>): isly.Type<Permissions<T>> {
		return isly.intersection(
			isly.object({ "*": isly.union(isly.boolean(true), isly.undefined(), Application.type.create(type)) }),
			isly.record(
				isly.string() /* Organization.Identifier.type */,
				isly.union(isly.boolean(true), isly.undefined(), Organization.type.create(type))
			)
		)
	}
	export const type = Object.assign(createType(flagly.Flags.type), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
	export function check<T extends Permissions>(permissions: T, ...flags: string[]): boolean {
		// needs to check both * and id
		return flagly.get.path(permissions, ...flags)
	}
	export function set<T extends Permissions>(permissions: T, type: isly.Type<T>, ...flags: string[]): T | undefined {
		const result = flagly.set.path(permissions, ...flags)
		return type.is(result) ? result : undefined
	}
	export function remove<T extends Permissions>(permissions: T, type: isly.Type<T>, ...flags: string[]): T | undefined {
		const result = flagly.remove.path(permissions, ...flags)
		return type.is(result) ? result : undefined
	}
}
