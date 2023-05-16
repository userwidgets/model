import * as model from "../../index"

describe("User.Invite.Creatable", () => {
	it("is", () => {
		const signature: model.User.Invite.Creatable = {
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
		expect(model.User.Invite.Creatable.is(signature)).toEqual(true)
	})
})
