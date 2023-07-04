import { userwidgets } from "../index"

describe("Organization.Changeable", () => {
	const organization: userwidgets.Organization.Changeable = {
		name: "my organization",
		permissions: ["users", "invite"],
	}
	it("is", () => {
		expect(userwidgets.Organization.Changeable.is(organization)).toEqual(true)
		expect(userwidgets.Organization.Changeable.is((({ ...organization }) => organization)(organization))).toEqual(true)
		expect(userwidgets.Organization.Changeable.is((({ name, ...organization }) => organization)(organization))).toEqual(
			true
		)
		expect(
			userwidgets.Organization.Changeable.is((({ permissions, ...organization }) => organization)(organization))
		).toEqual(true)
		expect(
			userwidgets.Organization.Changeable.is((({ name, permissions, ...organization }) => organization)(organization))
		).toEqual(true)
		expect(userwidgets.Organization.Changeable.is({ name: "" })).toEqual(false)
		expect(userwidgets.Organization.Changeable.is({ permissions: ["foo", ""] })).toEqual(false)
		expect(userwidgets.Organization.Changeable.is({ name: 1 })).toEqual(false)
	})
})
