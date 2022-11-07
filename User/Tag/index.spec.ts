import * as isoly from "isoly"
import * as authly from "authly"
import * as model from "../../index"

const now = new Date(Math.floor(new Date().getTime() / 1000) * 1000)
authly.Issuer.defaultIssuedAt = now.getTime() / 1000

describe("User.Tag", () => {
	const privateKey =
		"MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC7VJTUt9Us8cKj" +
		"MzEfYyjiWA4R4/M2bS1GB4t7NXp98C3SC6dVMvDuictGeurT8jNbvJZHtCSuYEvu" +
		"NMoSfm76oqFvAp8Gy0iz5sxjZmSnXyCdPEovGhLa0VzMaQ8s+CLOyS56YyCFGeJZ" +
		"qgtzJ6GR3eqoYSW9b9UMvkBpZODSctWSNGj3P7jRFDO5VoTwCQAWbFnOjDfH5Ulg" +
		"p2PKSQnSJP3AJLQNFNe7br1XbrhV//eO+t51mIpGSDCUv3E0DDFcWDTH9cXDTTlR" +
		"ZVEiR2BwpZOOkE/Z0/BVnhZYL71oZV34bKfWjQIt6V/isSMahdsAASACp4ZTGtwi" +
		"VuNd9tybAgMBAAECggEBAKTmjaS6tkK8BlPXClTQ2vpz/N6uxDeS35mXpqasqskV" +
		"laAidgg/sWqpjXDbXr93otIMLlWsM+X0CqMDgSXKejLS2jx4GDjI1ZTXg++0AMJ8" +
		"sJ74pWzVDOfmCEQ/7wXs3+cbnXhKriO8Z036q92Qc1+N87SI38nkGa0ABH9CN83H" +
		"mQqt4fB7UdHzuIRe/me2PGhIq5ZBzj6h3BpoPGzEP+x3l9YmK8t/1cN0pqI+dQwY" +
		"dgfGjackLu/2qH80MCF7IyQaseZUOJyKrCLtSD/Iixv/hzDEUPfOCjFDgTpzf3cw" +
		"ta8+oE4wHCo1iI1/4TlPkwmXx4qSXtmw4aQPz7IDQvECgYEA8KNThCO2gsC2I9PQ" +
		"DM/8Cw0O983WCDY+oi+7JPiNAJwv5DYBqEZB1QYdj06YD16XlC/HAZMsMku1na2T" +
		"N0driwenQQWzoev3g2S7gRDoS/FCJSI3jJ+kjgtaA7Qmzlgk1TxODN+G1H91HW7t" +
		"0l7VnL27IWyYo2qRRK3jzxqUiPUCgYEAx0oQs2reBQGMVZnApD1jeq7n4MvNLcPv" +
		"t8b/eU9iUv6Y4Mj0Suo/AU8lYZXm8ubbqAlwz2VSVunD2tOplHyMUrtCtObAfVDU" +
		"AhCndKaA9gApgfb3xw1IKbuQ1u4IF1FJl3VtumfQn//LiH1B3rXhcdyo3/vIttEk" +
		"48RakUKClU8CgYEAzV7W3COOlDDcQd935DdtKBFRAPRPAlspQUnzMi5eSHMD/ISL" +
		"DY5IiQHbIH83D4bvXq0X7qQoSBSNP7Dvv3HYuqMhf0DaegrlBuJllFVVq9qPVRnK" +
		"xt1Il2HgxOBvbhOT+9in1BzA+YJ99UzC85O0Qz06A+CmtHEy4aZ2kj5hHjECgYEA" +
		"mNS4+A8Fkss8Js1RieK2LniBxMgmYml3pfVLKGnzmng7H2+cwPLhPIzIuwytXywh" +
		"2bzbsYEfYx3EoEVgMEpPhoarQnYPukrJO4gwE2o5Te6T5mJSZGlQJQj9q4ZB2Dfz" +
		"et6INsK0oG8XVGXSpQvQh3RUYekCZQkBBFcpqWpbIEsCgYAnM3DQf3FJoSnXaMhr" +
		"VBIovic5l0xFkEHskAjFTevO86Fsz1C2aSeRKSqGFoOQ0tmJzBEs1R6KqnHInicD" +
		"TQrKhArgLXX4v3CddjfTRJkFWDbE/CkvKZNOrcf1nhaGCPspRJj2KUkj1Fhl9Cnc" +
		"dn/RsYEONbwQSjIfMPkvxF+8HQ=="
	const publicKey =
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo" +
		"4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u" +
		"+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh" +
		"kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ" +
		"0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg" +
		"cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc" +
		"mwIDAQAB"
	const creatable: model.User.Tag.Creatable = {
		email: "jane@example.com",
		active: false,
		permissions: {
			"*": {
				application: {},
				organization: {},
				user: {},
			},
			acme: {
				organization: {},
				user: {},
			},
		},
	}
	it("is", () => {
		const tag: model.User.Tag = {
			email: "jane@example.com",
			active: true,
			permissions: {
				"*": {
					application: {},
					organization: {},
					user: {},
				},
				acme: {
					organization: {},
					user: {},
					custom: {},
				},
			},
			audience: "applicationId",
			issuer: "jest",
			issued: "2022-08-03T10:53:14.130Z",
			expires: "2022-08-03T10:53:14.130Z",
			token: "fakeToken",
		}
		expect(model.User.Tag.is(tag)).toEqual(true)
	})
	it("signing", async () => {
		try {
			const issuer = model.User.Tag.Issuer.create(
				"userwidgets",
				"applicationId",
				"MIIEpAIBAAKCAQEAuqU98n52HN6Up2jO79MDvwnVc3nJrg8ahe40qarkvKGYDPP7TTJIM5JMMHFLQDk/dvRuFFvxmOFj29lI1shqICAhktOyQWB+BdwmnNuKwK1k6vwHGPPdijP7gZMeUXifO0BPbb+swtbwkATx+YT90haNi0Be3b7oUVOalnUC1LaEIT8xw+vSCs/wIdYkizNJl67d+6nHkeSOkkv8oAzaLU6OosflrGYk5IMeSuEJgw7TCM8jVSnqIVluGV0QtGGnZMuhFI3Rwc9L7ZbFaraX8RrcdR1S2MG8qksJwcL5QOzR02pHkFNtAg2LQcf0Lio6JOVAdGh1hCbHvGL46UfA1QIDAQABAoIBABHnrjSoGw6T77DLpiZtmMtn1xk30rgm7MVyX4zzPvQ1kE+VzELQkwqXe0WeaLilhUgVFMZRN7ER1jGN+6XXHg8s5eue8VfCOPS49N9RVFM9jxPXz5p+Mn+CkxsQEPWB28ykU7pUi+85DWTThJ8KOgtAbJ2yNCeTm9fJbGgIm5fqLHLOpkqvWx4KloOBghZweBBYXlYWE8nxyZ/atVhaN+70krrRYVUbVMLwC0RL3EpKyvN7zQ6V+F//uk68NB95vtCYobQN6jPU4H/aceOqMyhNsOFZ174zgfEeegI8pJ6DpJmEd02NUe06OKonvMtEX4UFpkJz3vxNB33SYf49KtUCgYEA4/Uz3k6+qzPX8HZidiNQs999FZgxF4N0do740h4xcBpDLIjWng0WNAEeDxlV/IUGSrmqNJJsUVOAOe0q/UzQ+0V8gNDT6vkJiebTWrtfB8WE79w9FLIaX/NXwrodVWy1r3duzQAGkskQW8arEqYRRAtkSSLADBYsIvcWnTYBQ48CgYEA0ZsKQ2adA8O4fspbTqMRWbUVDFR4U4rFIewZ/Q/75XyG0K2VvMqmoxA79zI67sXMDg9ELsu9B0ad3SMtCE0k1jY3NjmP3nzo7PSGBeas6tSylTZtxysfZVJRFrVJattUnC8RES6r6WNz7SJpG+G2jWUnFoFqdeHyLruH5ZcM81sCgYAm+JB5fPTTx/Uuws5qa/csCRUVUAN0haCvdBnNsiO5ioPZZTtrockd8uL0qdwtY4CD3eHfQvkJnkDZplYnH67KhkKWsxzHmvOqg6+2XzoL1hS3/OrkUt53cN6cB71kEUWuTbi/izWUepM1XW15rrJc86Wdazdx2YiKIbvX/JeSuQKBgQCCowy8gWHvDLcaXuiVlFCmBpR9wM/V0bGXuN1hueqXVwt3WBjxN6SwENgu8yGD28eYI6+tMtI3jK2rO9c/S0VgNR4oL6wZUOSjeqtlViYDnllHYkr9TUUeEzXy3z5I2TZcuYD7ookGxzNjYoT8Gat7aMX54uMFYbNdqQfD8mbh7QKBgQC2v/IHxVBTzQdnb6eAy8zlW7QZFg4rMwnsGJ58vx6fWwzK0lFLd2eG5pHA40xcO6Ga7Qi5W3VcREBZZKvDOT8yurthRLIWsULfO1QyUhAyWQDBLkUHVnZXFQbm6QwJcB8WF6Bi+++ghXYV75xjHoHxbJnammKDNBmRmaWYjXfRIQ=="
			)
			const token = await issuer.sign(creatable, now.getTime() / 1000)
			expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
		} catch (e) {
			console.log(e)
			expect(false).toEqual(true)
		}
	})
	it("signing and verifying (authly)", async () => {
		const issuer = authly.Issuer.create<model.User.Tag.Creatable>(
			"userwidgets",
			authly.Algorithm.RS256(publicKey, privateKey)
		)
		const verifier = authly.Verifier.create(authly.Algorithm.RS256(publicKey))
		const unsignedVerifier = authly.Verifier.create(authly.Algorithm.none())
		if (!issuer || !verifier || !unsignedVerifier) {
			expect(issuer).not.toEqual(undefined)
			expect(verifier).not.toEqual(undefined)
			expect(unsignedVerifier).not.toEqual(undefined)
			return
		}
		const token = await issuer.sign(creatable, Math.floor(now.getTime() / 1000))
		const result = await verifier.verify(token)
		expect(result).toEqual({ ...creatable, iss: "userwidgets", iat: Math.floor(now.getTime() / 1000), token: token })
	})
	it("signing and verifying", async () => {
		const issuer = model.User.Tag.Issuer.create("userwidgets", "applicationId", privateKey)
		const verifier = model.User.Tag.Verifier.create("userwidgets")
		const token = await issuer.sign(creatable, Math.floor(now.getTime() / 1000))
		const result = await verifier.verify(token)
		expect(result).toEqual({
			...creatable,
			issuer: "userwidgets",
			issued: isoly.DateTime.create(now.getTime() / 1000),
			expires: isoly.DateTime.create(now.getTime() / 1000 + 60 * 60 * 12),
			audience: "applicationId",
			token: token,
		})
	})
	it("unpack", async () => {
		const signedIssuer = model.User.Tag.Issuer.create("userwidgets", "applicationId", privateKey)
		const unsignedIssuer = model.User.Tag.Issuer.create("local", "applicationId")
		const signedToken = await signedIssuer.sign(creatable)
		const unsignedToken = await unsignedIssuer.sign(creatable)
		if (!signedToken || !unsignedToken) {
			expect(signedToken).toBeTruthy()
			expect(unsignedToken).toBeTruthy()
			return
		}
		expect(model.User.Tag.is(await model.User.Tag.unpack(signedToken))).toBeTruthy()
		expect(model.User.Tag.is(await model.User.Tag.unpack(unsignedToken))).toBeTruthy()
	})
})
