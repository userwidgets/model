import { userwidgets } from "../index"

describe("Organization", () => {
	const creatable: userwidgets.Organization.Creatable = {
		name: "organization name",
		permissions: ["organization", "user"],
	}
	it("is", () => {
		expect(userwidgets.Organization.Creatable.is(creatable)).toEqual(true)
	})
})
