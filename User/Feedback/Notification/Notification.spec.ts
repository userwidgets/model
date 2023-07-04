import { gracely } from "gracely"
import { userwidgets } from "../../../index"

describe("User.Feedback.Notification.Notification", () => {
	it("is", () => {
		let notification: userwidgets.User.Feedback.Notification.Interface = {
			email: "user@app.com",
			response: gracely.client.notFound(),
		}
		expect(userwidgets.User.Feedback.Notification.Interface.is(notification)).toEqual(true)
		expect(userwidgets.User.Feedback.Notification.is(notification)).toEqual(true)
		notification = { ...notification, response: { status: 200 } }
		expect(userwidgets.User.Feedback.Notification.Interface.is(notification)).toEqual(true)
		expect(userwidgets.User.Feedback.Notification.is(notification)).toEqual(true)
		expect(
			userwidgets.User.Feedback.Notification.is(
				Object.fromEntries(Object.entries(notification).filter(([property, _]) => property != "response"))
			)
		).toEqual(true)
	})
})
