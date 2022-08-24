import * as cryptly from "cryptly"
import * as isoly from "isoly"
import * as authly from "authly"
import { Issuers, publicKeys } from "../Key"
import { Creatable as CreatableTag } from "./Creatable"

export interface Tag extends CreatableTag {
	issuer: string
	audience: string
	issued: isoly.DateTime
	expires: isoly.DateTime
	token: string
}

const transformers: authly.Property.Transformer[] = [
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
	export async function unpack(token: string): Promise<Tag | undefined> {
		let result: Tag | undefined
		const textDecoder = new cryptly.TextDecoder()
		if (token.split(".").length != 3)
			result = undefined
		else {
			const issuer = JSON.parse(textDecoder.decode(cryptly.Base64.decode(token.split(".")[1])))["iss"]
			if (issuer in publicKeys && token.split(".").pop()) {
				const verifier = Signed.Verifier.create(issuer)
				result = await verifier.verify(token)
			} else {
				const verifier = Unsigned.Verifier.create()
				result = await verifier.verify(token)
			}
		}
		return result
	}
	export namespace Signed {
		export namespace Issuer {
			export function create(issuer: Issuers, privateKey: string, audience?: string): Issuer {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const result = authly.Issuer.create<Tag>(issuer, authly.Algorithm.RS256(undefined, privateKey))!.add(
					...transformers
				)
				Object.assign(result, { audience: audience, duration: 60 * 60 * 12 })
				return result
			}
		}
		export namespace Verifier {
			export function create(issuer: Issuers): Verifier {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				return authly.Verifier.create<Tag>(authly.Algorithm.RS256(publicKeys[issuer]))!.add(...transformers)
			}
		}
	}
	export namespace Unsigned {
		export namespace Issuer {
			export function create(issuer: string, audience?: string): Issuer {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const result = authly.Issuer.create<Tag>(issuer, authly.Algorithm.none())!.add(...transformers)
				Object.assign(result, { audience: audience, duration: 60 * 60 * 12 })
				return result
			}
		}
		export namespace Verifier {
			export function create(): Verifier {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				return authly.Verifier.create<Tag>(authly.Algorithm.none())!.add(...transformers)
			}
		}
	}
	export type Creatable = CreatableTag
	export const Creatable = CreatableTag
}
