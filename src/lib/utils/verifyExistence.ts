import UserModel from '../models/userModel'
import { errorMessage } from '@/utils/handlerError'

import type { User } from '@/typings/interfaces'

export async function verifyExistence(data: Partial<User>, _id?: string) {
	try {
		if (data?.username) {
			if (data.username.match(/[^a-z0-9]{4,}/i))
				throw {
					status: 400,
					message: 'The username can only be letters and number and a minimum of 4 characters.'
				}

			const user = await UserModel.findOne({ username: data.username })

			if (user) throw { status: 400, message: `The username, ${data.username}, already exists.` }
		}

		if (data?.email) {
			if (data.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
				throw { status: 400, message: 'Email invalid' }

			const user = await UserModel.findOne({ email: data.email })

			if (user) throw { status: 400, message: `The email, ${data.email}, already exists.` }
		}

		if (Object.hasOwn(data, 'purchases')) {
			const pairs = Object.entries(data)

			for (const pair of pairs) {
				if (pair[0] === 'name' && (typeof pair[1] !== 'string' || pair[1] === '')) {
					throw { status: 400, message: 'It is not a valid name' }
				}

				if (pair[0] === 'password' && (typeof pair[1] !== 'string' || pair[1] === '')) {
					throw { status: 400, message: 'It is not a valid password' }
				}

				const purchaseValues = Object.values(pair[1])
				const thereIsInvalidValue = purchaseValues.some(
					(value: string | number) => (value === '') !== (value === 0)
				)
				if (pair[0] === 'purchases' && thereIsInvalidValue) {
					throw { status: 400, message: 'The purchase data is invalid' }
				}
			}
		}

		if (data?.password) {
			if (data.password.length < 8 || data.password.length > 16)
				throw {
					status: 400,
					message: 'The password must have a minimum of eight and a maximum sixteen characters.'
				}

			const user = await UserModel.findById({ _id })
			if (!user) throw { status: 401, message: 'Unauthorozed' }

			const isCurrentPassword = await user.comparePassword(data.password)

			if (isCurrentPassword)
				throw { status: 400, message: 'It cannot be the same as the old password' }
		}
	} catch (error: any) {
		throw errorMessage(error?.status, error?.message)
	}
}
