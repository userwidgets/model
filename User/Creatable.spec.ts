import * as model from "../index"

describe("User.Creatable", () => {
	const creatable: model.User.Creatable = {
		email: "jane@example.com",
		password: {
			new: "asd",
			repeat: "asd",
		},
		name: {
			first: "jane",
			last: "doe",
		},
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
	it("is", () => {
		expect(model.User.Creatable.is(creatable)).toEqual(true)
	})
})
