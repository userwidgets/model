import * as model from "../../index"

describe("User.Permissions", () => {
	it("is", () => {
		const permissions: model.User.Permissions = {
			applicationId: {
				"*": { user: { read: true } },
			},
			otherApplication: {
				organizationId: { organization: { read: true } },
			},
		}
		expect(model.User.Permissions.is(permissions)).toEqual(true)
		expect(model.User.Permissions.is({})).toEqual(true)
	})
})
