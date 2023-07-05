import { isoly } from "isoly"
import { userwidgets } from "../index"

describe("Users.Changeable", () => {
	const user: userwidgets.User.Changeable = {
		name: { first: "my", last: "name" },
	}
	it("is", () => {
		expect(userwidgets.User.Changeable.is(user)).toEqual(true)
		expect(userwidgets.User.Changeable.is({})).toEqual(true)
		expect(userwidgets.User.Changeable.is({ name: "jessie" })).toEqual(false)
	})

	it("get", () => {
		expect(userwidgets.User.Changeable.type.get({ ...user, created: isoly.Date.now() })).toEqual(user)
	})
})
