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
})
