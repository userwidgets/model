import * as authly from "authly"
import * as model from "../../index"

const now = new Date()
authly.Issuer.defaultIssuedAt = Math.floor(now.getTime() / 1000)
describe("Creatable", () => {
	it("is", async () => {
		const creatable: model.User.Key.Creatable = {
			name: { first: "john", last: "doe" },
			email: "john@example.com",
			permissions: {
				"*": {
					application: {},
					organization: {},
					user: {},
				},
			},
		}
		expect(model.User.Key.Creatable.is(creatable)).toBe(true)
	})
})
