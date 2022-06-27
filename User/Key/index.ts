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
export type Issuers = "saaswidget" | "wrangler"
const publicKeys: { [system in Issuers]: string } = {
	saaswidget:
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuqU98n52HN6Up2jO79MDvwnVc3nJrg8ahe40qarkvKGYDPP7TTJIM5JMMHFLQDk/dvRuFFvxmOFj29lI1shqICAhktOyQWB+BdwmnNuKwK1k6vwHGPPdijP7gZMeUXifO0BPbb+swtbwkATx+YT90haNi0Be3b7oUVOalnUC1LaEIT8xw+vSCs/wIdYkizNJl67d+6nHkeSOkkv8oAzaLU6OosflrGYk5IMeSuEJgw7TCM8jVSnqIVluGV0QtGGnZMuhFI3Rwc9L7ZbFaraX8RrcdR1S2MG8qksJwcL5QOzR02pHkFNtAg2LQcf0Lio6JOVAdGh1hCbHvGL46UfA1QIDAQAB",
	wrangler:
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuqU98n52HN6Up2jO79MDvwnVc3nJrg8ahe40qarkvKGYDPP7TTJIM5JMMHFLQDk/dvRuFFvxmOFj29lI1shqICAhktOyQWB+BdwmnNuKwK1k6vwHGPPdijP7gZMeUXifO0BPbb+swtbwkATx+YT90haNi0Be3b7oUVOalnUC1LaEIT8xw+vSCs/wIdYkizNJl67d+6nHkeSOkkv8oAzaLU6OosflrGYk5IMeSuEJgw7TCM8jVSnqIVluGV0QtGGnZMuhFI3Rwc9L7ZbFaraX8RrcdR1S2MG8qksJwcL5QOzR02pHkFNtAg2LQcf0Lio6JOVAdGh1hCbHvGL46UfA1QIDAQAB",
}

export namespace Key {
	export function is(value: Key | any): value is Key & Record<string, string> {
		return (
			CreatableKey.is(value) &&
			typeof value.issuer == "string" &&
			typeof value.audience == "string" &&
			isoly.DateTime.is(value.issued) &&
			isoly.DateTime.is(value.expires) &&
			typeof value.token == "string"
		)
	}
	export function isIssuer(value: Key | any): value is Issuers {
		return Object.keys(publicKeys).includes(value)
	}
	export async function unpack(token: string): Promise<Key | undefined> {
		let result: Key | undefined
		const textDecoder = new cryptly.TextDecoder()
		if (token.split(".").length == 3) {
			const issuer = JSON.parse(textDecoder.decode(cryptly.Base64.decode(token.split(".")[1])))["iss"]
			if (Object.keys(publicKeys).includes(issuer) && token.split(".").pop()) {
				const verifier = Signed.Verifier.create(issuer)
				result = await verifier.verify(token)
			} else {
				const verifier = Unsigned.Verifier.create()
				result = await verifier.verify(token)
			}
		} else
			result = undefined
		return result
	}

	export type Issuer = authly.Issuer<CreatableKey>
	export type Verifier = authly.Verifier<Key>
	export namespace Signed {
		export namespace Issuer {
			export function create(issuer: Issuers, privateKey: string, audience?: string): Issuer {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const result = authly.Issuer.create<Key>(issuer, authly.Algorithm.RS256(undefined, privateKey))!.add(
					...transformers
				)
				result.audience = audience
				result.duration = 60 * 60 * 12
				return result
			}
		}
		export namespace Verifier {
			export function create(issuer: Issuers): Verifier {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				return authly.Verifier.create<Key>(authly.Algorithm.RS256(publicKeys[issuer]))!.add(...transformers)
			}
		}
	}

	export namespace Unsigned {
		export namespace Issuer {
			export function create(issuer: string, audience?: string): Issuer {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const result = authly.Issuer.create<Key>(issuer, authly.Algorithm.none())!.add(...transformers)
				result.audience = audience
				result.duration = 60 * 60 * 12
				return result
			}
		}
		export namespace Verifier {
			export function create(): Verifier {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				return authly.Verifier.create<Key>(authly.Algorithm.none())!.add(...transformers)
			}
		}
	}

	export type Creatable = CreatableKey
	export const Creatable = CreatableKey
}
