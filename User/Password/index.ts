import * as cryptly from "cryptly"
import * as gracely from "gracely"
import { Change as PasswordChange } from "./Change"
import { Set as PasswordSet } from "./Set"

export type Password = string

export namespace Password {
	export function is(value: Password | any): value is (PasswordChange | PasswordSet) & Record<string, any> {
		return typeof value == "string"
	}
	export async function hash(password: Password, hashSecret?: string): Promise<cryptly.Password.Hash | gracely.Error> {
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
	export const verify = PasswordChange.verify
	export type Change = PasswordChange
	export const Change = PasswordChange
	export type Set = PasswordSet
	export const Set = PasswordSet
}
