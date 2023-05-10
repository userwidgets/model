import * as cryptly from "cryptly"
import * as isoly from "isoly"
import * as authly from "authly"
import { Issuers, Key, publicKeys } from "../Key"
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
			forward: (value: string) => value, // TODO: Does this work?
			backward: (value: number) => isoly.DateTime.create(value),
		},
		expires: {
			forward: (value: string) => value, // TODO: Does this work?
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
			if (!Key.isIssuer(issuer)) {
				result = undefined
			} else {
				const verifier = Verifier.create(issuer)
				result = await verifier.verify(token)
			}
		}
		return result
	}
	export namespace Issuer {
		export function create(issuer: Issuers, audience: string): Issuer
		export function create(issuer: Issuers, audience: string, privateKey: string): Issuer
		export function create(issuer: Issuers, audience: string, privateKey?: string) {
			return Object.assign(
				privateKey == undefined
					? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					  authly.Issuer.create<Tag>(issuer, authly.Algorithm.none())!.add(...transformers)
					: // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					  authly.Issuer.create<Tag>(issuer, authly.Algorithm.RS256(undefined, privateKey))!.add(...transformers),
				{ audience: audience, duration: 60 * 60 * 12 }
			)
		}
	}
	export namespace Verifier {
		export function create(issuer: Issuers) {
			return !publicKeys[issuer]
				? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				  authly.Verifier.create<Tag>(authly.Algorithm.none())!.add(...transformers)
				: // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				  authly.Verifier.create<Tag>(authly.Algorithm.RS256(publicKeys[issuer]))!.add(...transformers)
		}
	}
	export type Creatable = CreatableTag
	export const Creatable = CreatableTag
}
