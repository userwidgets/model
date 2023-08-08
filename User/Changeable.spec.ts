import { isoly } from "isoly"
import { userwidgets } from "../index"

describe("Users.Changeable", () => {
	const user: userwidgets.User.Changeable = {
		name: { first: "my", last: "name" },
		permissions: { "*": {}, "---o1---": {} },
		password: { new: "foobar", repeat: "foobar" },
	}
	it("is", () => {
		expect(userwidgets.User.Changeable.is(user)).toEqual(true)
		expect(userwidgets.User.Changeable.is({})).toEqual(true)
		expect(userwidgets.User.Changeable.is({ name: "jessie" })).toEqual(false)
		expect(userwidgets.User.Changeable.is({ name: user.name })).toEqual(true)
		expect(userwidgets.User.Changeable.is({ permissions: user.permissions })).toEqual(true)
		expect(userwidgets.User.Changeable.is({ password: user.password })).toEqual(true)
		expect(userwidgets.User.Changeable.is((({ name, ...user }) => user)(user))).toEqual(true)
		expect(userwidgets.User.Changeable.is((({ permissions, ...user }) => user)(user))).toEqual(true)
		expect(userwidgets.User.Changeable.is((({ password, ...user }) => user)(user))).toEqual(true)
	})

	it("get", () => {
		expect(userwidgets.User.Changeable.type.get({ ...user, created: isoly.Date.now() })).toEqual(user)
	})
})
