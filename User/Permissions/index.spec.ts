import { userwidgets } from "../../index"

describe("User.Permissions", () => {
	it("is", () => {
		// const permissions: userwidgets.User.Permissions = {
		// 	"---a1---": {
		// 		"*": { user: { read: true } },
		// 	},
		// 	otherApplication: {
		// 		organizationId: { organization: { read: true } },
		// 	},
		// }
		const permissions: userwidgets.User.Permissions = {
			"*": { user: true },
			whatever: true,
			foo: { bar: { baz: false } },
		}
		expect(userwidgets.User.Permissions.is(permissions)).toEqual(true)
		expect(userwidgets.User.Permissions.is({})).toEqual(true)
	})
})
