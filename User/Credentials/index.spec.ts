import { userwidgets } from "../../index"

describe("User.Credentials", () => {
	const credentials: userwidgets.User.Credentials = {
		user: "jane@example.com",
		password: "asd",
	}
	it("is", () => {
		expect(userwidgets.User.Credentials.is(credentials)).toEqual(true)
	})
	it("to basic", () => {
		expect(userwidgets.User.Credentials.toBasic(credentials)).toEqual("Basic amFuZUBleGFtcGxlLmNvbTphc2Q=")
	})
	it("from basic", () => {
		expect(userwidgets.User.Credentials.fromBasic("Basic amFuZUBleGFtcGxlLmNvbTphc2Q=")).toEqual(credentials)
	})
})
