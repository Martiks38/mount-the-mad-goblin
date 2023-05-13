import { Schema, model, models } from 'mongoose'
import { compare, genSalt, hash } from 'bcryptjs'

const saltRounds = 10

const UserSchema = new Schema(
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
		}
	},
	{
		timestamps: true,
		methods: {
			async encryptPassword() {
				const salt = await genSalt(saltRounds)

				this.password = await hash(this.password, salt)
			},
			async compare(password: string) {
				return await compare(password, this.password)
			}
		}
	}
)

UserSchema.pre('save', async function (next) {
	const user = this

	if (!user.isModified('password')) return next()

	/* @ts-expect-error */
	await user.encryptPassword()

	next()
})

UserSchema.pre('findOneAndUpdate', async function () {
	const docToUpdate = await this.model.findOne(this.getQuery())
	await docToUpdate.encryptPassword()

	this.setUpdate({ password: docToUpdate.password })
})

export default models?.User || model('User', UserSchema)
