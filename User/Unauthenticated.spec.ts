import { userwidgets } from "../index"

describe("User.Name", () => {
	const name: userwidgets.User.Unauthenticated = {
		status: 400,
		type: "malformed header",
		content: {
			header: "authorization-2fa",
			description: "Back up recovery code for two factor authenticator.",
		},
	}
	it("is", () => {
		expect(userwidgets.User.Unauthenticated.is(name)).toBeTruthy()
	})
})
