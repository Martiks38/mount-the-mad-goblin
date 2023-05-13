import UserModel from '../models/userModel'
import { errorMessage } from '@/utils/handlerError'

import type { User } from '@/typings/interfaces'

export async function verifyExistence(data: Partial<User>, _id?: string) {
	try {
		if (Object.hasOwn(data, 'password')) {
			const user = await UserModel.findById({ _id })

			if (!user) throw { status: 401, message: 'Unauthorozed' }

			if (data.password && (await user.compare(data.password)))
				throw { status: 400, message: 'It cannot be the same as the old password.' }
		}

		if (Object.hasOwn(data, 'username')) {
			const user = await UserModel.findOne({ username: data.username })

			if (user) throw { status: 400, message: `The username, ${data.username}, already exists.` }
		}

		if (Object.hasOwn(data, 'email')) {
			const user = await UserModel.findOne({ email: data.email })

			if (user) throw { status: 400, message: `The email, ${data.email}, already exists.` }
		}
	} catch (error: any) {
		throw errorMessage(error?.status, error?.message)
	}
}
