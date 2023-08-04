import { userwidgets } from "../../index"

describe("User.Permissions.Application", () => {
	it("is", () => {
		const permissions: userwidgets.User.Permissions.Application = {
			user: true,
			foo: { bar: { baz: true }, baz: { bar: false } },
		}
		expect(userwidgets.User.Permissions.Application.is(permissions)).toEqual(true)
		expect(userwidgets.User.Permissions.Application.is({ org: { view: true } })).toEqual(true)
		expect(userwidgets.User.Permissions.Application.is({ app: { view: true } })).toEqual(true)
		expect(userwidgets.User.Permissions.Application.is({ ...permissions, garbage: 123 })).toEqual(false)
		expect(userwidgets.User.Permissions.Application.is({ user: false })).toEqual(false)
		expect(userwidgets.User.Permissions.Application.is({ org: { view: false } })).toEqual(false)
		expect(userwidgets.User.Permissions.Application.is({ app: { view: false } })).toEqual(false)
	})
})
