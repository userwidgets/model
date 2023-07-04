import { userwidgets } from "../../index"

describe("User.Permissions", () => {
	it("is", () => {
		const permissions: userwidgets.User.Permissions = {
			"---a1---": {
				"*": { user: { read: true } },
			},
			otherApplication: {
				organizationId: { organization: { read: true } },
			},
		}
		expect(userwidgets.User.Permissions.is(permissions)).toEqual(true)
		expect(userwidgets.User.Permissions.is({})).toEqual(true)
	})
})
