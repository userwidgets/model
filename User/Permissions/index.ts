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
	export function check(
		permissions: Permissions | string,
		organization: Organization.Identifier | "*",
		...flags: string[]
	): boolean
	export function check(permissions: Permissions | string, constraint: Permissions | string): boolean
	export function check(
		permissions: Permissions | string,
		organization: Permissions | Organization.Identifier | "*",
		...flags: string[]
	): boolean {
		let result: boolean
		const parsed: flagly.Flags = typeof permissions == "object" ? permissions : flagly.parse(permissions)
		if (flags.length == 0)
			result = flagly.get.path(
				parsed,
				...(typeof organization == "object" ? flagly.Flags.stringify(organization) : organization)
					.split(" ")
					.filter(flag => flag)
			)
		else if (typeof organization == "object")
			result = false
		else {
			const alternatives = flags.map(flag =>
				flag.split(".").map((_, index, array) => array.slice(0, index + 1).join("."))
			)
			if (organization == "*")
				result = alternatives.every(
					alternative => alternative.some(flag => flagly.get.path(parsed, `*.${flag}`)) || parsed["*"] == true
				)
			else
				result = alternatives.every(
					alternative =>
						alternative.some(
							flag => flagly.get.path(parsed, `*.${flag}`) || flagly.get.path(parsed, `${organization}.${flag}`)
						) ||
						parsed[organization] == true ||
						parsed["*"] == true
				)
		}
		return result
	}
	export function get(permissions: string, organization: Organization.Identifier | "*"): string
	export function get<T extends Permissions<flagly.Flags>>(
		permissions: T,
		organization: Organization.Identifier | "*"
	): T
	export function get<T extends Permissions<flagly.Flags>>(
		permissions: T | string,
		organization: Organization.Identifier | "*"
	): T | string {
		const parsed = typeof permissions == "object" ? permissions : flagly.parse(permissions)
		const result = parsed[organization] ? { [organization]: parsed[organization] } : {}
		return typeof permissions == "object" ? (result as T) : flagly.Flags.stringify(result)
	}
	export function set(
		permissions: string,
		organization: Organization.Identifier | "*",
		flags: string[] | boolean
	): string
	export function set<T extends Permissions<flagly.Flags>>(
		permissions: T,
		organization: Organization.Identifier | "*",
		flags: string[] | boolean
	): T
	export function set<T extends Permissions<flagly.Flags>>(
		permissions: T | string,
		organization: Organization.Identifier | "*",
		flags: string[] | boolean
	): T | string {
		let result: flagly.Flags
		const parsed = typeof permissions == "object" ? permissions : (flagly.parse(permissions) as Permissions<T>)
		if (flags === false)
			result = remove(parsed, organization, flags)
		else if (flags == true)
			result = flagly.set(flagly.remove(parsed, organization), organization)
		else {
			result = flags.reduce(
				(result, flag) => flagly.set(result, organization, ...flag.split(".")),
				remove(parsed, organization, flags)
			)
		}
		return typeof permissions == "object" ? (result as T) : flagly.Flags.stringify(result)
	}
	export function remove<T extends Permissions<flagly.Flags>>(
		permissions: T,
		organization: Organization.Identifier | "*",
		flags: string[] | false
	): T
	export function remove(
		permissions: string,
		organization: Organization.Identifier | "*",
		flags: string[] | false
	): string
	export function remove<T extends Permissions<flagly.Flags>>(
		permissions: T | string,
		organization: Organization.Identifier | "*",
		flags: string[] | false
	): T | string {
		let result: flagly.Flags
		const parsed = typeof permissions == "object" ? permissions : (flagly.parse(permissions) as T)
		if (flags === false)
			result = (({ [organization]: _, ...parsed }) => parsed)(parsed)
		else if (!flags.length)
			result = flagly.remove(parsed, organization)
		else
			result = flags.reduce((result, flag) => flagly.remove(result, organization, ...flag.split(".")), parsed)
		return typeof permissions == "object" ? (result as T) : flagly.Flags.stringify(result)
	}
	export function merge<T extends Permissions<flagly.Flags>>(target: T, source: T | string): T
	export function merge<T extends Permissions<flagly.Flags>>(target: string, source: T | string): string
	export function merge<T extends Permissions<flagly.Flags>>(target: T | string, source: T): T | string {
		const parsed = {
			target: typeof target == "object" ? target : flagly.parse(target),
			source: typeof source == "object" ? source : flagly.parse(source),
		}
		const result = flagly.merge(parsed.target, parsed.source)
		return typeof target == "object" ? (result as T) : flagly.Flags.stringify(result)
	}
	export function filter<T extends Permissions<flagly.Flags>>(
		permissions: T,
		organizations: Organization.Identifier[]
	): T
	export function filter(permissions: string, organizations: Organization.Identifier[]): string
	export function filter<T extends Permissions<flagly.Flags>>(
		permissions: T | string,
		organizations: Organization.Identifier[]
	): T | string
	export function filter<T extends Permissions<flagly.Flags>>(
		permissions: T | string,
		organizations: Organization.Identifier[]
	): string | T {
		const parsed = typeof permissions == "object" ? permissions : flagly.parse(permissions)
		const result = Object.fromEntries(Object.entries(parsed).filter(([id]) => organizations.includes(id))) as T
		return typeof permissions == "object" ? result : flagly.Flags.stringify(result)
	}
	export function organizations(
		permissions: string | Permissions<flagly.Flags>,
		options?: { star?: boolean }
	): string[] {
		const parsed = typeof permissions == "object" ? permissions : flagly.parse(permissions)
		return Object.keys(options?.star ? parsed : (({ "*": _, ...parsed }) => parsed)(parsed))
	}
}
