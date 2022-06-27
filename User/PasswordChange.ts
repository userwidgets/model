export interface PasswordChange {
	new: string
	old: string
	repeat: string
}

export namespace PasswordChange {
	export function is(value: PasswordChange | any): value is PasswordChange {
		return (
			typeof value == "object" &&
			typeof value.new == "string" &&
			typeof value.old == "string" &&
			typeof value.repeat == "string"
		)
	}
}
