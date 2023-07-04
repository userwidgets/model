import { isoly } from "isoly"
import { userwidgets } from "../index"

describe("Application", () => {
	const now = isoly.DateTime.now()
	it("is", () => {
		const application: userwidgets.Application = {
			id: "---a1---",
			name: "example",
			organizations: {
				"---o1---": {
					id: "---o1---",
					name: "Example AB",
					users: ["johnny@app.com", "john@app.com", "richard@app.com"],
					created: now,
					modified: now,
					permissions: ["organization", "user"],
				},
				"---o2---": {
					id: "---o2---",
					name: "Acme AB",
					users: ["john@app.com", "jane@app.com"],
					created: now,
					modified: now,
					permissions: ["organization", "user"],
				},
			},
			permissions: ["application", "organization", "user", "custom"],
			created: now,
			modified: now,
		}
		expect(userwidgets.Application.is(application)).toEqual(true)
	})
})
