import { userwidgets } from "../../index"

describe("User.Permissions.Readable", () => {
	it("is", () => {
		const readable: userwidgets.User.Permissions.Readable = {
			"*": { user: { read: true } },
			organization: { banking: { write: true } },
		}
		expect(userwidgets.User.Permissions.Readable.is(readable)).toEqual(true)
		expect(userwidgets.User.Permissions.Readable.is({})).toEqual(true)
	})
	it("allowUpdate", () => {
		const key: userwidgets.User.Key = {
			issuer: "asd",
			audience: "asd",
			issued: "2022-08-03T10:53:14.130Z",
			expires: "2022-08-03T10:53:14.130Z",
			name: { first: "john", last: "doe" },
			email: "john@example.com",
			permissions: {
				"*": { user: { write: true } },
				acme: {
					organization: { write: true },
					user: {},
				},
			},
			token: "asd",
		}
		expect(userwidgets.User.Permissions.Readable.allowUpdate(key, {})).toEqual(true)
		expect(userwidgets.User.Permissions.Readable.allowUpdate(key, { acme: { user: { read: true } } })).toEqual(false)
		expect(userwidgets.User.Permissions.Readable.allowUpdate(key, { bcme: { user: { read: true } } })).toEqual(false)
		expect(userwidgets.User.Permissions.Readable.allowUpdate(key, { bcme: { user: { write: true } } })).toEqual(false)
		expect(userwidgets.User.Permissions.Readable.allowUpdate(key, { acme: { user: { write: false } } })).toEqual(true)
		expect(
			userwidgets.User.Permissions.Readable.allowUpdate(key, { acme: { organization: { write: false } } })
		).toEqual(true)
	})
	it("update", () => {
		let current: userwidgets.User.Permissions.Readable = {
			acme: { user: { read: true } },
		}
		let alter: userwidgets.User.Permissions.Readable = {
			acme: { user: { read: false, write: true } },
		}
		expect(userwidgets.User.Permissions.Readable.update(current, alter)).toEqual({
			acme: { user: { read: false, write: true } },
		})
		current = {
			acme: { user: { read: true } },
		}
		alter = {
			acme: { user: { write: true }, organization: { read: true } },
			bcme: { organization: { read: true } },
		}
		userwidgets.User.Permissions.Readable.update(current, alter)
		expect(current).toEqual({
			acme: { user: { read: true, write: true }, organization: { read: true } },
			bcme: { organization: { read: true } },
		})
	})
	it("copy", () => {
		const readable: userwidgets.User.Permissions.Readable = {
			acme: { user: { read: true } },
		}
		let result = userwidgets.User.Permissions.Readable.copy(readable)
		expect(userwidgets.User.Permissions.Readable.is(result)).toEqual(true)
		expect(result).toEqual(readable)
		expect(result).not.toBe(readable)
		result = userwidgets.User.Permissions.Readable.copy(readable, false)
		expect(result).not.toEqual(readable)
		expect(result).toEqual({ acme: { user: { read: false } } })
	})
	it("assign", () => {
		const target: userwidgets.User.Permissions.Readable = {
			acme: { user: { read: true }, custom: { read: true } },
		}
		const source: userwidgets.User.Permissions.Readable = {
			acme: { organization: { write: false }, user: { write: true, read: false } },
		}
		const result = userwidgets.User.Permissions.Readable.assign(target, source)
		expect(result).toBe(target)
		expect(result).toEqual({
			acme: { organization: { write: false }, user: { write: true, read: false }, custom: { read: true } },
		})
	})
})
