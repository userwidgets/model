import * as model from "../../index"

describe("User.Tag.Creatable", () => {
	it("is", () => {
		const signature: model.User.Tag.Creatable = {
			email: "jane@example.com",
			active: true,
			permissions: {
				"*": {
					application: {},
					organization: {},
					user: {},
				},
				acme: {
					organization: {},
					user: {},
				},
			},
		}
		expect(model.User.Tag.Creatable.is(signature)).toEqual(true)
	})
})
