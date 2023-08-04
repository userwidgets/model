import { userwidgets } from "../../index"

describe("Permissions.Organization", () => {
	it("is", () => {
		const permissions: userwidgets.User.Permissions.Organization = {
			id: { user: true, whatever: true },
			foo: { bar: { baz: true }, baz: { bar: false } },
		}
		expect(userwidgets.User.Permissions.Organization.is(permissions)).toEqual(true)
		expect(userwidgets.User.Permissions.Organization.is({ org: true })).toEqual(true)
		expect(userwidgets.User.Permissions.Organization.is({ app: true })).toEqual(true)
		expect(userwidgets.User.Permissions.Organization.is({ app: false })).toEqual(true)
		expect(userwidgets.User.Permissions.Organization.is({ ...permissions, empty: {} })).toEqual(true)
		expect(userwidgets.User.Permissions.Organization.is({ ...permissions, garbage: 123 })).toEqual(false)
		expect(userwidgets.User.Permissions.Organization.is({ org: false })).toEqual(false)
	})
})
