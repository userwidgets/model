import { userwidgets } from "../index"

describe("Organization", () => {
	const creatable: userwidgets.Organization.Creatable = {
		name: "organization name",
		permissions: ["organization", "user"],
		users: [
			{
				email: "jane@example.com",
				permissions: { "*": ["app.view"], organization: ["custom.write"] },
			},
		],
	}
	it("is", () => {
		expect(userwidgets.Organization.Creatable.is(creatable)).toEqual(true)
	})
})
