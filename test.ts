import { isly } from "isly"

export type Baz = { baz: boolean }
export const baz = isly.object<Baz>({ baz: isly.boolean() })
export type Foo<T> = Baz & T

export function create<T>(type: isly.Type<T>): isly.Type<Foo<T>> {
	return isly.intersection<Baz & T, Baz, T>(baz, type)
}

export const type = create(isly.object())
