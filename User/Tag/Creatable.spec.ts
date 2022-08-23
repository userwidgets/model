import * as model from "../../index"

describe("User.Signature.Creatable", () => {
	it("is", () => {
		const signature: model.User.Tag.Creatable = {
			email: "jane@example.com",
			organizationId: "acme",
		}
		expect(model.User.Tag.Creatable.is(signature)).toEqual(true)
	})
})
