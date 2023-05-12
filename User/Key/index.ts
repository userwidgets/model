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
			forward: (value: string) => isoly.DateTime.epoch(value, "seconds"), // "forward" is never used, since authly.Issuer creates the iat-value.
			backward: (value: number) => isoly.DateTime.create(value),
		},
		expires: {
			forward: (value: string) => isoly.DateTime.epoch(value, "seconds"), // "forward" is never used, since authly.Issuer creates the exp-value.
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
		name: "nam",
		token: "tok",
	}),
]
export type Issuers = "userwidgets" | "local"
export const publicKeys: { [system in Issuers]: string | undefined } = {
	userwidgets:
		"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwAfRxvo3TsEXRYFOiQgGN0/+heva3+o3LPWu8mAhbhnFGhwPpYX02O89A1l3h4kFN7yJ3cjglnhSawkhQ1GiVp/neVR1JqdkyhrDl6DrcifPC+Ziub/9Y1/H5P5Dk4YPAxp8Sm0KF46GqvX4HsDQ/lt3r8vwb35nwIGyV3AGfFMigeEgqfAEXpXj36PYsKIRod8UpYY/B1xWW0wdRtQ3cUuUix+dK5ybHMdU287bgSNC0qNt69/xbGjRjlnm72N26fmtl5QnAFMYvdY552P/LQCcbo7aGz5lKH8bDXdURA8bgZOvXLnjXvOLjSInpayWRQfKMWS4bNptbZrw7NBqD0HyM5QyKbBSlr6+VI8mDMf9HICOgYNIcwdJ62HX5JeMvylRPF9asOzZNgO2R10gPym+2tc5tSi+jmTJu2eJNabjN/QFlQQRieewwN6Grwu2UzV71Jk4OqbY0GN/TF4lsF+b9pmEmsg2KiFDqkCl84DIMtIkxSR5A56bDvqH7W5m16xbA2889kgnz7CKThivj2kDT3ZUp8F+qYoAs/FVBjPq1Z+D9vY6vixkGzzFvoBfDvpyVwTIyR998ltueqRwDe4HSD/tipgzLB6Sh8/D/YXiTpLBxQxsH5dHEkK72DCg3LTHAZsR1BoPuBkEfhOZIJSa/8ULvaBPNDWbmB+XmAkCAwEAAQ==",
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
