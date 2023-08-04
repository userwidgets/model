import * as authly from "authly"
import { isly } from "isly"
import { userwidgets } from "../../index"

const now = new Date()
authly.Issuer.defaultIssuedAt = Math.floor(now.getTime() / 1000)
describe("Creatable", () => {
	it("is", async () => {
		const creatable: userwidgets.User.Key.Creatable = {
			name: { first: "john", last: "doe" },
			email: "john@example.com",
			permissions: {
				"*": {
					app: { view: true },
					org: { view: true },
					user: { view: true },
				},
				"---o1---": {
					organization: { view: true },
					user: { view: true },
				},
			},
		}
		expect(userwidgets.User.Key.Creatable.is(creatable)).toBe(true)
	})
	it("custom", () => {
		type Claims = { id: string }
		const claims = isly.object<Claims>({ id: isly.string() })
		type Permissions = { foo: boolean }
		const permissions = isly.object<Permissions>({ foo: isly.boolean() })
		type Creatable = userwidgets.User.Key.Creatable<Claims, Permissions>
		const type = userwidgets.User.Key.Creatable.type.create({ claims, permissions })
		const creatable: Creatable = {
			id: "r0ck3t",
			name: { first: "jessie", last: "doe" },
			email: "jessie@rocket.com",
			permissions: { "o--o1--o": { user: { view: true }, foo: false } },
		}
		const dirty = {
			id: "r0ck3t",
			name: { first: "jessie", last: "doe" },
			email: "jessie@rocket.com",
			permissions: { "o--o1--o": { user: { view: true, garbage: true }, foo: false } },
		}
		expect(type.is(creatable)).toEqual(true)
		expect(type.is(dirty)).toEqual(true)
		expect(type.get(dirty)).not.toEqual(undefined)
		expect(type.get(dirty)).not.toEqual(dirty)
		expect(type.is(type.get(dirty))).toEqual(true)
	})
})
