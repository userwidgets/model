import { gracely } from "gracely"
import { userwidgets } from "../../index"

describe("User.Feedback", () => {
	it("is", () => {
		const notification: userwidgets.User.Feedback.Notification = {
			email: "user@app.com",
			response: gracely.client.notFound(),
		}
		const invitation: userwidgets.User.Feedback.Invitation = {
			email: "user@app.com",
			invite: "asd",
			response: gracely.client.notFound(),
		}
		let feedback: userwidgets.User.Feedback = notification
		expect(userwidgets.User.Feedback.is(feedback)).toEqual(true)
		feedback = invitation
		expect(userwidgets.User.Feedback.is(feedback)).toEqual(true)
		expect(userwidgets.User.Feedback.is(gracely.client.notFound())).toEqual(true)
		expect(userwidgets.User.Feedback.is({})).toEqual(false)
	})
})
