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
				"*": { user: { read: true } },
				organizationId: { user: { read: true } },
			},
		}
		expect(model.User.Readable.is(readable))
		expect(
			model.User.Readable.is({
				...readable,
				permissions: { "*": { user: { read: true } }, organizationId: { user: { read: true } } },
			})
		)
		expect(model.User.Readable.is({ ...readable, created: isoly.DateTime.now(), modified: isoly.DateTime.now() }))
	})
})
