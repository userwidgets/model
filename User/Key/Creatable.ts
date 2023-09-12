import { flagly } from "flagly"
import { isly } from "isly"
import { Email } from "../../Email"
import type { Organization } from "../../Organization"
import { Name } from "../../User/Name"
import type { User } from "../index"
import { Permissions } from "../Permissions"
import { Claims as KeyClaims } from "./Claims"
import { Key } from "./index"

type BaseClaims = {
	name: { first: string; last: string }
	email: Email
	permissions: string
}
export type Creatable<C extends Creatable.Claims = Creatable.Claims> = BaseClaims & C
export namespace Creatable {
	export type Claims = KeyClaims
	export const Claims = KeyClaims
	function createType<C extends Claims>({
		claims: claims = Claims.type as isly.Type<C>,
	}: {
		claims?: isly.Type<C>
	} = {}): isly.Type<Creatable<C>> {
		return isly.intersection<Creatable<C>, C, BaseClaims>(
			claims,
			isly.object({
				name: Name.type,
				email: Email.type,
				permissions: isly.string(),
			})
		)
	}
	export const type = Object.assign(createType(), {
		create: createType,
	})
	export const is = type.is
	export const flaw = type.flaw
	export function from(key: Key, organizations?: Organization.Identifier[]): Creatable
	export function from(user: User, organizations?: Organization.Identifier[]): Creatable
	export function from(key: Creatable, organization?: Organization.Identifier[]): Creatable
	export function from(source: User | Key | Creatable, organizations?: Organization.Identifier[]): Creatable {
		const permissions = !organizations ? source.permissions : Permissions.filter(source.permissions, organizations)
		return {
			email: source.email,
			name: source.name,
			permissions: typeof permissions == "string" ? permissions : flagly.Flags.stringify(permissions),
		}
	}
}
