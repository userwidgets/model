import { isoly } from "isoly"
import { userwidgets } from "../index"

describe("User.Readable", () => {
	it("is", () => {
		const readable: userwidgets.User.Readable = {
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
		expect(userwidgets.User.Readable.is(readable)).toEqual(true)
		expect(
			userwidgets.User.Readable.is({
				...readable,
				permissions: { "*": { user: { read: true } }, organizationId: { user: { read: true } } },
			})
		).toEqual(true)
		expect(
			userwidgets.User.Readable.is({ ...readable, created: isoly.DateTime.now(), modified: isoly.DateTime.now() })
		).toEqual(true)
	})
	it("to", () => {
		const user: userwidgets.User = {
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
		const result = userwidgets.User.Readable.to(user, "applicationId")
		expect(userwidgets.User.Readable.is(result)).toEqual(true)
	})
})
