import { userwidgets } from "../../index"

describe("Permissions.Organization", () => {
	it("is", () => {
		const permissions: userwidgets.User.Permissions.Organization = {
			id: { user: true, whatever: true },
		}
		expect(userwidgets.User.Permissions.Organization.type.is(permissions)).toEqual(true)
		expect(userwidgets.User.Permissions.Application.is({ ...permissions, empty: {} })).toEqual(true)
		expect(userwidgets.User.Permissions.Application.is({ ...permissions, garbage: 123 })).toEqual(false)
	})
})
