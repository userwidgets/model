import { isly } from "isly"

export interface Set {
	new: string
	repeat: string
}

export namespace Set {
	export const type = isly.object<Set>({
		new: isly.string(/.+/),
		repeat: isly.string(/.+/),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function validate(passwords: Set): boolean {
		return passwords.new == passwords.repeat && passwords.new.length >= 6
	}
}
