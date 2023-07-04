import { userwidgets } from "../../index"

describe("User.Credentials.Register", () => {
	const register: userwidgets.User.Credentials.Register = {
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
		expect(userwidgets.User.Credentials.Register.is(register)).toEqual(true)
		expect(userwidgets.User.Credentials.Register.validate(register)).toEqual(true)
	})
})
