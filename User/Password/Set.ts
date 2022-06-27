export interface Set {
	new: string
	repeat: string
}

export namespace Set {
	export function is(value: Set | any): value is Set & Record<string, any> {
		return typeof value == "object" && value.new == "string" && value.repeat == "string"
	}
}
