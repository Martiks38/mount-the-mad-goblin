import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel'

import { verifyExistence } from '../utils/verifyExistence'
import { errorMessage } from '@/utils/handlerError'

import { SECRET_TOKEN } from '@/config'

import type { ShoppingHistory, User } from '@/typings/interfaces'

/* Token */
interface JWT {
	iat: number
	exp: number
}

interface ContentJWT extends JWT {
	_id: string
}

function generateToken(_id: string) {
	const expiresIn = 24 * 60 * 60 * 7 // One week

	const token = jwt.sign({ _id }, SECRET_TOKEN as string, { expiresIn })

	return token
}

function decodeToken(token: string) {
	return jwt.verify(token, SECRET_TOKEN as string) as ContentJWT
}

/* Create */
export async function createUser(user: User) {
	try {
		const { username, email } = user

		await verifyExistence({ username, email })

		let newUser = new UserModel(user)
		let savedUser = await newUser.save()

		const token = generateToken(savedUser._id)

		return { message: 'Account created', token }
	} catch (error: any) {
		throw errorMessage(error?.status, error?.message)
	}
}

/* Get */
export async function getUser(name: string, token: string) {
	try {
		const { _id } = decodeToken(token)

		const user = await UserModel.findById<User>({ _id })

		if (!user || user.username !== name) throw { status: 403, message: 'User does not exist.' }

		const { email, purchases, username } = user

		return { email, purchases, username }
	} catch (error: any) {
		throw errorMessage(error?.status, error?.message)
	}
}

/* Update */
export async function updateUser(data: Partial<User>, token: string) {
	try {
		const { _id } = decodeToken(token)
		let update: Partial<User> | Record<'purchases', ShoppingHistory[] | undefined>

		await verifyExistence(data, _id)

		const user = await UserModel.findById<User>({ _id })
		if (user === null) throw { status: 400, message: "User don't exist." }

		if (Object.hasOwn(data, 'purchases') && data.purchases) {
			const purchases = user.purchases?.concat(data.purchases)
			update = { purchases }
		} else {
			update = data
		}

		await UserModel.findOneAndUpdate({ _id }, { $set: update })

		return { message: 'The change was applied successfully.' }
	} catch (error: any) {
		throw errorMessage(error?.status, error?.message)
	}
}

/* Delete */
export async function deleteUser(username: string, token: string) {
	try {
		const { _id } = decodeToken(token)

		const user = await UserModel.findById<User>({ _id })

		if (!user || user.username !== username) throw { status: 401, message: 'Unauthorozed' }

		await UserModel.findOneAndDelete({ username })

		return { message: 'Account deleted.' }
	} catch (error: any) {
		throw errorMessage(error?.status, error?.message)
	}
}

/* Login */
export async function loginUser(username: string, password: string) {
	try {
		const user = await UserModel.findOne({ username })

		if (user === null) throw { status: 400, message: `The user ${username} does not exist.` }

		const validUser = await user.comparePassword(password)

		if (validUser) {
			const token = generateToken(user._id)
			return { ok: true, token }
		}

		throw { status: 400, message: 'The username and/or password are incorrect.' }
	} catch (error: any) {
		throw { ...errorMessage(error?.status, error?.message), ok: false }
	}
}

/* Validate token */
export async function validateToken(token: string, username: string) {
	try {
		const { _id, exp } = decodeToken(token) as ContentJWT

		const user = await UserModel.findById({ _id })
		const isValid = user.compareUsername(username)

		if (!isValid) throw { status: 401, message: 'The token is invalid.' }

		// If the token expiration time is less than two days.
		//  So it generates a new token; otherwise, it's null.
		let newToken: string | null = null

		// Two days.
		if (exp - Date.now() < 60 * 60 * 24 * 2) {
			newToken = generateToken(_id)
		} else if (Date.now() >= exp) {
			throw { status: 401, message: 'The token expired.' }
		}

		return { ok: true, token: newToken, expire: false }
	} catch (error: any) {
		throw {
			...errorMessage(error?.status, error?.message),
			ok: false,
			expire: true
		}
	}
}
