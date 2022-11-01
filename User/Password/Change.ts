import { Set } from "./Set"

export interface Change extends Set {
	old: string
}

export namespace Change {
	export function is(value: Change | any): value is Change & Record<string, any> {
		return Set.is(value) && typeof value.old == "string"
	}
	export function validate(value: Change): boolean {
		return value.new.length >= 6 && value.new == value.repeat && value.new != value.old
	}
}
