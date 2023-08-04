import { isly } from "isly"
import { userwidgets } from "../../index"

describe("User.Permissions", () => {
	it("is", () => {
		const permissions: userwidgets.User.Permissions = {
			"*": { user: true, garbage: true },
			"---o1---": {},
			"---o2---": { foo: { bar: { baz: false } } },
		}
		expect(userwidgets.User.Permissions.is(permissions)).toEqual(true)
		expect(userwidgets.User.Permissions.is({})).toEqual(true)
		expect(userwidgets.User.Permissions.is({ "*": { app: true } })).toEqual(true)
		expect(userwidgets.User.Permissions.is({ "*": { app: false } })).toEqual(false)
		expect(userwidgets.User.Permissions.is({ "---o1---": { app: true } })).toEqual(true)
		expect(userwidgets.User.Permissions.is({ "---o1---": { app: false } })).toEqual(true)
		expect(userwidgets.User.Permissions.is({ "---o1---": { user: { view: true, garbage: true } } })).toEqual(true)
	})
	it("custom", () => {
		type Flags = { foo: { view: boolean } }
		type Permissions = userwidgets.User.Permissions<Flags>
		const permissionsType = isly.object<Flags>({
			foo: isly.object({ view: isly.boolean() }),
		})
		const type = userwidgets.User.Permissions.type.create(permissionsType)
		const permissions: Permissions = {
			"*": { foo: { view: false } },
			"o--o1--o": { foo: { view: true } },
		}
		console.log(type.is(permissions))
	})
})
