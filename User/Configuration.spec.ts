import { userwidgets } from "../index"
describe("Configuration", () => {
	it("addDefault", () => {
		expect(userwidgets.Configuration.addDefault({})).toMatchObject<Partial<userwidgets.Configuration>>({
			inviteParameterName: "invite",
			pathPrefix: "",
		})
		expect(userwidgets.Configuration.addDefault({}, "inviteParameterName")).toEqual({
			inviteParameterName: "invite",
		})
		expect(userwidgets.Configuration.addDefault({}, "inviteParameterName", "pathPrefix")).toEqual({
			inviteParameterName: "invite",
			pathPrefix: "",
		})
	})
})
