import { gracely } from "gracely"
import { userwidgets } from "../../../index"

describe("User.Feedback.Invitation", () => {
	it("is", () => {
		let invitation: userwidgets.User.Feedback.Invitation = {
			email: "somone@app.com",
			invite: "asd",
			response: gracely.client.notFound(),
		}
		expect(userwidgets.User.Feedback.Invitation.is(invitation)).toEqual(true)
		invitation = { ...invitation, response: { status: 200 } }
		expect(userwidgets.User.Feedback.Invitation.is(invitation)).toEqual(true)
		expect(userwidgets.User.Feedback.Invitation.is(gracely.client.notFound())).toEqual(true)
	})
})
