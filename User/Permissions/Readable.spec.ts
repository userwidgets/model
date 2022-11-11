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
	it("allowUpdate", () => {
		const key: model.User.Key = {
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
		expect(model.User.Permissions.Readable.allowUpdate(key, {})).toEqual(true)
		expect(model.User.Permissions.Readable.allowUpdate(key, { acme: { user: { read: true } } })).toEqual(false)
		expect(model.User.Permissions.Readable.allowUpdate(key, { bcme: { user: { read: true } } })).toEqual(false)
		expect(model.User.Permissions.Readable.allowUpdate(key, { bcme: { user: { write: true } } })).toEqual(false)
		expect(model.User.Permissions.Readable.allowUpdate(key, { acme: { user: { write: false } } })).toEqual(true)
		expect(model.User.Permissions.Readable.allowUpdate(key, { acme: { organization: { write: false } } })).toEqual(true)
	})
	it("update", () => {
		let current: model.User.Permissions.Readable = {
			acme: { user: { read: true } },
		}
		let alter: model.User.Permissions.Readable = {
			acme: { user: { read: false, write: true } },
		}
		expect(model.User.Permissions.Readable.update(current, alter)).toEqual({
			acme: { user: { read: false, write: true } },
		})
		current = {
			acme: { user: { read: true } },
		}
		alter = {
			acme: { user: { write: true }, organization: { read: true } },
			bcme: { organization: { read: true } },
		}
		model.User.Permissions.Readable.update(current, alter)
		expect(current).toEqual({
			acme: { user: { read: true, write: true }, organization: { read: true } },
			bcme: { organization: { read: true } },
		})
	})
})
