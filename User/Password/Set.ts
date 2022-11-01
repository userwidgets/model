export interface Set {
	new: string
	repeat: string
}

export namespace Set {
	export function is(value: Set | any): value is Set & Record<string, any> {
		return typeof value == "object" && typeof value.new == "string" && typeof value.repeat == "string"
	}
	export function validate(value: Set): boolean {
		return value.new == value.repeat && value.new.length >= 6
	}
}
