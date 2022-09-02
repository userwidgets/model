import * as isoly from "isoly"
import * as model from "../index"
describe("User", () => {
	const now = isoly.DateTime.now()
	const user: model.User = {
		email: "jane@example.com",
		name: {
			first: "jane",
			last: "doe",
		},
		permissions: {
			applicationId: {
				"*": {
					application: {},
					user: {},
				},
				organizationId: {
					organization: {},
				},
				orgId: {
					organization: {},
					user: {
						read: true,
					},
				},
			},
		},
		created: now,
		modified: now,
	}
	it("is", () => {
		expect(model.User.is(user)).toEqual(true)
		const u: model.User = {
			email: "jessie@example.com",
			name: { first: "jessie", last: "doe " },
			permissions: {
				someAppId: {
					"*": { user: { write: true } },
				},
			},
			created: now,
			modified: now,
		}
		expect(model.User.is(u)).toEqual(true)
	})
	it("toKey", () => {
		let key = model.User.toKey(user, "applicationId")
		let keys = Object.keys(key?.permissions ?? {})
		expect(keys.length).toEqual(3)
		expect(model.User.Key.Creatable.is(key)).toEqual(true)

		key = model.User.toKey(user, "applicationId", ["orgId"])
		keys = Object.keys(key?.permissions ?? {})
		expect(keys.length).toEqual(2)
		expect(keys.includes("orgId")).toEqual(true)
		expect(keys.includes("organizationId")).toEqual(false)
		expect(keys.includes("*")).toEqual(true)

		key = model.User.toKey(user, "asd")
		expect(key).toEqual(undefined)
	})
})
