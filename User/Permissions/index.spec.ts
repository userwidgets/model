import { isly } from "isly"
import { userwidgets } from "../../index"

describe("User.Permissions", () => {
	it("is", () => {
		const permissions: userwidgets.User.Permissions = {
			"*": { app: true, user: true, garbage: true },
			"---o1---": { user: true },
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
	it("check", () => {
		const permissions: userwidgets.User.Permissions = {
			"*": { user: { view: true }, org: { view: true } },
			a1b2c3d4: { user: { view: true, edit: true } },
		}
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user")).toEqual(false)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user.view")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "*", "user.view")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "*", "user.edit")).toEqual(false)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user.edit")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "org.view")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "org.edit")).toEqual(false)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user.edit", "org.view")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user.edit", "org.edit")).toEqual(false)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4")).toEqual(false)
	})
	it("remove", () => {
		const permissions: userwidgets.User.Permissions = {
			"*": { user: { view: true }, org: { view: true } },
			a1b2c3d4: { user: { view: true, edit: true } },
		}
		expect(
			userwidgets.User.Permissions.remove(userwidgets.User.Permissions.type, permissions, "a1b2c3d4", "user.view")
		).toEqual({
			"*": { user: { view: true }, org: { view: true } },
			a1b2c3d4: { user: { edit: true } },
		})
		expect(
			userwidgets.User.Permissions.remove(userwidgets.User.Permissions.type, permissions, "a1b2c3d4", "user")
		).toEqual({
			"*": { user: { view: true }, org: { view: true } },
		})
		expect(
			userwidgets.User.Permissions.remove(userwidgets.User.Permissions.type, permissions, "*", "user", "org")
		).toEqual({
			a1b2c3d4: { user: { view: true, edit: true } },
		})
		expect(userwidgets.User.Permissions.remove(userwidgets.User.Permissions.type, permissions, "a1b2c3d4")).toEqual({
			"*": { user: { view: true }, org: { view: true } },
		})
		expect(userwidgets.User.Permissions.remove(userwidgets.User.Permissions.type, permissions, "*")).toEqual({
			a1b2c3d4: { user: { view: true, edit: true } },
		})
		const partial = userwidgets.User.Permissions.remove(userwidgets.User.Permissions.type, permissions, "*")
		if (partial == undefined) {
			expect(partial).not.toEqual(undefined)
			return
		}
		expect(
			userwidgets.User.Permissions.remove(
				userwidgets.User.Permissions.type,
				partial,
				"a1b2c3d4",
				"user.view",
				"user.edit"
			)
		).toEqual({})
	})
	it("set", () => {
		const permissions: userwidgets.User.Permissions = {
			a1b2c3d4: { user: { view: true } },
		}
		expect(userwidgets.User.Permissions.set(userwidgets.User.Permissions.type, permissions, "a1b2c3d4")).toEqual({
			a1b2c3d4: true,
		})
		expect(
			userwidgets.User.Permissions.set(userwidgets.User.Permissions.type, permissions, "a1b2c3d4", "user")
		).toEqual({
			a1b2c3d4: { user: true },
		})
		expect(
			userwidgets.User.Permissions.set(
				userwidgets.User.Permissions.type,
				{ a1b2c3d4: { user: { view: true, edit: true } } },
				"a1b2c3d4",
				"user"
			)
		).toEqual({
			a1b2c3d4: { user: true },
		})
		expect(userwidgets.User.Permissions.set(userwidgets.User.Permissions.type, permissions, "a1b2c3d4", "")).toEqual({
			a1b2c3d4: { user: { view: true } },
		})
		expect(
			userwidgets.User.Permissions.set(userwidgets.User.Permissions.type, permissions, "a1b2c3d4", "user.edit")
		).toEqual({
			a1b2c3d4: { user: { view: true, edit: true } },
		})
		expect(userwidgets.User.Permissions.set(userwidgets.User.Permissions.type, permissions, "*", "user.edit")).toEqual({
			"*": { user: { edit: true } },
			a1b2c3d4: { user: { view: true } },
		})
	})
})
