import * as model from "../../index"

describe("User.Credentials", () => {
	const credentials: model.User.Credentials = {
		user: "jane@example.com",
		password: "asd",
	}
	it("is", () => {
		expect(model.User.Credentials.is(credentials)).toEqual(true)
	})
	it("to basic", () => {
		expect(model.User.Credentials.toBasic(credentials)).toEqual("Basic amFuZUBleGFtcGxlLmNvbTphc2Q=")
	})
	it("from basic", () => {
		expect(model.User.Credentials.fromBasic("Basic amFuZUBleGFtcGxlLmNvbTphc2Q=")).toEqual(credentials)
	})
})
