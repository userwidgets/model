import * as model from "../../index"

describe("User.Permissions.Readable", () => {
	it("is", () => {
		const readable: model.User.Permissions.Readable = {
			"*": { user: { read: true } },
			organization: { banking: { write: true } },
		}
		expect(model.User.Permissions.Readable.is(readable)).toEqual(true)
		expect(model.User.Permissions.Readable.is({})).toEqual(true)
	})
})
