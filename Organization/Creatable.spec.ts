import * as model from "../index"

describe("Organization", () => {
	const creatable: model.Organization.Creatable = {
		name: "organization name",
		permissions: ["organization", "user"],
		users: [
			{
				email: "jane@example.com",
				permissions: [{ application: { read: true } }, { custom: { write: true } }],
			},
		],
	}
	it("is", () => {
		expect(model.Organization.Creatable.is(creatable)).toEqual(true)
	})
})
