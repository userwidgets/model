import * as isoly from "isoly"
import * as authly from "authly"
import { Creatable as CreatableKey } from "./Creatable"

export interface Key extends CreatableKey {
	issuer: string
	audience: string
	issued: isoly.DateTime
	expires: isoly.DateTime
	token: string
}

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
	export const type = isly.object<Key>({})
	export function is(value: Key | any): value is Key {
		return (
			CreatableKey.is(value) &&
			typeof value.issuer == "string" &&
			typeof value.audience == "string" &&
			isoly.DateTime.is(value.issued) &&
			isoly.DateTime.is(value.expires) &&
			typeof value.token == "string"
		)
	}

	export namespace Issuer {
		export function create(issuer: string, audience: string, publicKey: string, privateKey: string): Issuer {
			return Object.assign(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				authly.Issuer.create<Key>(issuer, authly.Algorithm.RS256(publicKey, privateKey)!).add(...transformers),
				{ audience, duration: 60 * 60 * 12 }
			)
		}
	}
	export type Issuer = authly.Issuer<CreatableKey>
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

	export type Creatable = CreatableKey
	export const Creatable = CreatableKey
}
