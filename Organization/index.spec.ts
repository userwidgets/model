import { isoly } from "isoly"
import { userwidgets } from "../index"

describe("Organization", () => {
	const now = isoly.DateTime.now()
	const creatable: userwidgets.Organization = {
		id: "---o1---",
		name: "My organization name",
		permissions: ["organization", "user"],
		users: [],
		created: now,
		modified: now,
	}
	it("is", () => {
		expect(userwidgets.Organization.is(creatable)).toEqual(true)
	})
})
