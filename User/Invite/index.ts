import * as isoly from "isoly"
import * as authly from "authly"
import { Creatable as CreatableInvite } from "./Creatable"

export interface Invite extends CreatableInvite {
	issuer: string
	audience: string
	issued: isoly.DateTime
	expires: isoly.DateTime
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
	export type Issuer = authly.Issuer<Creatable>
	export type Verifier = authly.Verifier<Invite>
	export const type = isly.object<Invite>({})
	export function is(value: Invite | any): value is Invite {
		return (
			CreatableInvite.is(value) &&
			"issuer" in value &&
			typeof value.issuer == "string" &&
			"audience" in value &&
			typeof value.audience == "string" &&
			"issued" in value &&
			isoly.DateTime.is(value.issued) &&
			"expires" in value &&
			isoly.DateTime.is(value.expires) &&
			"token" in value &&
			typeof value.token == "string"
		)
	}
	export namespace Issuer {
		export function create(issuer: string, audience: string, publicKey: string, privateKey: string): Issuer {
			return Object.assign(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				authly.Issuer.create<Invite>(issuer, authly.Algorithm.RS256(publicKey, privateKey)!).add(...transformers),
				{ audience, duration: 60 * 60 * 24 * 3 }
			)
		}
	}
	export namespace Verifier {
		/**
		 * Creates a verifier.
		 * If no public key is provided, verifier skips verification and oly returns payload. Might be used on client-side.
		 */
		export function create(publicKey?: string): Verifier {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return authly.Verifier.create<Invite>(...(publicKey ? [authly.Algorithm.RS256(publicKey)!] : [])).add(
				...transformers
			)
		}
	}
	export type Creatable = CreatableInvite
	export const Creatable = CreatableInvite
}
