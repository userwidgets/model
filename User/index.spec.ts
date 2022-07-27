import * as isoly from "isoly"
import * as model from "../index"
describe("User", () => {
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
					organization: {},
					user: {},
				},
				organizationId: {
					organization: {},
					user: {},
				},
				orgId: {
					organization: {},
					user: {
						read: true,
					},
				},
			},
		},
		modified: isoly.DateTime.now(),
	}
	it("is", () => {
		expect(model.User.is(user)).toEqual(true)
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
