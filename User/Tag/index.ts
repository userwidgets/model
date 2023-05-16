import * as isoly from "isoly"
import * as authly from "authly"
import { Creatable as CreatableTag } from "./Creatable"

export interface Tag extends CreatableTag {
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
		permissions: "prm",
		active: "act",
		token: "tok",
	}),
]

export namespace Tag {
	export type Issuer = authly.Issuer<Creatable>
	export type Verifier = authly.Verifier<Tag>
	export function is(value: Tag | any): value is Tag & Record<string, any> {
		return (
			CreatableTag.is(value) &&
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
				authly.Issuer.create<Tag>(issuer, authly.Algorithm.RS256(publicKey, privateKey)!).add(...transformers),
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
			return authly.Verifier.create<Tag>(...(publicKey ? [authly.Algorithm.RS256(publicKey)!] : [])).add(
				...transformers
			)
		}
	}
	export type Creatable = CreatableTag
	export const Creatable = CreatableTag
}
