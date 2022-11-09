import * as isoly from "isoly"
import * as model from "../index"
describe("User.Readable", () => {
	it("is", () => {
		const readable: model.User.Readable = {
			email: "jessie@example.com",
			name: {
				first: "jessie",
				last: "doe",
			},
			permissions: {
				application: { user: { read: true } },
				organization: { user: { read: true } },
			},
		}
		expect(model.User.Readable.is(readable)).toEqual(true)
		expect(
			model.User.Readable.is({
				...readable,
				permissions: { "*": { user: { read: true } }, organizationId: { user: { read: true } } },
			})
		).toEqual(true)
		expect(
			model.User.Readable.is({ ...readable, created: isoly.DateTime.now(), modified: isoly.DateTime.now() })
		).toEqual(true)
	})
	it("to", () => {
		const user: model.User = {
			email: "jessie@example.com",
			name: {
				first: "jessie",
				last: "doe",
			},
			permissions: {
				applicationId: {},
			},
			created: isoly.DateTime.now(),
			modified: isoly.DateTime.now(),
		}
		const result = model.User.Readable.to(user, "applicationId", "organizationId")
		expect(model.User.Readable.is(result)).toEqual(true)
	})
})
