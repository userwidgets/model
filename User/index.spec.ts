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
				applications: {
					exampleApplicationId: {
						application: {
							// change app
							read: true,
							write: false,
						},
						organization: {
							// create / change orgs connected to app
							read: true,
							write: false,
						},
						user: {
							// create / change users connected to app
							read: true,
							write: true,
						},
					},
				},
				organizations: {
					exampleOrganizationId: {
						organization: {
							// change org
							read: true,
							write: true,
						},
						user: {
							// create / change users connected to org
							read: true,
							write: false,
						},
					},
				},
			},
			modified: isoly.DateTime.now(),
		}
		expect(model.User.is(user)).toEqual(true)
	})
})
