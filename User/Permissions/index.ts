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
	export const flags: readonly string[] = Array.from(new Set([...Application.flags, ...Organization.flags]))
	export function check<T extends Permissions>(
		permissions: T,
		organization: Organization.Identifier | "*",
		...flags: string[]
	): boolean {
		let result: boolean
		if (flags.length == 0)
			result = false
		else {
			const alternatives = flags.map(flag =>
				flag.split(".").map((_, index, array) => array.slice(0, index + 1).join("."))
			)
			if (organization == "*")
				result = alternatives.every(
					alternative => alternative.some(flag => flagly.get.path(permissions, `*.${flag}`)) || permissions["*"] == true
				)
			else
				result = alternatives.every(
					alternative =>
						alternative.some(
							flag =>
								flagly.get.path(permissions, `*.${flag}`) || flagly.get.path(permissions, `${organization}.${flag}`)
						) ||
						permissions[organization] == true ||
						permissions["*"] == true
				)
		}
		return result
	}
	export function set(
		permissions: Permissions,
		organization: Organization.Identifier | "*",
		flags: string[] | boolean
	): Permissions {
		let result: flagly.Flags
		if (flags === false)
			result = remove(permissions, organization, flags)
		else if (flags == true)
			result = flagly.set(flagly.remove(permissions, organization), organization)
		else {
			result = flags.reduce(
				(result, flag) => flagly.set(result, organization, ...flag.split(".")),
				remove(permissions, organization, flags)
			)
		}
		return result as Permissions
	}
	export function remove(
		permissions: Permissions,
		organization: Organization.Identifier | "*",
		flags: string[] | false
	): Permissions {
		let result: flagly.Flags
		if (flags === false)
			result = permissions
		else if (!flags.length)
			result = flagly.remove(permissions, organization)
		else
			result = flags.reduce((result, flag) => flagly.remove(result, organization, ...flag.split(".")), permissions)
		return result as Permissions
	}
	// test
	export function merge(target: Permissions, source: Permissions): Permissions {
		const result = Object.entries(source).reduce(
			(result, [id, permissions]) => flagly.reduce(result, { [id]: permissions }),
			target
		)
		return result as Permissions
	}
	// Readable only for backwards compatibility
	export type Readable<T extends flagly.Flags = flagly.Flags> = Permissions<T>
	export namespace Readable {
		export const is = type.is
	}
}
