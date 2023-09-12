import { userwidgets } from "../index"

describe("User.Creatable", () => {
	const creatable: userwidgets.User.Creatable = {
		email: "jane@example.com",
		password: { new: "asd", repeat: "asd" },
		name: { first: "jane", last: "doe" },
		permissions: "acme.user.view",
	}
	it("is", () => {
		expect(userwidgets.User.Creatable.is(creatable)).toEqual(true)
		expect(
			userwidgets.User.Creatable.is({
				email: "jane@example.com",
				password: { new: "asd", repeat: "asd" },
				name: { first: "jane", last: "doe" },
				permissions: "",
			})
		)
	})
})
