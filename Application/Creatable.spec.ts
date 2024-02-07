import { userwidgets } from "../index"

describe("Application", () => {
	it("is", () => {
		const application: userwidgets.Application.Creatable = {
			name: "test application",
		}
		expect(userwidgets.Application.Creatable.is(application)).toEqual(true)
	})
})
