import { userwidgets } from "../../index"

describe("User.Invite.Creatable", () => {
	it("is", () => {
		const signature: userwidgets.User.Invite.Creatable = {
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
		expect(userwidgets.User.Invite.Creatable.is(signature)).toEqual(true)
	})
})
