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
						user: {
							read: true,
						},
					},
					otherApplicationId: {},
				},
				organizations: {},
			},
			modified: isoly.DateTime.now(),
		}
		expect(model.User.is(user)).toEqual(true)
	})
})
