import { isoly } from "isoly"
import { userwidgets } from "../index"

describe("User", () => {
	const now = isoly.DateTime.now()
	const user: userwidgets.User = {
		email: "jane@example.com",
		name: {
			first: "jane",
			last: "doe",
		},
		permissions: {
			"---a1---": {
				"*": {
					application: {},
					user: {},
				},
				"---o1---": {
					organization: {},
				},
				"---o2---": {
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
		expect(userwidgets.User.is(user)).toEqual(true)
		const u: userwidgets.User = {
			email: "jessie@example.com",
			name: { first: "jessie", last: "doe " },
			permissions: {
				"---a1---": {
					"*": { user: { write: true } },
				},
			},
			created: now,
			modified: now,
		}
		expect(userwidgets.User.is(u)).toEqual(true)
	})
	// it("toKey", () => {
	// 	let key = userwidgets.User.toKey(user, "---a1---")
	// 	let keys = Object.keys(key?.permissions ?? {})
	// 	expect(keys.length).toEqual(3)
	// 	expect(userwidgets.User.Key.Creatable.is(key)).toEqual(true)

	// 	key = userwidgets.User.toKey(user, "---a1---", ["---o2---"])
	// 	keys = Object.keys(key?.permissions ?? {})
	// 	expect(keys.length).toEqual(2)
	// 	expect(keys.includes("---o2---")).toEqual(true)
	// 	expect(keys.includes("---o3---")).toEqual(false)
	// 	expect(keys.includes("*")).toEqual(true)

	// 	key = userwidgets.User.toKey(user, "---a4---")
	// 	expect(key).toEqual(undefined)
	// })
})
