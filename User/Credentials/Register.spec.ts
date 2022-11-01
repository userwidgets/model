import * as model from "../../index"

describe("User.Credentials.Register", () => {
	const register: model.User.Credentials.Register = {
		user: "jane@example.com",
		name: {
			first: "jane",
			last: "doe",
		},
		password: {
			new: "asd123",
			repeat: "asd123",
		},
	}
	it("is", () => {
		expect(model.User.Credentials.Register.is(register)).toEqual(true)
		expect(model.User.Credentials.Register.validate(register)).toEqual(true)
	})
})
