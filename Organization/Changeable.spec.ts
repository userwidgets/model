import { isoly } from "isoly"
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

	it("get", () => {
		expect(userwidgets.Organization.Changeable.type.get({ ...organization, created: isoly.Date.now() })).toEqual(
			organization
		)
	})
	const invite: userwidgets.Organization.Changeable.Invite = {
		user: "James@example.com",
	}
	it("invite is", () => {
		expect(userwidgets.Organization.Changeable.Invite.is(invite)).toEqual(true)
		expect(userwidgets.Organization.Changeable.is({ users: [invite, "name@example.com"] })).toEqual(true)
		expect(userwidgets.Organization.Changeable.is({ users: [{ user: 1 }, "name@example.com"] })).toEqual(false)
		expect(
			userwidgets.Organization.Changeable.is({ users: [{ name: "James@example.com" }, "name@example.com"] })
		).toEqual(false)
	})
})
