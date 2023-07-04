import * as authly from "authly"
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
					application: {},
					organization: {},
					user: {},
				},
				"---o1---": {
					organization: {},
					user: {},
				},
			},
		}
		expect(userwidgets.User.Key.Creatable.is(creatable)).toBe(true)
	})
})
