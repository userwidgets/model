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
		permissions: "+---o2---.user.view",
		created: now,
		modified: now,
	}
	it("is", () => {
		expect(userwidgets.User.is(user)).toEqual(true)
		const u: userwidgets.User = {
			email: "jessie@example.com",
			name: { first: "jessie", last: "doe " },
			permissions: "*.user.view",
			created: now,
			modified: now,
		}
		expect(userwidgets.User.is(u)).toEqual(true)
	})
})
