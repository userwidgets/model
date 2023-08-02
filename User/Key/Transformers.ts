import { isoly } from "isoly"
import { authly } from "authly"

export const transformers: authly.Property.Creatable[] = [
	{
		issued: {
			forward: (value: string) => isoly.DateTime.epoch(value, "seconds"), // "forward" is never used, since authly.Issuer creates the iat-value.
			backward: (value: number) => isoly.DateTime.create(value),
		},
		expires: {
			forward: (value: string) => isoly.DateTime.epoch(value, "seconds"), // "forward" is never used, since authly.Issuer creates the exp-value.
			backward: (value: number) => isoly.DateTime.create(value),
		},
	},
	{
		issuer: "iss",
		audience: "aud",
		issued: "iat",
		expires: "exp",
		email: "sub",
		permissions: "per",
		name: "nam",
		token: "tok",
	},
]
const record: Record<string, Transformer | undefined> = {}
export type Transformer = authly.Property.Creatable
export namespace Transformer {
	export function add(name: string, transformer: Transformer): Transformer {
		remove(name)
		record[name] = transformer
		transformers.push(transformer)
		return transformer
	}
	export function remove(name: string): Transformer | undefined {
		const index = transformers.findIndex(transformer => transformer == record[name])
		return index == -1 ? undefined : transformers.splice(index, 1).at(0)
	}
}
