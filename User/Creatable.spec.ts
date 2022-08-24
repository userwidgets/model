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
			applicationId: {
				"*": {
					application: {},
					organization: {},
					user: {},
				},
				organizationId: {
					organization: {},
					user: {},
				},
				orgId: {
					organization: {},
					user: {
						read: true,
					},
				},
			},
		},
	}
	it("is", () => {
		expect(model.User.Creatable.is(creatable)).toEqual(true)
	})
})
