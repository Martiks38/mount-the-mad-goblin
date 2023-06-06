export const PET_TYPES = [
	'Humanoid',
	'Dragonkin',
	'Flying',
	'Undead',
	'Critter',
	'Magic',
	'Elemental',
	'Beast',
	'Aquatic',
	'Mechanical'
] as const

export const PRICE_RANGE = Object.freeze({
	min: 1,
	max: 9999999 // Maximum allowed by the game.
})

export const projection = Object.freeze({
	_id: false
})

export const KEY_SESSION_STORAGE = 'shopping-cart'

export const KEY_LOCAL_STORAGE = 'user-connection'

export const TOKEN_HEADER = 'x-access-token'

export const INVALID_BILLING_INFORMATION = 'billing-information'

export const LIMIT = 10

export const shoppingCartCookie = 'shopping-cart'

const API_RESOURCES_PROD = {
	auth: 'https://pets-the-crazy-goblin.vercel.app/api/v1/auth',
	pets: {
		search: 'https://pets-the-crazy-goblin.vercel.app/api/v1/pets/search',
		types: 'https://pets-the-crazy-goblin.vercel.app/api/v1/pets/types',
		prices: 'https://pets-the-crazy-goblin.vercel.app/api/v1/pets/prices',
		base: 'https://pets-the-crazy-goblin.vercel.app/api/v1/pets'
	},
	users: 'https://pets-the-crazy-goblin.vercel.app/api/v1/users'
}

const API_RESOURCES_DEV = {
	auth: 'http://localhost:3000/api/v1/auth',
	pets: {
		search: 'http://localhost:3000/api/v1/pets/search',
		types: 'http://localhost:3000/api/v1/pets/types',
		prices: 'http://localhost:3000/api/v1/pets/prices',
		base: 'http://localhost:3000/api/v1/pets'
	},
	users: 'http://localhost:3000/api/v1/users'
}

const isProduction = process.env.NODE_ENV === 'production'

export const apiURLs = isProduction ? API_RESOURCES_PROD : API_RESOURCES_DEV
