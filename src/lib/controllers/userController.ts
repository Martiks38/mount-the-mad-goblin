import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel'

import { verifyExistence } from '../utils/verifyExistence'
import { errorMessage } from '@/utils/handlerError'

import { SECRET_TOKEN } from '@/config'

import type { User } from '@/typings/interfaces'

/* Create */
export async function createUser(user: User) {
	try {
		const { username, email } = user

		await verifyExistence({ username, email })

		let newUser = new UserModel({ ...user })

		let savedUser = await newUser.save()

		const token = jwt.sign(
			{ _id: savedUser._id },
			SECRET_TOKEN as string,
			{ expiresIn: 24 * 60 * 60 * 7 } // one week
		)

		return { message: 'Account created', token }
	} catch (error: any) {
		throw errorMessage(error?.status, error?.message)
	}
}

/* Update */
export async function updateUser(data: Partial<User>, token: string) {
	try {
		const decodeToken = jwt.verify(token, SECRET_TOKEN as string) as { _id: string }
		const _id = decodeToken._id

		await verifyExistence(data, _id)

		await UserModel.findOneAndUpdate({ _id }, { $set: { ...data } })

		return { message: 'The change was applied successfully.' }
	} catch (error: any) {
		throw errorMessage(error?.status, error?.message)
	}
}

/* Delete */
export async function deleteUser(username: string, token: string) {
	try {
		const decodeToken = jwt.verify(token, SECRET_TOKEN as string) as { _id: string }
		const _id = decodeToken._id

		const user = await UserModel.findById<User>({ _id })

		if (!user || user.username !== username) throw { status: 401, message: 'Unauthorozed' }

		await UserModel.findOneAndDelete({ username })

		return { message: 'Account deleted.' }
	} catch (error: any) {
		throw errorMessage(error?.status, error?.message)
	}
}
