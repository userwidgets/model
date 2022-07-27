// import * as isoly from "isoly"
import * as authly from "authly"
import * as model from "../../index"
const now = new Date()
// const timeNow = isoly.DateTime.now()
authly.Issuer.defaultIssuedAt = Math.floor(now.getTime() / 1000)
describe("Creatable", () => {
	it("is", async () => {
		const creatable: model.User.Key.Creatable = {
			name: { first: "john", last: "doe" },
			email: "john@example.com",
			permissions: { "*": "" },
		}
		expect(model.User.Key.Creatable.is(creatable)).toBe(true)
	})
})
