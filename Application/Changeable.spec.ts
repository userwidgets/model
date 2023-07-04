import { userwidgets } from "../index"

describe("Application.Changeable", () => {
	const application: userwidgets.Application.Changeable = {
		name: "my application",
		permissions: ["user", "application"],
	}
	it("is", () => {
		expect(userwidgets.Application.Changeable.is(application)).toEqual(true)
		expect(userwidgets.Application.Changeable.is((({ ...application }) => application)(application))).toEqual(true)
		expect(userwidgets.Application.Changeable.is((({ name, ...application }) => application)(application))).toEqual(
			true
		)
		expect(
			userwidgets.Application.Changeable.is((({ permissions, ...application }) => application)(application))
		).toEqual(true)
		expect(
			userwidgets.Application.Changeable.is((({ name, permissions, ...application }) => application)(application))
		).toEqual(true)
		expect(userwidgets.Application.Changeable.is({ name: "" })).toEqual(false)
		expect(userwidgets.Application.Changeable.is({ permissions: ["a", ""] })).toEqual(false)
		expect(userwidgets.Application.Changeable.is({ name: 1 })).toEqual(false)
	})
})
