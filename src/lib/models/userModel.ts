import { Model, Schema, model, models } from 'mongoose'
import { compare, genSalt, hash } from 'bcryptjs'

const saltRounds = 10

interface IShoppingHistory {
	name: string
	price: number
	quantity: number
}

interface IUser {
	email: string
	password: string
	username: string
	purchases: IShoppingHistory[]
}

interface IUserMethods {
	encryptPassword(): Promise<void>
	comparePassword(password: string): Promise<boolean>
	compareUsername(username: string): boolean
}

type UserModel = Model<IUser, {}, IUserMethods>

const ShoppingHistory = new Schema<IShoppingHistory>({
	name: {
		type: String,
		required: [true, 'Product name is required'],
		trim: true
	},
	price: {
		type: Number,
		required: [true, 'Price is required']
	},
	quantity: {
		type: Number,
		required: [true, 'Quantity is requied']
	}
})

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
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
			type: [ShoppingHistory]
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

export default models?.User || model<IUser, UserModel>('User', UserSchema)
