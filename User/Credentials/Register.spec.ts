import * as model from "../../index"

describe("User.Credentials.Register", () => {
	const register: model.User.Credentials.Register = {
		user: "jane@example.com",
		name: {
			first: "jane",
			last: "doe",
		},
		password: {
			new: "asd",
			repeat: "asd",
		},
	}
	it("is", () => {
		expect(model.User.Credentials.Register.is(register)).toEqual(true)
	})
})
