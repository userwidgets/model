import { Change as PasswordChange } from "./Change"
import { Set as PasswordSet } from "./Set"

export type Password = PasswordChange | PasswordSet

export namespace Password {
	export function is(value: Password | any): value is (PasswordChange | PasswordSet) & Record<string, any> {
		return PasswordSet.is(value) || PasswordChange.is(value)
	}
	export type Change = PasswordChange
	export const Change = PasswordChange
	export type Set = PasswordSet
	export const Set = PasswordSet
}
