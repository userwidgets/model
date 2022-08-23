import * as isoly from "isoly"
import * as model from "../index"
describe("Organization", () => {
	const now = isoly.DateTime.now()
	const creatable: model.Organization = {
		id: "id",
		name: "organization name",
		permissions: ["organization", "user"],
		users: [],
		created: now,
		modified: now,
	}
	it("is", () => {
		expect(model.Organization.is(creatable)).toEqual(true)
	})
})
