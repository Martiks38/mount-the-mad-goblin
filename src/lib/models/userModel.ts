import { Model, Schema, model, models } from 'mongoose'
import { compare, genSalt, hash } from 'bcryptjs'

import type { User } from '@/typings/interfaces'

const saltRounds = 10

interface IUserMethods {
	encryptPassword(): Promise<void>
	comparePassword(password: string): Promise<boolean>
	compareUsername(username: string): boolean
}

type UserModel = Model<User, {}, IUserMethods>

const UserSchema = new Schema<User, UserModel, IUserMethods>(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
			trim: true,
			unique: true
		},
		password: {
			type: String,
			required: [true, 'Password is required']
		},
		username: {
			type: String,
			required: [true, 'Username is required'],
			trim: true,
			unique: true
		},
		purchases: {
			type: [
				{
					date: Date,
					name: String,
					price: Number,
					quantity: Number
				}
			]
		}
	},
	{
		timestamps: true
	}
)

UserSchema.methods.comparePassword = async function (password: string) {
	return await compare(password, this.password)
}

UserSchema.methods.compareUsername = function (username: string) {
	return username === this.username
}

UserSchema.methods.encryptPassword = async function () {
	const self = this
	const salt = await genSalt(saltRounds)

	self.password = await hash(self.password, salt)
}

UserSchema.pre('save', async function (next) {
	const user = this

	if (!user.isModified('password')) return next()

	await user.encryptPassword()

	next()
})

UserSchema.pre('findOneAndUpdate', async function () {
	const docToUpdate = await this.model.findOne(this.getQuery())
	await docToUpdate.encryptPassword()

	this.setUpdate({ password: docToUpdate.password })
})

export default models?.User || model<User, UserModel>('User', UserSchema)
