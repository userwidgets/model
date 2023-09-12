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
			permissions: "*app.view *.org.view *.user.view +---o1---.organization.view +---o1---.user.view",
		}
		expect(userwidgets.User.Key.Creatable.is(creatable)).toBe(true)
	})
	it("custom", () => {
		type Claims = { id: string }
		const claims = isly.object<Claims>({ id: isly.string() })
		type Creatable = userwidgets.User.Key.Creatable<Claims>
		const type = userwidgets.User.Key.Creatable.type.create({ claims })
		const creatable: Creatable = {
			id: "r0ck3t",
			name: { first: "jessie", last: "doe" },
			email: "jessie@rocket.com",
			permissions: "o--o1--o.user.view",
		}
		expect(type.is(creatable)).toEqual(true)
	})
})
