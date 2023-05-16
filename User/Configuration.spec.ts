import * as model from "../index"
describe("Configuration", () => {
	it("addDefault", () => {
		expect(model.Configuration.addDefault({})).toMatchObject<Partial<model.Configuration>>({
			inviteParameterName: "invite",
			pathPrefix: "",
		})
		expect(model.Configuration.addDefault({}, "inviteParameterName")).toEqual({
			inviteParameterName: "invite",
		})
		expect(model.Configuration.addDefault({}, "inviteParameterName", "pathPrefix")).toEqual({
			inviteParameterName: "invite",
			pathPrefix: "",
		})
	})
})
