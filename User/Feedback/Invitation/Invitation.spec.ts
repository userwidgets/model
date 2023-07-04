import { gracely } from "gracely"
import { userwidgets } from "../../../index"

describe("User.Feedback.Invitation.Invitation", () => {
	it("is", () => {
		let invitation: userwidgets.User.Feedback.Invitation.Interface = {
			email: "user@app.com",
			invite: "asd",
			response: gracely.client.notFound(),
		}
		expect(userwidgets.User.Feedback.Invitation.Interface.is(invitation)).toEqual(true)
		expect(userwidgets.User.Feedback.Invitation.is(invitation)).toEqual(true)
		invitation = { ...invitation, response: { status: 200 } }
		expect(userwidgets.User.Feedback.Invitation.Interface.is(invitation)).toEqual(true)
		expect(userwidgets.User.Feedback.Invitation.is(invitation)).toEqual(true)
		expect(
			userwidgets.User.Feedback.Invitation.is(
				Object.fromEntries(Object.entries(invitation).filter(([property, _]) => property != "response"))
			)
		).toEqual(true)
	})
})
