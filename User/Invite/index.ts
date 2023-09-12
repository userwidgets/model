import { flagly } from "flagly"
import { isoly } from "isoly"
import { authly } from "authly"
import { isly } from "isly"
import { Email } from "../../Email"
import { Permissions } from "../Permissions"
import { Creatable as InviteCreatable } from "./Creatable"

export interface Invite<T extends flagly.Flags> extends Omit<Invite.Creatable, "permissions"> {
	issuer: string
	audience: string
	issued: isoly.DateTime
	expires: isoly.DateTime
	permissions: Permissions<T>
	token: string
}

const transformers: authly.Property.Transformer[] = [
	new authly.Property.Converter({
		issued: {
			forward: (value: string) => isoly.DateTime.epoch(value, "seconds"), // "forward" is never used, since authly.Issuer creates the iat-value.
			backward: (value: number) => isoly.DateTime.create(value),
		},
		expires: {
			forward: (value: string) => isoly.DateTime.epoch(value, "seconds"), // "forward" is never used, since authly.Issuer creates the iat-value.
			backward: (value: number) => isoly.DateTime.create(value),
		},
		permissions: {
			forward: (value: string) => value,
			backward: (value: string) => flagly.parse(value),
		},
	}),
	new authly.Property.Renamer({
		issuer: "iss",
		audience: "aud",
		issued: "iat",
		expires: "exp",
		email: "sub",
		permissions: "per",
		active: "act",
		token: "tok",
	}),
]

export namespace Invite {
	export type Creatable = InviteCreatable
	export const Creatable = InviteCreatable
	export type Issuer<T extends Invite.Creatable = Invite.Creatable> = authly.Issuer<T>
	export type Verifier<T extends flagly.Flags = flagly.Flags> = authly.Verifier<Invite<T>>
	function createType<T extends flagly.Flags>(type: isly.Type<T>): isly.Type<Invite<T>> {
		return isly.object<Invite<T>>({
			issuer: isly.string(/.+/),
			audience: isly.string(/.+/),
			issued: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
			expires: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
			token: isly.string(/^.+\..+\..+$/),
			permissions: Permissions.type.create(type),
			active: isly.boolean(),
			email: Email.type,
		})
	}
	export const type = Object.assign(createType(flagly.Flags.type), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
	export namespace Issuer {
		export function create(issuer: string, audience: string, publicKey: string, privateKey: string): Issuer<Creatable> {
			return Object.assign(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				authly.Issuer.create<Creatable>(issuer, authly.Algorithm.RS256(publicKey, privateKey)!).add(...transformers),
				{ audience, duration: 60 * 60 * 24 * 3 }
			)
		}
	}
	export namespace Verifier {
		/**
		 * Creates a verifier.
		 * If no public key is provided, verifier skips verification and oly returns payload. Might be used on client-side.
		 */
		export function create<T extends flagly.Flags = flagly.Flags>(publicKey?: string): Verifier<T> {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return authly.Verifier.create<Invite<T>>(...(publicKey ? [authly.Algorithm.RS256(publicKey)!] : [])).add(
				...transformers
			)
		}
	}
}
