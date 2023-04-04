import * as cryptly from "cryptly"
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

const transformers: (authly.Property.Transformer | undefined)[] = [
	new authly.Property.Converter({
		issued: {
			forward: value => value,
			backward: value => isoly.DateTime.create(value as number),
		},
		expires: {
			forward: value => value,
			backward: value => isoly.DateTime.create(value as number),
		},
	}),
	new authly.Property.Renamer({
		issuer: "iss",
		audience: "aud",
		issued: "iat",
		expires: "exp",
		email: "sub",
		permissions: "prm",
		name: "nam",
		token: "tok",
	}),
]
export type Issuers = "userwidgets" | "local"
export const publicKeys: { [system in Issuers]: string | undefined } = {
	userwidgets:
		"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvjvE27DrNuprNCac26rz/MXod4l5lGSPbrch9ewsUBHeu47swKil0dd2j4HTdKR4EODHiFf5QTDISPqQWn1A0WUmvejyw3WUAQCycNeJ4+I/LySwWansW1QR8Lcq7EABNQeAI6edCnmJ1CTL1gsH7vBan077mSCiy+gS3al2o2wIDAQAB",
	local: undefined,
}

export namespace Key {
	export function is(value: Key | any): value is Key & Record<string, any> {
		return (
			CreatableKey.is(value) &&
			typeof value.issuer == "string" &&
			typeof value.audience == "string" &&
			isoly.DateTime.is(value.issued) &&
			isoly.DateTime.is(value.expires) &&
			typeof value.token == "string"
		)
	}
	export function isIssuer(value: string): value is Issuers {
		return Object.keys(publicKeys).includes(value)
	}
	export async function unpack(token: string): Promise<Key | undefined> {
		let result: Key | undefined
		const textDecoder = new cryptly.TextDecoder()
		if (token.split(".").length != 3)
			result = undefined
		else {
			const issuer = JSON.parse(textDecoder.decode(cryptly.Base64.decode(token.split(".")[1])))["iss"]
			if (!isIssuer(issuer)) {
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
		export function create(issuer: Issuers, audience: string, privateKey?: string): Issuer {
			return Object.assign(
				privateKey == undefined
					? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					  authly.Issuer.create<Key>(issuer, authly.Algorithm.none())!.add(...transformers)
					: // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					  authly.Issuer.create<Key>(issuer, authly.Algorithm.RS256(undefined, privateKey))!.add(...transformers),
				{ audience: audience, duration: 60 * 60 * 12 }
			)
		}
	}
	export type Issuer = authly.Issuer<CreatableKey>
	export type Verifier = authly.Verifier<Key>
	export namespace Verifier {
		export function create(issuer: Issuers): Verifier {
			return !publicKeys[issuer]
				? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				  authly.Verifier.create<Key>(authly.Algorithm.none())!.add(...transformers)
				: // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				  authly.Verifier.create<Key>(authly.Algorithm.RS256(publicKeys[issuer]))!.add(...transformers)
		}
	}

	export type Creatable = CreatableKey
	export const Creatable = CreatableKey
}
