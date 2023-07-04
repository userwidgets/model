import { userwidgets } from "../index"

describe("User.Name", () => {
	const name: userwidgets.User.Name = {
		first: "jessie",
		last: "doe",
	}
	it("is", () => {
		expect(userwidgets.User.Name.is(name)).toEqual(true)
		expect(userwidgets.User.Name.is({ first: "", last: "doe" })).toEqual(false)
		expect(userwidgets.User.Name.is({ first: "jessie", last: "" })).toEqual(false)
		expect(userwidgets.User.Name.is((({ first, ...name }) => name)(name))).toEqual(false)
		expect(userwidgets.User.Name.is((({ last, ...name }) => name)(name))).toEqual(false)
	})
})
