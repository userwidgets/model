import { cryptly } from "cryptly"
import { gracely } from "gracely"
import { isly } from "isly"
import { Change as PasswordChange } from "./Change"
import { Set as PasswordSet } from "./Set"

// maybe not backwards compatible?
export type Password = string | Password.Change | Password.Set

export namespace Password {
	export type Change = PasswordChange
	export const Change = PasswordChange
	export type Set = PasswordSet
	export const Set = PasswordSet
	export const type = isly.union<Password, Change, Set, string>(Change.type, Set.type, isly.string(/.+/))
	export const is = type.is
	export const flaw = type.flaw
	export async function hash(password: string, hashSecret?: string): Promise<cryptly.Password.Hash | gracely.Error> {
		let result: cryptly.Password.Hash | gracely.Error
		if (!hashSecret)
			result = gracely.server.misconfigured("hashSecret", "hashSecret is not set in worker environment")
		else
			result = await cryptly.Password.hash(
				cryptly.Signer.create("HMAC", "SHA-512", hashSecret),
				password,
				cryptly.RandomValue.generate(new Uint8Array(64)).toString()
			)
		return result
	}
	export async function verify(
		password: string | Change,
		hash: cryptly.Password.Hash,
		hashSecret?: string
	): Promise<boolean | gracely.Error> {
		return hashSecret
			? await cryptly.Password.verify(
					cryptly.Signer.create("HMAC", "SHA-512", hashSecret),
					hash,
					typeof password == "string" ? password : password.old
			  )
			: gracely.server.misconfigured("hashSecret", "hashSecret is not set in worker environment")
	}
}
