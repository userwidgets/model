import { flagly } from "flagly"
import { isly } from "isly"
import { Email } from "../../Email"
import type { Organization } from "../../Organization"
import { Name } from "../../User/Name"
import type { User } from "../index"
import { Permissions } from "../Permissions"
import { Claims as KeyClaims } from "./Claims"
import { Key } from "./index"

type BaseClaims<T extends flagly.Flags> = {
	name: { first: string; last: string }
	email: Email
	permissions: Permissions<T>
}
export type Creatable<
	C extends Creatable.Claims = Creatable.Claims,
	P extends flagly.Flags = flagly.Flags
> = BaseClaims<P> & C
export namespace Creatable {
	export type Claims = KeyClaims
	export const Claims = KeyClaims
	function createType<C extends Claims, P extends flagly.Flags>({
		claims: claims = Claims.type as isly.Type<C>,
		permissions = flagly.Flags.type as isly.Type<P>,
	}: {
		claims?: isly.Type<C>
		permissions?: isly.Type<P>
	} = {}): isly.Type<Creatable<C, P>> {
		return isly.intersection<Creatable<C, P>, C, BaseClaims<P>>(
			claims,
			isly.object({
				name: Name.type,
				email: Email.type,
				permissions: Permissions.type.create(permissions),
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
	export function from(source: User | Key, organizations?: Organization.Identifier[]): Creatable {
		return {
			email: source.email,
			name: source.name,
			permissions: !organizations
				? source.permissions
				: Object.fromEntries(Object.entries(source.permissions).filter(([id]) => organizations.includes(id))),
		}
	}
}
