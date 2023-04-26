import { model, models, Schema } from 'mongoose'

const PetSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		trim: true,
		unique: true
	},
	type: {
		type: String,
		required: [true, 'The pet type is required'],
		trim: true
	},
	description: {
		type: String,
		required: [true, 'Describe is required'],
		trim: true
	},
	media: {
		type: String,
		required: [true, 'Media is required'],
		trim: true
	},
	price: {
		type: Number,
		required: [true, 'Price is required']
	}
})

export default models?.Pet || model('Pet', PetSchema)
