import * as isoly from "isoly"
import * as model from "../index"
describe("User", () => {
	it("is", () => {
		const user: model.User = {
			email: "jane@example.com",
			name: {
				first: "jane",
				last: "doe",
			},
			permissions: {
				applicationId: {
					permissions: {
						application: {},
						organization: {},
						user: {},
					},
					organizations: {
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
			},
			modified: isoly.DateTime.now(),
		}
		expect(model.User.is(user)).toEqual(true)
	})
})
