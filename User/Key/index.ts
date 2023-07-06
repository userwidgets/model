import { isoly } from "isoly"
import * as authly from "authly"
import { isly } from "isly"
import { Creatable as KeyCreatable } from "./Creatable"

type Key<
	T extends Record<string, unknown>,
	TDeep extends T["deep"] extends Record<string, unknown> ? T["deep"] : unknown = T["deep"]
> = {
	issuer: string
	audience: string
	issued: isoly.DateTime
	expires: isoly.DateTime
	token: string
	permissions: Key.Creatable["permissions"] & TDeep
} & Key.Creatable &
	T

// export interface Key extends Key.Creatable {
// 	issuer: string
// 	audience: string
// 	issued: isoly.DateTime
// 	expires: isoly.DateTime
// 	token: string
// }

const transformers: authly.Property.Creatable[] = [
	{
		issued: {
			forward: (value: string) => isoly.DateTime.epoch(value, "seconds"), // "forward" is never used, since authly.Issuer creates the iat-value.
			backward: (value: number) => isoly.DateTime.create(value),
		},
		expires: {
			forward: (value: string) => isoly.DateTime.epoch(value, "seconds"), // "forward" is never used, since authly.Issuer creates the exp-value.
			backward: (value: number) => isoly.DateTime.create(value),
		},
	},
	{
		issuer: "iss",
		audience: "aud",
		issued: "iat",
		expires: "exp",
		email: "sub",
		permissions: "per",
		name: "nam",
		token: "tok",
	},
]

export namespace Key {
	export type Creatable = KeyCreatable
	export const Creatable = KeyCreatable
	export const type = Creatable.type.extend<Key>({
		issuer: isly.string(/.+/),
		audience: isly.string(/.+/),
		issued: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		expires: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		token: isly.string(/^.+\..+\..+$/),
	})
	export const is = type.is
	export const flaw = type.flaw
	export namespace Issuer {
		export function create(issuer: string, audience: string, publicKey: string, privateKey: string): Issuer {
			return Object.assign(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				authly.Issuer.create<Key>(issuer, authly.Algorithm.RS256(publicKey, privateKey)!).add(...transformers),
				{ audience, duration: 60 * 60 * 12 }
			)
		}
	}
	export type Issuer = authly.Issuer<KeyCreatable>
	export type Verifier = authly.Verifier<Key>
	export namespace Verifier {
		/**
		 * Creates a verifier.
		 * If no public key is provided, verifier skips verification and oly returns payload. Might be used on client-side.
		 */
		export function create(publicKey?: string): Verifier {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return authly.Verifier.create<Key>(...(publicKey ? [authly.Algorithm.RS256(publicKey)!] : [])).add(
				...transformers
			)
		}
	}
}
